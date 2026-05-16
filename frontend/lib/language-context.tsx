'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

type Lang = 'fr' | 'en'
type Locales = typeof fr

const locales: Record<Lang, Locales> = { fr, en }

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: keyof Locales) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (key) => fr[key],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'en' || stored === 'fr') setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = (key: keyof Locales) => locales[lang][key] ?? key

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
