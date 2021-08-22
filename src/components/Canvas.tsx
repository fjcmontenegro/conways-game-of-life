import React, { useEffect, useRef } from 'react'
import { Game } from '../game/modules/game'

interface Props {
  fadeRate?: number
  fps?: number
  isPlaying: boolean
}

const Canvas = ({ fadeRate, fps, isPlaying }: Props): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Game>()

  console.log('rendered', isPlaying)

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.setPlay(isPlaying)
    }
  }, [isPlaying])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    let resizeCallback: (() => void) | null = null

    if (canvas && container) {
      if (gameRef) {
        resizeCallback = () => {
          gameRef.current?.resize(container)
        }
        window.addEventListener('resize', resizeCallback)
        gameRef.current = new Game(canvas, container, {
          fadeRate: fadeRate,
          fps: fps,
        })
        gameRef.current.init()
        gameRef.current.mainLoop()
      }
    }

    return () => {
      gameRef?.current?.animationFrame &&
        window.cancelAnimationFrame(gameRef.current.animationFrame)
      resizeCallback && window.removeEventListener('resize', resizeCallback)
    }
  }, [canvasRef, containerRef])
  return (
    <div ref={containerRef} style={styles.container}>
      <canvas ref={canvasRef} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 5,
  },
}

export default Canvas
