import NeuralNetwork from '@/components/NeuralNetwork'
import { getProfile } from '@/lib/server-api'
import { HeroClient } from '@/components/sections/HeroClient'

export async function Hero() {
  const profile = await getProfile()

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 5rem)',
        overflow: 'hidden',
        background: 'linear-gradient(to right, #ffffff 20%, #000000 100%)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <NeuralNetwork />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #ffffff 0%, #ffffff 25%, transparent 99%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      <HeroClient profile={profile} />
    </section>
  )
}
