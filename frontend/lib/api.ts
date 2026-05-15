import { apiClient } from '@/lib/axios'
import type {
  Profile,
  Skill,
  Project,
  Experience,
  Certification,
  LearningItem,
  MLModel,
  Message,
  Analytics,
  MessageCreate,
  VisitorCreate,
} from '@/lib/types'

// --- Public (Server Components — SSG/ISR) ---
export const getProfile = () => apiClient.get<Profile>('/api/v1/profile').then((r) => r.data)

export const getSkills = () => apiClient.get<Skill[]>('/api/v1/skills').then((r) => r.data)

export const getProjects = () =>
  apiClient
    .get<{
      items: Project[]
      total: number
      page: number
      size: number
    }>('/api/v1/projects?size=100')
    .then((r) => r.data.items)

export const getProject = (slug: string) =>
  apiClient.get<Project>(`/api/v1/projects/${slug}`).then((r) => r.data)

export const getExperience = () =>
  apiClient.get<Experience[]>('/api/v1/experience').then((r) => r.data)

export const getCertifications = () =>
  apiClient.get<Certification[]>('/api/v1/certifications').then((r) => r.data)

export const getLearning = () =>
  apiClient.get<LearningItem[]>('/api/v1/learning').then((r) => r.data)

export const getModels = (projectId: string) =>
  apiClient.get<MLModel[]>(`/api/v1/projects/${projectId}/models`).then((r) => r.data)

// --- Mutations (Client Components — useMutation) ---
export const sendMessage = (data: MessageCreate) =>
  apiClient.post<Message>('/api/v1/messages', data).then((r) => r.data)

export const trackVisit = (data: VisitorCreate) =>
  apiClient.post('/api/v1/visitors', data).then((r) => r.data)

export const login = (email: string, password: string) =>
  apiClient
    .post<{ access_token: string }>('/api/v1/auth/login', { email, password })
    .then((r) => r.data)

// --- Admin (JWT injected automatically by axios interceptor) ---
export const getMessages = () => apiClient.get<Message[]>('/api/v1/messages').then((r) => r.data)

export const getAnalytics = () => apiClient.get<Analytics>('/api/v1/visitors').then((r) => r.data)

export const markRead = (id: string) =>
  apiClient.patch(`/api/v1/messages/${id}/read`).then((r) => r.data)
