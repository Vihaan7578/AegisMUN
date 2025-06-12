import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const FloatingParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Fewer particles that orbit around cursor
    const particleCount = 15
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const orbitRadius = new Float32Array(particleCount)
    const orbitSpeed = new Float32Array(particleCount)
    const orbitPhase = new Float32Array(particleCount)

    // Initialize particles with random orbital properties
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Random initial positions
      originalPositions[i3] = (Math.random() - 0.5) * 15
      originalPositions[i3 + 1] = (Math.random() - 0.5) * 15
      originalPositions[i3 + 2] = (Math.random() - 0.5) * 5
      
      positions[i3] = originalPositions[i3]
      positions[i3 + 1] = originalPositions[i3 + 1]
      positions[i3 + 2] = originalPositions[i3 + 2]
      
      // Orbital properties
      orbitRadius[i] = 0.5 + Math.random() * 2 // Radius between 0.5 and 2.5
      orbitSpeed[i] = 0.02 + Math.random() * 0.03 // Speed between 0.02 and 0.05
      orbitPhase[i] = Math.random() * Math.PI * 2 // Random starting phase
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Particle material with glow effect
    const material = new THREE.PointsMaterial({
      color: 0xffd37e,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    camera.position.z = 5

    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer
    particlesRef.current = particles

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      timeRef.current += 0.016 // Approximate 60fps

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        
        // Mouse position in world coordinates
        const mouseWorldX = mouseRef.current.x * 8
        const mouseWorldY = mouseRef.current.y * 8

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          
          // Calculate orbital motion around cursor
          const angle = timeRef.current * orbitSpeed[i] + orbitPhase[i]
          const radius = orbitRadius[i]
          
          // Orbital offset from mouse position
          const orbitX = Math.cos(angle) * radius
          const orbitY = Math.sin(angle) * radius
          
          // Smooth interpolation between original position and cursor orbit
          const influenceRadius = 3
          const distanceToMouse = Math.sqrt(
            (originalPositions[i3] - mouseWorldX) ** 2 + 
            (originalPositions[i3 + 1] - mouseWorldY) ** 2
          )
          
          const influence = Math.max(0, 1 - distanceToMouse / influenceRadius)
          
          // Blend between original position and orbital position around mouse
          const targetX = originalPositions[i3] * (1 - influence) + (mouseWorldX + orbitX) * influence
          const targetY = originalPositions[i3 + 1] * (1 - influence) + (mouseWorldY + orbitY) * influence
          
          // Smooth movement towards target
          positions[i3] += (targetX - positions[i3]) * 0.05
          positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.05
          
          // Gentle floating motion for Z axis
          positions[i3 + 2] = originalPositions[i3 + 2] + Math.sin(timeRef.current * 0.01 + i) * 0.3
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
        
        // Gentle rotation
        particlesRef.current.rotation.z += 0.0005
      }

      renderer.render(scene, camera)
    }

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="floating-particles"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default FloatingParticles 