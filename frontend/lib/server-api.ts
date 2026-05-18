import { cache } from 'react'
import type { Profile, Skill, Project, Experience, Certification, LearningItem } from '@/lib/types'

const BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const REVALIDATE = 60

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`${res.status} ${path}`)
  return res.json() as Promise<T>
}

export const getProfile = cache(() => get<Profile>('/api/v1/profile'))

export const getSkills = cache(() => get<Skill[]>('/api/v1/skills'))

export const getProjects = cache(() =>
  get<{ items: Project[] }>('/api/v1/projects?size=100').then((d) => d.items)
)

export const getProject = cache((slug: string) => get<Project>(`/api/v1/projects/${slug}`))

export const getExperience = cache(() => get<Experience[]>('/api/v1/experience'))

export const getCertifications = cache(() => get<Certification[]>('/api/v1/certifications'))

export const getLearning = cache(() => get<LearningItem[]>('/api/v1/learning'))
