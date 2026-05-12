'use client'
import { Canvas } from '@react-three/fiber'
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
    </Canvas>
  )
}
