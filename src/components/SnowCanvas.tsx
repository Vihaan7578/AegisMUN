import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSnowPreset } from '@tsparticles/preset-snow'
import type { ISourceOptions } from '@tsparticles/engine'

const SnowCanvas = () => {
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      try {
        await loadSnowPreset(engine)
      } catch (error) {
        console.warn('Failed to load snow preset:', error)
      }
    }).then(() => setEngineReady(true))
  }, [])

  if (!engineReady) return null

  const snowOptions: ISourceOptions = {
    preset: 'snow',
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 100
      },
      color: {
        value: ['#ffffff', '#e6f3ff', '#cce7ff']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 1,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: { min: 1, max: 3 },
        direction: 'bottom',
        random: true,
        straight: false,
        outModes: {
          default: 'out'
        },
        attract: {
          enable: false
        }
      }
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: true,
          mode: 'bubble'
        },
        resize: {
          enable: true
        }
      },
      modes: {
        bubble: {
          distance: 100,
          size: 8,
          duration: 2,
          opacity: 1
        }
      }
    },
    detectRetina: true,
    background: {
      color: 'transparent'
    }
  }

  return (
    <Particles
      id="snowCanvas"
      options={snowOptions}
    />
  )
}

export default SnowCanvas 