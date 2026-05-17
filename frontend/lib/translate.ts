const cache = new Map<string, string>()

function cacheKey(text: string, lang: string) {
  return `${lang}::${text}`
}

async function fetchTranslations(texts: string[]): Promise<string[]> {
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts, target: 'EN' }),
    })
    if (!res.ok) return texts
    const data = await res.json()
    return data.translations as string[]
  } catch {
    return texts
  }
}

async function resolveTexts(texts: string[], lang: 'fr' | 'en'): Promise<string[]> {
  if (lang === 'fr') return texts

  const uncached: { i: number; text: string }[] = []
  texts.forEach((text, i) => {
    if (text && !cache.has(cacheKey(text, lang))) {
      uncached.push({ i, text })
    }
  })

  if (uncached.length > 0) {
    const translated = await fetchTranslations(uncached.map((u) => u.text))
    uncached.forEach(({ text }, idx) => {
      cache.set(cacheKey(text, lang), translated[idx])
    })
  }

  return texts.map((text) => (text ? (cache.get(cacheKey(text, lang)) ?? text) : text))
}

export async function translateFields<T extends object>(
  obj: T,
  fields: (keyof T & string)[],
  lang: 'fr' | 'en'
): Promise<T> {
  if (lang === 'fr') return obj

  const stringFields = fields.filter((f) => {
    const v = obj[f as keyof T]
    return typeof v === 'string' && v
  })
  const texts = stringFields.map((f) => obj[f as keyof T] as unknown as string)
  const translated = await resolveTexts(texts, lang)

  const result = { ...obj }
  stringFields.forEach((f, i) => {
    ;(result as Record<string, unknown>)[f] = translated[i]
  })
  return result
}

export async function translateArray<T extends object>(
  items: T[],
  fields: (keyof T & string)[],
  lang: 'fr' | 'en'
): Promise<T[]> {
  if (lang === 'fr') return items

  const allTexts: string[] = []
  const map: { itemIdx: number; fieldIdx: number; textIdx: number }[] = []

  items.forEach((item, itemIdx) => {
    fields.forEach((f, fieldIdx) => {
      const v = item[f as keyof T]
      if (typeof v === 'string' && v) {
        map.push({ itemIdx, fieldIdx, textIdx: allTexts.length })
        allTexts.push(v)
      }
    })
  })

  const translated = await resolveTexts(allTexts, lang)

  const results = items.map((item) => ({ ...item }))
  map.forEach(({ itemIdx, fieldIdx, textIdx }) => {
    ;(results[itemIdx] as Record<string, unknown>)[fields[fieldIdx]] = translated[textIdx]
  })
  return results
}
