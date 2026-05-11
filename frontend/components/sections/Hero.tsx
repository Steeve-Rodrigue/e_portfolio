import Link from 'next/link'
import { MapPin } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-5rem)] flex flex-col md:flex-row">
      {/* Left — white panel */}
      <div className="flex-1 bg-white flex items-center justify-center px-8 py-16 xl:px-16">
        <div className="w-full max-w-md flex flex-col gap-7">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 self-start bg-mint/40 border border-mint rounded-full px-4 py-1.5 text-xs font-semibold text-teal tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to opportunities
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-3">
            <h1 className="text-6xl font-bold leading-none text-slate font-grotesk xl:text-7xl">
              Steeve
              <span className="inline-block w-2 h-2 rounded-full bg-orange mb-3 ml-1" />
            </h1>
            <p className="text-lg font-bold text-orange font-grotesk leading-snug xl:text-xl">
              Data Scientist — ML, Analytics &amp; Scalable Systems
            </p>
          </div>

          {/* Divider accent */}
          <div className="w-10 h-0.5 bg-orange rounded-full" />

          {/* Description */}
          <p className="text-sm text-mist leading-relaxed">
            I specialize in crafting data-driven solutions and building scalable machine learning
            systems. By leveraging advanced analytics, I transform complex datasets into actionable
            insights and robust technological architectures.
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-mist">
            <MapPin className="w-4 h-4 text-orange shrink-0" />
            <span>Paris, France</span>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-7 py-3 rounded-lg hover:bg-rust transition-colors shadow-sm shadow-orange/30"
            >
              Contact me
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-slate/25 text-slate font-semibold px-7 py-3 rounded-lg hover:bg-slate hover:text-white transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Right — dark teal panel */}
      <div className="flex-1 bg-[#0d2b2b] flex items-center justify-center py-16 md:py-0 relative overflow-hidden">
        {/* Decorative dots */}
        <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-teal/40" />
        <div className="absolute top-28 left-10 w-1.5 h-1.5 rounded-full bg-teal/30" />
        <div className="absolute bottom-20 right-24 w-1.5 h-1.5 rounded-full bg-teal/30" />
        <div className="absolute bottom-10 left-16 w-2 h-2 rounded-full bg-teal/20" />
        <div className="absolute top-1/2 right-8 w-1 h-1 rounded-full bg-orange/30" />

        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(79,98,95,0.15)_0%,_transparent_70%)]" />

        {/* Placeholder circle */}
        <div className="relative w-72 h-72 xl:w-96 xl:h-96 rounded-full border border-teal/20 flex items-center justify-center">
          <div className="absolute inset-4 rounded-full border border-dashed border-teal/15" />
          <p className="text-xs text-teal/40 uppercase tracking-widest font-kanit">
            Cadran à venir
          </p>
        </div>
      </div>
    </section>
  )
}
