export const queryKeys = {
  profile: ['profile'] as const,
  skills: ['skills'] as const,
  projects: ['projects'] as const,
  project: (slug: string) => ['projects', slug] as const,
  experience: ['experience'] as const,
  certifications: ['certifications'] as const,
  learning: ['learning'] as const,
  models: (projectId: string) => ['models', projectId] as const,
  messages: ['messages'] as const,
  analytics: ['analytics'] as const,
}
