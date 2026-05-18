import type { Metadata } from 'next'
import { getProjects } from '@/lib/server-api'
import { ProjectsContent } from '@/components/projects/ProjectsContent'

export const metadata: Metadata = {
  title: 'Projets',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const sorted = [...projects].sort((a, b) => a.display_order - b.display_order)

  return (
    <div
      style={{
        background: '#fafaf9',
        minHeight: '100vh',
        color: '#1d1b20',
        fontFamily: 'var(--font-grotesk)',
      }}
    >
      <main
        style={{
          paddingTop: 40,
          paddingBottom: 80,
          paddingLeft: 'clamp(16px, 5vw, 80px)',
          paddingRight: 'clamp(16px, 5vw, 80px)',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <ProjectsContent projects={sorted} />
      </main>
    </div>
  )
}
