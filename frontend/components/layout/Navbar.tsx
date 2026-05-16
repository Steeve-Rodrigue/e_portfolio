'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Network } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/language-context'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLang()
  const pathname = usePathname()

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.skills'), href: '/skills' },
    { label: t('nav.learning'), href: '/learning' },
    { label: t('nav.about'), href: '/about' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Network
            className="w-7 h-7 text-orange transition-transform duration-300 group-hover:rotate-12"
            strokeWidth={2}
          />
          <span className="font-bold text-xl tracking-tight text-slate font-grotesk">
            Portfolio<span className="text-orange"></span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-[13px] font-semibold  tracking-widest transition-colors py-1',
                  isActive
                    ? 'text-orange after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange after:rounded-full'
                    : 'text-slate/90 hover:text-orange'
                )}
              >
                {link.label.toUpperCase()}
              </Link>
            )
          })}
        </div>

        {/* Language pill + E-CV */}
        <div className="hidden md:flex items-center gap-5">
          {/* Language toggle pill */}
          <div className="flex items-center bg-gray-100 rounded-full px-1 py-1 gap-0.5 text-[12px] font-semibold font-kanit">
            <button
              onClick={() => setLang('en')}
              className={cn(
                'px-3 py-1 rounded-full transition-all',
                lang === 'en' ? 'bg-orange text-white shadow-sm' : 'text-slate/50 hover:text-slate'
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={cn(
                'px-3 py-1 rounded-full transition-all',
                lang === 'fr' ? 'bg-orange text-white shadow-sm' : 'text-slate/50 hover:text-slate'
              )}
            >
              FR
            </button>
          </div>

          {/* <Link
            href="/cv"
            className="flex items-center gap-2 text-[13px] font-kanit bg-orange text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rust transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>E-CV</span>
          </Link> */}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate/60 hover:text-orange hover:bg-orange/10 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'text-sm font-semibold font-kanit tracking-wider transition-colors px-3 py-2.5 rounded-lg',
                  isActive
                    ? 'text-orange bg-orange/10'
                    : 'text-slate/60 hover:text-orange hover:bg-orange/5'
                )}
              >
                {link.label.toUpperCase()}
              </Link>
            )
          })}

          <div className="flex items-center gap-4 pt-4 mt-2 border-t border-gray-100">
            <div className="flex items-center bg-gray-100 rounded-full px-1 py-1 gap-0.5 text-[12px] font-semibold font-kanit">
              <button
                onClick={() => setLang('en')}
                className={cn(
                  'px-3 py-1 rounded-full transition-all',
                  lang === 'en'
                    ? 'bg-orange text-white shadow-sm'
                    : 'text-slate/50 hover:text-slate'
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={cn(
                  'px-3 py-1 rounded-full transition-all',
                  lang === 'fr'
                    ? 'bg-orange text-white shadow-sm'
                    : 'text-slate/50 hover:text-slate'
                )}
              >
                FR
              </button>
            </div>
            {/* <Link
              href="/cv"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 bg-orange text-white px-5 py-2.5 rounded-lg text-sm font-semibold font-kanit hover:bg-rust transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>E-CV</span>
            </Link> */}
          </div>
        </div>
      )}
    </header>
  )
}
