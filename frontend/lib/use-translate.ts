'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from './language-context'
import { translateFields, translateArray, translateBlocks } from './translate'
import type { Block } from './types'

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

export function useTranslateBlocks(data: Block[] | null): Block[] | null {
  const { lang } = useLang()
  const original = useRef(data)
  const [result, setResult] = useState<Block[] | null>(data)

  useEffect(() => {
    let cancelled = false
    if (!original.current || lang === 'fr') {
      setResult(original.current)
      return
    }
    translateBlocks(original.current, lang).then((translated) => {
      if (!cancelled) setResult(translated as Block[])
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
