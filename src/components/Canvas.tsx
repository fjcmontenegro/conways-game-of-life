import React, { useEffect, useRef } from 'react'
import { Game, GameConstructorOptions } from '../game/modules/game'

type Props = {
  isPlaying: boolean
} & GameConstructorOptions

const Canvas = ({ isPlaying, ...props }: Props): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Game>()

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.setPlay(isPlaying)
    }
  }, [isPlaying])

  useEffect(() => {
    if (gameRef.current && props.immortality !== undefined) {
      gameRef.current.setImmortality(props.immortality)
    }
  }, [props.immortality])

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
        gameRef.current = new Game(canvas, container, props)
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
    <div ref={containerRef} className="Canvas" style={styles.container}>
      <canvas ref={canvasRef} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    height: '100%',
  },
}

export default Canvas
