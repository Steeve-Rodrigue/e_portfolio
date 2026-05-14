import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, BookOpen } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { getProject } from '@/lib/api'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug).catch(() => null)
  return { title: project ? project.title : 'Projet' }
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-grotesk font-bold tracking-widest uppercase text-xs md:text-sm xl:text-base text-[#ff6a00] shrink-0">
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to right, rgba(255,106,0,0.4), transparent)' }}
      />
    </div>
  )
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug).catch(() => null)

  if (!project) notFound()

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1d1b20] font-grotesk">
      <main
        className="mx-auto max-w-[1280px] pt-10 pb-20"
        style={{
          paddingLeft: 'clamp(16px, 5vw, 80px)',
          paddingRight: 'clamp(16px, 5vw, 80px)',
        }}
      >
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs md:text-sm xl:text-base text-[#2e2d2d] mb-10 transition-colors hover:text-[#ff6a00]"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux projets
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="font-grotesk font-bold tracking-widest uppercase text-white text-xs md:text-sm bg-[#ff6a00] px-3 py-1 rounded-md"
              >
                {cat}
              </span>
            ))}
            {project.featured && (
              <span className="font-grotesk text-xs md:text-sm font-bold text-[#ff6a00]">
                ★ Featured
              </span>
            )}
            {project.has_ml_demo && (
              <span className="font-grotesk font-bold text-xs md:text-sm text-[#ff6a00] bg-[rgba(255,106,0,0.08)] border border-[rgba(255,106,0,0.2)] px-3 py-1 rounded-md">
                ML Demo
              </span>
            )}
          </div>

          <h1 className="font-grotesk font-extrabold text-3xl md:text-5xl xl:text-6xl mb-6 leading-none tracking-tight text-[#070707]">
            {project.title}
          </h1>

          <div className="flex items-center gap-3 flex-wrap">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
              >
                <FaGithub className="w-4 h-4" />
                GitHub
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Demo
              </a>
            )}
            {project.notebook_url && (
              <a
                href={project.notebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk border border-[#ddd] text-[#494551] transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Notebook
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl">
          {project.problem_statement && (
            <section className="mb-12">
              <SectionDivider label="Problématique" />
              <p className=" text-[14px] md:text-base xl:text-lg leading-relaxed text-black">
                {project.problem_statement}
              </p>
            </section>
          )}

          {project.methodology && (
            <section className="mb-12">
              <SectionDivider label="Méthodologie" />
              <p className="text-sm md:text-base xl:text-lg leading-relaxed text-black">
                {project.methodology}
              </p>
            </section>
          )}

          {project.results_impact && (
            <section className="mb-12">
              <SectionDivider label="Résultats & Impact" />
              <p className="text-sm md:text-base xl:text-lg leading-relaxed text-black">
                {project.results_impact}
              </p>
            </section>
          )}

          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <section className="mb-12">
              <SectionDivider label="Métriques" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-[14px] px-5 py-4 bg-white/75 border border-[rgba(255,106,0,0.12)]"
                    style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}
                  >
                    <div className="font-grotesk font-extrabold text-2xl md:text-3xl xl:text-4xl leading-none mb-1 text-[#ff6a00]">
                      {typeof value === 'number' && value <= 1 && value > 0
                        ? `${(value * 100).toFixed(1)}%`
                        : value}
                    </div>
                    <div className="font-grotesk text-xs md:text-sm xl:text-base tracking-wide capitalize text-[#aaa]">
                      {key.replace(/_/g, ' ')}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.tech_stack.length > 0 && (
            <section className="mb-12">
              <SectionDivider label="Stack Technique" />
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-grotesk text-xs md:text-sm xl:text-base px-3 py-1.5 rounded-md bg-[rgba(255,106,0,0.08)] text-[#ff6a00] border border-[rgba(255,106,0,0.2)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Images */}
          {project.thumbnail_url &&
            (() => {
              const urls = project
                .thumbnail_url!.split(',')
                .map((u) => u.trim())
                .filter(Boolean)
              return (
                <section className="mb-12">
                  <SectionDivider label="Images relatives" />
                  <div
                    className={`grid gap-3 ${urls.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}
                  >
                    {urls.map((url, i) => (
                      <Image
                        key={i}
                        src={url}
                        alt={`${project.title} ${i + 1}`}
                        width={0}
                        height={0}
                        sizes={urls.length === 1 ? '100vw' : '(max-width: 850px) 100vw, 50vw'}
                        className="rounded-[16px] w-full h-auto"
                        priority={i === 0}
                      />
                    ))}
                  </div>
                </section>
              )
            })()}
        </div>
      </main>
    </div>
  )
}
