'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Network, BarChart2, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [{ label: 'Analytics', href: '/admin', icon: BarChart2 }]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token && pathname !== '/admin/login') {
      router.replace('/admin/login')
    } else {
      setReady(true)
    }
  }, [pathname, router])

  if (pathname === '/admin/login') return <>{children}</>
  if (!ready) return null

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/10 flex flex-col py-8 px-4">
        <div className="flex items-center gap-2 mb-10 px-2">
          <Network className="w-5 h-5 text-[#ff6a00]" strokeWidth={2} />
          <span className="font-grotesk font-bold text-white tracking-tight">Admin</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-grotesk font-medium transition-colors',
                pathname === href
                  ? 'bg-[#ff6a00]/10 text-[#ff6a00]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-grotesk font-medium text-white/30 hover:text-red-400 hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
