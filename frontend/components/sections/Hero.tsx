import Link from 'next/link'
import { FolderOpen, Download, MapPin } from 'lucide-react'
import NeuralNetwork from '@/components/NeuralNetwork'
import { HeroCadran } from '@/components/sections/HeroCadran'

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 5rem)',
        overflow: 'hidden',
        background: 'linear-gradient(to right, #ffffff 20%, #000000 100%)',
      }}
    >
      {/* Animation */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <NeuralNetwork />
      </div>

      {/* White mask — left side */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #ffffff 0%, #ffffff 25%, transparent 62%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          minHeight: 'calc(100vh - 5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '8%',
          paddingRight: '8%',
        }}
      >
        <div className="flex flex-col gap-4 text-left max-w-[52vw] md:max-w-md xl:max-w-xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-grotesk self-start"
            style={{
              background: 'rgba(255,106,0,0.08)',
              border: '1px solid rgba(255,106,0,0.4)',
              color: '#ff6a00',
            }}
          >
            <span
              className="animate-pulse inline-block rounded-full"
              style={{ width: 6, height: 6, background: '#ff6a00', flexShrink: 0 }}
            />
            Disponible
          </div>

          <h1
            className="text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight"
            style={{ color: '#0a0a0a' }}
          >
            <span className="whitespace-nowrap font-bold">Steeve Rodrigue</span>
            <br />
            <span className="block uppercase font-normal">Haizawa</span>
          </h1>
          <p
            className="text-base md:text-xl xl:text-2xl font-bold tracking-widest uppercase font-kanit"
            style={{ color: '#ff6a00' }}
          >
            Data Scientist · ML Engineer
          </p>
          <p
            className="text-sm md:text-base xl:text-lg leading-relaxed mt-2"
            style={{ color: '#444444' }}
          >
            Conception de systèmes intelligents et d&apos interfaces élégantes. Ouvert aux nouvelles
            opportunités.
          </p>

          <div className="flex items-center gap-2 mt-2" style={{ color: '#444444' }}>
            <MapPin className="w-4 h-4 shrink-0" style={{ color: '#ff6a00' }} />
            <span className="text-xs md:text-sm xl:text-base tracking-wide font-grotesk">
              Paris, France
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm tracking-widest uppercase transition-colors font-grotesk text-white hover:opacity-90"
              style={{ background: '#ff6a00', border: '1px solid #ff6a00' }}
            >
              <FolderOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Voir les projets
            </Link>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm tracking-widest uppercase transition-colors font-grotesk hover:text-[#ff6a00] hover:border-[#ff6a00]"
              style={{ border: '1px solid #0a0a0a', color: '#0a0a0a' }}
            >
              <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Télécharger le CV
            </a>
          </div>
        </div>

        {/* Photo cadran — hidden below 400px */}
        <div className="[@media(max-width:600px)]:hidden flex items-center justify-center">
          <HeroCadran />
        </div>
      </div>
    </section>
  )
}
