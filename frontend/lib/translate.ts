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

export async function translateFields<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[],
  lang: 'fr' | 'en'
): Promise<T> {
  if (lang === 'fr') return obj

  const stringFields = fields.filter((f) => typeof obj[f] === 'string' && obj[f])
  const texts = stringFields.map((f) => obj[f] as string)
  const translated = await resolveTexts(texts, lang)

  const result = { ...obj }
  stringFields.forEach((f, i) => {
    result[f] = translated[i] as T[keyof T]
  })
  return result
}

export async function translateArray<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[],
  lang: 'fr' | 'en'
): Promise<T[]> {
  if (lang === 'fr') return items

  const allTexts: string[] = []
  const map: { itemIdx: number; fieldIdx: number; textIdx: number }[] = []

  items.forEach((item, itemIdx) => {
    fields.forEach((f, fieldIdx) => {
      if (typeof item[f] === 'string' && item[f]) {
        map.push({ itemIdx, fieldIdx, textIdx: allTexts.length })
        allTexts.push(item[f] as string)
      }
    })
  })

  const translated = await resolveTexts(allTexts, lang)

  const results = items.map((item) => ({ ...item }))
  map.forEach(({ itemIdx, fieldIdx, textIdx }) => {
    results[itemIdx][fields[fieldIdx]] = translated[textIdx] as T[keyof T]
  })
  return results
}
