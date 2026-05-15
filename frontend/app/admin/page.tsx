'use client'

import { useEffect, useState } from 'react'
import { Users, TrendingUp, Globe, Monitor, Smartphone } from 'lucide-react'
import { getAnalytics } from '@/lib/api'
import type { Analytics } from '@/lib/types'

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number
  icon: React.ElementType
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[14px] px-6 py-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-grotesk text-xs text-white/40 uppercase tracking-widest">
          {label}
        </span>
        <Icon className="w-4 h-4 text-[#ff6a00]" />
      </div>
      <p className="font-grotesk font-extrabold text-3xl text-white">{value}</p>
    </div>
  )
}

function PageBar({ page, visits, max }: { page: string; visits: number; max: number }) {
  const pct = max > 0 ? (visits / max) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="font-grotesk text-xs text-white/50 w-32 shrink-0 truncate">
        {page || '/'}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-white/5">
        <div className="h-full rounded-full bg-[#ff6a00]" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-grotesk text-xs text-white/50 w-8 text-right shrink-0">{visits}</span>
    </div>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAnalytics()
      .then(setAnalytics)
      .catch((err) => setError(err.message))
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-grotesk text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-grotesk text-white/30 text-sm">Chargement...</p>
      </div>
    )
  }

  const maxPageVisits = Math.max(...analytics.by_page.map((p) => p.visits), 1)
  const desktopCount = analytics.recent.filter((v) => v.device === 'desktop').length
  const mobileCount = analytics.recent.filter((v) => v.device === 'mobile').length

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-grotesk font-bold text-xl text-white mb-1">Analytics</h1>
        <p className="font-grotesk text-sm text-white/30">Activité des visiteurs</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Visites totales" value={analytics.total} icon={Users} />
        <StatCard label="Pages vues" value={analytics.by_page.length} icon={TrendingUp} />
        <StatCard label="Sources" value={analytics.top_referrers.length} icon={Globe} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Pages */}
        <div className="bg-white/5 border border-white/10 rounded-[14px] px-6 py-5">
          <h2 className="font-grotesk font-semibold text-sm text-white mb-5">Visites par page</h2>
          <div className="flex flex-col gap-3">
            {analytics.by_page
              .sort((a, b) => b.visits - a.visits)
              .map((p) => (
                <PageBar key={p.page} page={p.page} visits={p.visits} max={maxPageVisits} />
              ))}
            {analytics.by_page.length === 0 && (
              <p className="font-grotesk text-xs text-white/20">Aucune donnée</p>
            )}
          </div>
        </div>

        {/* Referrers + devices */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-[14px] px-6 py-5">
            <h2 className="font-grotesk font-semibold text-sm text-white mb-4">Top référents</h2>
            <div className="flex flex-col gap-2">
              {analytics.top_referrers.length === 0 && (
                <p className="font-grotesk text-xs text-white/20">Aucune donnée</p>
              )}
              {analytics.top_referrers.map((r) => (
                <div key={r.referrer} className="flex items-center justify-between">
                  <span className="font-grotesk text-xs text-white/50 truncate max-w-[180px]">
                    {r.referrer || 'Direct'}
                  </span>
                  <span className="font-grotesk text-xs text-white/30">{r.visits}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[14px] px-6 py-5">
            <h2 className="font-grotesk font-semibold text-sm text-white mb-4">Appareils</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#ff6a00]" />
                <span className="font-grotesk text-sm text-white">{desktopCount}</span>
                <span className="font-grotesk text-xs text-white/30">desktop</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#ff6a00]" />
                <span className="font-grotesk text-sm text-white">{mobileCount}</span>
                <span className="font-grotesk text-xs text-white/30">mobile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent visitors table */}
      <div className="bg-white/5 border border-white/10 rounded-[14px] px-6 py-5">
        <h2 className="font-grotesk font-semibold text-sm text-white mb-5">Visiteurs récents</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Page', 'Pays', 'Appareil', 'Date'].map((h) => (
                  <th
                    key={h}
                    className="font-grotesk text-[10px] text-white/30 uppercase tracking-widest text-left pb-3 pr-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {analytics.recent.map((v) => (
                <tr key={v.id} className="border-b border-white/5 last:border-0">
                  <td className="font-grotesk text-xs text-white/60 py-3 pr-4">{v.page || '/'}</td>
                  <td className="font-grotesk text-xs text-white/40 py-3 pr-4">
                    {v.country ?? '—'}
                  </td>
                  <td className="font-grotesk text-xs text-white/40 py-3 pr-4">
                    {v.device ?? '—'}
                  </td>
                  <td className="font-grotesk text-xs text-white/30 py-3">
                    {formatDate(v.visited_at)}
                  </td>
                </tr>
              ))}
              {analytics.recent.length === 0 && (
                <tr>
                  <td colSpan={4} className="font-grotesk text-xs text-white/20 py-4 text-center">
                    Aucun visiteur récent
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
