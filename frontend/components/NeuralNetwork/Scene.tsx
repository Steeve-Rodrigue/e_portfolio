'use client'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Network from './Network'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [-5, 0, 22], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
        })
      }}
    >
      <Network />
      <EffectComposer>
        <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.9} intensity={2} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
