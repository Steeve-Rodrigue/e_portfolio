import type { Metadata } from 'next'
import { getSkills } from '@/lib/api'
import { SkillsContent } from '@/components/skills/SkillsContent'

export const metadata: Metadata = {
  title: 'Expertise & Compétences',
}

export default async function SkillsPage() {
  const skills = await getSkills()

  return (
    <div
      style={{
        background: '#fafaf9',
        minHeight: '100vh',
        color: '#1d1b20',
        fontFamily: 'var(--font-grotesk)',
      }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />
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
        <SkillsContent skills={skills} />
      </main>
    </div>
  )
}
