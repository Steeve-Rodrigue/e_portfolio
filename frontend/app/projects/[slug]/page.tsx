import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject } from '@/lib/api'
import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug).catch(() => null)
  return { title: project ? project.title : 'Projet' }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug).catch(() => null)

  if (!project) notFound()

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1d1b20] font-grotesk">
      <ProjectDetailContent project={project} />
    </div>
  )
}
