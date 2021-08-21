import React, { useEffect, useRef } from 'react'
import { Game } from '../game/modules/game'

const Canvas = (): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Game>()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (canvas && container) {
      if (gameRef) {
        gameRef.current = new Game(canvas, container)
        gameRef.current.init()
        gameRef.current.mainLoop()
      }
    }

    return () => {
      gameRef?.current?.animationFrame &&
        window.cancelAnimationFrame(gameRef.current.animationFrame)
    }
  }, [canvasRef, containerRef])
  return (
    <div ref={containerRef} style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 5,
    // display: 'flex',
  },
  canvas: {
    // flex: 1,
  },
}

export default Canvas
