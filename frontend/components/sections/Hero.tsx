import Link from 'next/link'
import { MapPin, FolderOpen, Download } from 'lucide-react'
import NeuralNetwork from '@/components/NeuralNetwork'
import { HeroCadran } from '@/components/sections/HeroCadran'

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#050d1a]">
      {/* Neural network — full section background */}
      <div className="absolute inset-0">
        <NeuralNetwork />
      </div>

      {/* Mobile mask — hides animation over the text (top), reveals only around the photo (bottom) */}
      <div
        className="absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            'linear-gradient(to bottom, #050d1a 52%, rgba(5,13,26,0.5) 68%, transparent 84%)',
        }}
      />

      {/* Desktop mask — hides animation on the left (text), reveals on the right (photo) */}
      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            'linear-gradient(to right, #050d1a 50%, rgba(5,13,26,0.6) 65%, transparent 80%)',
        }}
      />

      {/* Content — above animation and mask */}
      <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center px-8 py-16 xl:px-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-12 md:items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-7 pl-4 md:pl-8 xl:pl-12">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 self-start bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-semibold text-white tracking-widest uppercase font-grotesk">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Disponible
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-5">
              {/* Name */}
              <h1 className="font-black font-grotesk leading-none text-6xl sm:text-7xl md:text-8xl xl:text-9xl">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 30%, #00c8ff 100%)' }}
                >
                  Steeve
                </span>
              </h1>

              {/* Title row with decorative lines */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-orange" />
                <span
                  className="font-bold text-base uppercase tracking-[0.3em] font-grotesk"
                  style={{ color: '#FF6B35', textShadow: '0 0 18px rgba(255,107,53,0.55)' }}
                >
                  Data Scientist
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-white/65 leading-relaxed max-w-lg font-inter">
              Je me spécialise dans la conception de solutions orientées données et la création de
              systèmes de machine learning scalables. En exploitant des analyses avancées, je
              transforme des jeux de données complexes en insights actionnables et en architectures
              technologiques robustes.
            </p>

            {/* Location */}
            <div
              className="inline-flex items-center gap-2 self-start bg-white/5 border border-orange/30 rounded-full px-5 py-2 font-grotesk"
              style={{ boxShadow: '0 0 14px rgba(255,107,53,0.15)' }}
            >
              <MapPin className="w-4 h-4 text-orange shrink-0" />
              <span className="text-sm font-semibold text-white/80 tracking-wide">
                Rennes, France
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-orange text-white font-semibold text-base px-8 py-3.5 rounded-lg hover:bg-rust transition-colors shadow-sm shadow-orange/30 font-grotesk"
              >
                <FolderOpen className="w-5 h-5" />
                Voir mes projets
              </Link>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base px-8 py-3.5 rounded-lg hover:bg-white hover:text-slate transition-colors font-grotesk"
              >
                <Download className="w-5 h-5" />
                Télécharger le CV
              </a>
            </div>
          </div>

          {/* Right — photo sits above the animation */}
          <div className="relative z-10 flex items-center justify-center">
            <HeroCadran />
          </div>
        </div>
      </div>
    </section>
  )
}
