export interface Profile {
  name: string
  title: string
  tagline: string | null
  availability_status: string | null
  is_open_to_work: boolean
  location: string | null
  email: string | null
  github_url: string | null
  linkedin_url: string | null
  calendly_url: string | null
  social_links: Record<string, string> | null
  ethics_statement: string | null
  communication_style: string | null
  work_preference: string | null
  fun_fact: string | null
}

export interface Skill {
  id: string
  name: string
  category: string
  cluster: 'Data & Analytics' | 'Machine Learning / AI' | 'Infrastructure' | 'Soft Skills'
  icon_devicon: string | null
  mastery_level: number
  featured: boolean
  display_order: number
}

export type Block = { type: 'text'; content: string } | { type: 'image'; url: string }

export interface Project {
  id: string
  slug: string
  title: string
  properties: string | null
  context: Block[] | null
  problematic: Block[] | null
  methodology: Block[] | null
  results_impact: string | null
  metrics: Record<string, number> | null
  tech_stack: string[]
  categories: string[]
  github_url: string | null
  demo_url: string | null
  notebook_url: string | null
  thumbnail_url: string | null
  has_ml_demo: boolean
  ml_endpoint: string | null
  featured: boolean
  display_order: number
  created_at: string
}

export interface Experience {
  id: string
  type: 'job' | 'education'
  company: string
  role: string
  description: string | null
  impact_metric: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  logo_url: string | null
  display_order: number
}

export interface Certification {
  id: string
  name: string
  issuer: string
  url: string | null
  issued_at: string | null
  badge_url: string | null
}

export interface LearningItem {
  id: string
  type: 'paper' | 'course' | 'competition' | 'current'
  title: string
  source: string | null
  url: string | null
  progress_pct: number | null
  is_current: boolean
  status: string | null
  started_at: string | null
}

export interface MLModel {
  id: string
  project_id: string
  name: string
  endpoint: string
  framework: string | null
  description: string | null
  accuracy: number | null
  metrics: Record<string, number> | null
  is_active: boolean
  deployed_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  project_type: 'hiring' | 'freelance' | 'collaboration' | null
  message: string
  is_read: boolean
  created_at: string
}

export interface Analytics {
  total: number
  by_page: Array<{ page: string; visits: number }>
  top_referrers: Array<{ referrer: string; visits: number }>
  recent: Array<{
    id: string
    page: string
    country: string | null
    device: string | null
    visited_at: string
  }>
}

export interface MessageCreate {
  name: string
  email: string
  project_type: 'hiring' | 'freelance' | 'collaboration' | null
  message: string
}

export interface VisitorCreate {
  page: string
  referrer: string | null
  device: string | null
  browser: string | null
  duration_s?: number
}
