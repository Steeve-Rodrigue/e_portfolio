'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'
import type { Experience } from '@/lib/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}

function TimelineEntry({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-6')
        } else {
          el.classList.remove('opacity-100', 'translate-y-0')
          el.classList.add('opacity-0', 'translate-y-6')
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isJob = exp.type === 'job'

  return (
    <div
      ref={ref}
      className="relative pl-10 opacity-0 translate-y-6 transition-all duration-700 ease-out"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Dot */}
      <div
        className={`absolute left-0 top-2 -translate-x-[calc(50%-0.5px)] w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          isJob ? 'bg-[#ff6a00] border-[#ff6a00]' : 'bg-white border-[#7a7582]'
        }`}
      >
        {isJob ? (
          <Briefcase className="w-2 h-2 text-white" />
        ) : (
          <GraduationCap className="w-2.5 h-2.5 text-[#7a7582]" />
        )}
      </div>

      {/* Card */}
      <div
        className="relative rounded-[14px] px-5 py-5 bg-white/75 border border-[rgba(255,106,0,0.12)] mb-8"
        style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8) inset' }}
      >
        {exp.logo_url && (
          <Image
            src={exp.logo_url}
            alt={exp.company}
            width={56}
            height={56}
            className="absolute top-4 right-4 object-contain"
          />
        )}

        <div className="mb-3 pr-16">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-grotesk font-bold text-base md:text-lg xl:text-xl text-[#1d1b20]">
              {exp.role}
            </h3>
            {exp.is_current && (
              <span className="font-grotesk text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[rgba(255,106,0,0.1)] text-[#ff6a00] border border-[rgba(255,106,0,0.2)]">
                Actuel
              </span>
            )}
          </div>
          <p className="font-grotesk font-semibold text-sm md:text-base xl:text-lg text-[#ff6a00] uppercase tracking-wider">
            {exp.company}
          </p>
          <span className="font-grotesk text-xs md:text-sm text-[#aaa] mt-1 block">
            {formatDate(exp.start_date)} —{' '}
            {exp.is_current ? 'Présent' : exp.end_date ? formatDate(exp.end_date) : ''}
          </span>
        </div>

        {exp.description && (
          <p className="font-grotesk text-sm md:text-base xl:text-lg text-[#444444] leading-relaxed mb-3">
            {exp.description}
          </p>
        )}

        {exp.impact_metric && (
          <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-[rgba(255,106,0,0.08)] border border-[rgba(255,106,0,0.2)]">
            <span className="font-grotesk text-xs md:text-sm font-semibold text-[#ff6a00]">
              {exp.impact_metric}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function TimelineSection({ label, items }: { label: string; items: Experience[] }) {
  const sorted = [...items].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  )

  if (sorted.length === 0) return null

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-10">
        <span className="font-grotesk font-bold tracking-widest uppercase text-xs md:text-sm text-[#ff6a00] shrink-0">
          {label}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(to right, rgba(255,106,0,0.4), transparent)' }}
        />
      </div>

      <div className="relative ml-2">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(0,0,0,0.08)]" />
        {sorted.map((exp, i) => (
          <TimelineEntry key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </div>
  )
}

export function Timeline({ experiences }: { experiences: Experience[] }) {
  const education = experiences.filter((e) => e.type === 'education')
  const jobs = experiences.filter((e) => e.type === 'job')

  return (
    <div>
      <TimelineSection label="Education" items={education} />
      <TimelineSection label="Expériences" items={jobs} />
    </div>
  )
}
