'use client'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import {
  NODE_COUNT,
  SCENE_BOUNDS,
  CONNECT_THRESHOLD,
  MAX_CONNECTIONS,
  NODE_SPEED,
  PULSE_SPEED,
  NODE_COLOR,
  NODE_EMISSIVE,
  NODE_EMISSIVE_INTENSITY,
  NODE_RADIUS,
  PULSE_RADIUS,
  CONNECTION_OPACITY,
  CAMERA_DRIFT_SPEED,
  CAMERA_DRIFT_AMPLITUDE,
  CAMERA_X_OFFSET,
  CAMERA_X_OFFSET_MOBILE,
} from './constants'

export default function Network() {
  const { camera, size } = useThree()

  // Mutable flat arrays — no state, no re-renders
  const positions = useRef<Float32Array>(
    Float32Array.from({ length: NODE_COUNT * 3 }, () => (Math.random() - 0.5) * SCENE_BOUNDS * 2)
  )
  const velocities = useRef<Float32Array>(
    Float32Array.from({ length: NODE_COUNT * 3 }, () => (Math.random() - 0.5) * 2 * NODE_SPEED)
  )
  const connectionPairs = useRef<Int32Array>(new Int32Array(MAX_CONNECTIONS * 2))
  const pulseProgress = useRef<Float32Array>(
    Float32Array.from({ length: MAX_CONNECTIONS }, () => Math.random())
  )
  const activeCount = useRef(0)

  const nodesMesh = useRef<THREE.InstancedMesh>(null)
  const pulsesMesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const attr = new THREE.BufferAttribute(new Float32Array(MAX_CONNECTIONS * 2 * 3), 3)
    attr.setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('position', attr)
    geo.setDrawRange(0, 0)
    return geo
  }, [])

  useFrame(({ clock }, delta) => {
    const pos = positions.current
    const vel = velocities.current
    const pairs = connectionPairs.current
    const progress = pulseProgress.current

    // 1 — move nodes, bounce at bounds
    for (let i = 0; i < NODE_COUNT; i++) {
      const b = i * 3
      for (let k = 0; k < 3; k++) {
        pos[b + k] += vel[b + k] * delta
        if (pos[b + k] > SCENE_BOUNDS) {
          pos[b + k] = SCENE_BOUNDS
          vel[b + k] *= -1
        }
        if (pos[b + k] < -SCENE_BOUNDS) {
          pos[b + k] = -SCENE_BOUNDS
          vel[b + k] *= -1
        }
      }
    }

    // 2 — update node instanced mesh
    if (nodesMesh.current) {
      for (let i = 0; i < NODE_COUNT; i++) {
        const b = i * 3
        dummy.position.set(pos[b], pos[b + 1], pos[b + 2])
        dummy.scale.setScalar(1)
        dummy.updateMatrix()
        nodesMesh.current.setMatrixAt(i, dummy.matrix)
      }
      nodesMesh.current.instanceMatrix.needsUpdate = true
    }

    // 3 — rebuild connections
    const threshSq = CONNECT_THRESHOLD * CONNECT_THRESHOLD
    let count = 0
    for (let i = 0; i < NODE_COUNT && count < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < NODE_COUNT && count < MAX_CONNECTIONS; j++) {
        const ai = i * 3,
          bi = j * 3
        const dx = pos[ai] - pos[bi]
        const dy = pos[ai + 1] - pos[bi + 1]
        const dz = pos[ai + 2] - pos[bi + 2]
        if (dx * dx + dy * dy + dz * dz < threshSq) {
          pairs[count * 2] = i
          pairs[count * 2 + 1] = j
          count++
        }
      }
    }
    activeCount.current = count

    // 4 — update line geometry buffer
    const attr = lineGeometry.getAttribute('position') as THREE.BufferAttribute
    const buf = attr.array as Float32Array
    for (let c = 0; c < count; c++) {
      const ai = pairs[c * 2] * 3
      const bi = pairs[c * 2 + 1] * 3
      const lp = c * 6
      buf[lp] = pos[ai]
      buf[lp + 1] = pos[ai + 1]
      buf[lp + 2] = pos[ai + 2]
      buf[lp + 3] = pos[bi]
      buf[lp + 4] = pos[bi + 1]
      buf[lp + 5] = pos[bi + 2]
    }
    attr.needsUpdate = true
    lineGeometry.setDrawRange(0, count * 2)

    // 5 — update pulses along active connections
    if (pulsesMesh.current) {
      for (let c = 0; c < MAX_CONNECTIONS; c++) {
        if (c < count) {
          progress[c] = (progress[c] + PULSE_SPEED * delta) % 1
          const t = progress[c]
          const ai = pairs[c * 2] * 3
          const bi = pairs[c * 2 + 1] * 3
          dummy.position.set(
            pos[ai] + (pos[bi] - pos[ai]) * t,
            pos[ai + 1] + (pos[bi + 1] - pos[ai + 1]) * t,
            pos[ai + 2] + (pos[bi + 2] - pos[ai + 2]) * t
          )
          dummy.scale.setScalar(1)
        } else {
          dummy.position.set(0, 0, -99999)
          dummy.scale.setScalar(0)
        }
        dummy.updateMatrix()
        pulsesMesh.current.setMatrixAt(c, dummy.matrix)
      }
      pulsesMesh.current.instanceMatrix.needsUpdate = true
    }

    // 6 — camera drift (offset left on desktop so network appears on the right side)
    const t = clock.elapsedTime
    const xOffset = size.width < 850 ? CAMERA_X_OFFSET_MOBILE : CAMERA_X_OFFSET
    camera.position.x = xOffset + Math.sin(t * CAMERA_DRIFT_SPEED) * CAMERA_DRIFT_AMPLITUDE
    camera.position.y = Math.cos(t * CAMERA_DRIFT_SPEED * 0.8) * (CAMERA_DRIFT_AMPLITUDE * 0.6)
    camera.lookAt(xOffset, 0, 0)
  })

  return (
    <>
      <ambientLight intensity={0.2} />

      <instancedMesh ref={nodesMesh} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[NODE_RADIUS, 12, 12]} />
        <meshStandardMaterial
          color={NODE_COLOR}
          emissive={NODE_EMISSIVE}
          emissiveIntensity={NODE_EMISSIVE_INTENSITY}
          toneMapped={false}
        />
      </instancedMesh>

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={NODE_COLOR}
          transparent
          opacity={CONNECTION_OPACITY}
          toneMapped={false}
        />
      </lineSegments>

      <instancedMesh ref={pulsesMesh} args={[undefined, undefined, MAX_CONNECTIONS]}>
        <sphereGeometry args={[PULSE_RADIUS, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00e5ff"
          emissiveIntensity={6}
          toneMapped={false}
        />
      </instancedMesh>
    </>
  )
}
