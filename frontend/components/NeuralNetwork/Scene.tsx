'use client'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Network from './Network'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [-5, 0, 22], fov: 60 }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#050d1a']} />
      <Network />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
