'use client'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function NeuralNetwork() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Scene />
    </div>
  )
}
