'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from './language-context'
import { translateFields, translateArray } from './translate'

export function useTranslateFields<T extends object>(data: T, fields: (keyof T & string)[]): T {
  const { lang } = useLang()
  const original = useRef(data)
  const [result, setResult] = useState<T>(data)

  useEffect(() => {
    let cancelled = false
    if (lang === 'fr') {
      setResult(original.current)
      return
    }
    translateFields(original.current, fields, lang).then((translated) => {
      if (!cancelled) setResult(translated)
    })
    return () => {
      cancelled = true
    }
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  return result
}

export function useTranslateArray<T extends object>(data: T[], fields: (keyof T & string)[]): T[] {
  const { lang } = useLang()
  const original = useRef(data)
  const [result, setResult] = useState<T[]>(data)

  useEffect(() => {
    let cancelled = false
    if (lang === 'fr') {
      setResult(original.current)
      return
    }
    translateArray(original.current, fields, lang).then((translated) => {
      if (!cancelled) setResult(translated)
    })
    return () => {
      cancelled = true
    }
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  return result
}
