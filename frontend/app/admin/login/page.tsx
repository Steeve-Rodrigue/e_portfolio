'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Network } from 'lucide-react'
import { login } from '@/lib/api'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { access_token } = await login(email, password)
      localStorage.setItem('admin_token', access_token)
      router.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-10 justify-center">
          <Network className="w-6 h-6 text-[#ff6a00]" strokeWidth={2} />
          <span className="font-grotesk font-bold text-xl text-white tracking-tight">Admin</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-[16px] px-6 py-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-grotesk text-xs text-white/50 uppercase tracking-widest"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-grotesk outline-none focus:border-[#ff6a00] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-grotesk text-xs text-white/50 uppercase tracking-widest"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-grotesk outline-none focus:border-[#ff6a00] transition-colors"
            />
          </div>

          {error && <p className="font-grotesk text-xs text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#ff6a00] hover:bg-[#e05e00] disabled:opacity-50 text-white font-grotesk font-semibold text-sm py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
