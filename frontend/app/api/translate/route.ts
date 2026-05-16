import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { texts, target } = await req.json()

  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'DEEPL_API_KEY not set' }, { status: 500 })
  }

  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: texts, target_lang: target }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'DeepL API error' }, { status: res.status })
  }

  const data = await res.json()
  const translations = data.translations.map((t: { text: string }) => t.text)

  return NextResponse.json({ translations })
}
