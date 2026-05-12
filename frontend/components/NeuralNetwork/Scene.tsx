'use client'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Network from './Network'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [-5, 0, 22], fov: 60 }}
      dpr={[1, 2]}
      gl={{ alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Network />
      <EffectComposer>
        <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.9} intensity={2} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
