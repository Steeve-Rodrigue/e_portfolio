import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { ExternalLink, BookOpen, ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/types'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <section className="mb-12 md:mb-16">
      <div className="flex items-start gap-5 mb-5">
        <span
          className="hidden md:inline-block font-grotesk font-extrabold shrink-0 w-7 pt-0.5 text-xs md:text-sm"
          style={{ color: 'rgba(255,106,0,0.35)', letterSpacing: '0.05em' }}
        >
          {num}
        </span>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="font-grotesk font-bold tracking-widest uppercase text-white text-xs md:text-sm px-3 py-1 rounded-md"
                style={{ background: '#ff6a00' }}
              >
                {cat}
              </span>
            ))}
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, rgba(255,106,0,0.4), transparent)' }}
            />
            {project.featured && (
              <span
                className="font-grotesk text-xs md:text-sm font-bold"
                style={{ color: '#030303' }}
              >
                ★ Featured
              </span>
            )}
          </div>

          <h2
            className="font-grotesk font-extrabold text-xl md:text-2xl xl:text-3xl"
            style={{ color: '#1d1b20' }}
          >
            {project.title}
          </h2>
        </div>
      </div>

      <div
        className="bg-white/75 border border-[rgba(255,106,0,0.12)] rounded-[14px] px-4 py-5 md:ml-12 md:px-8 md:py-7 backdrop-blur-sm"
        style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8) inset' }}
      >
        {project.problem_statement && (
          <p
            className="font-grotesk text-sm md:text-base xl:text-lg leading-relaxed mb-4"
            style={{ color: '#494551' }}
          >
            {project.problem_statement}
          </p>
        )}

        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="font-grotesk text-xs md:text-sm px-2.5 py-1 rounded-md"
                style={{
                  background: 'rgba(255,106,0,0.08)',
                  color: '#ff6a00',
                  border: '1px solid rgba(255,106,0,0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk tracking-wide transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
              style={{ border: '1px solid #ddd', color: '#494551' }}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk tracking-wide transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
              style={{ border: '1px solid #ddd', color: '#494551' }}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-grotesk tracking-wide transition-colors hover:text-[#ff6a00] hover:border-[#ff6a00]"
              style={{ border: '1px solid #ddd', color: '#494551' }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Notebook
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center  px-6 py-1 rounded-full text-xs md:text-[12px] font-grotesk tracking-widest text-white transition-opacity hover:opacity-90"
            style={{ background: '#4e4d4b' }}
          >
            Voir
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
