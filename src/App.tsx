import React, { useState } from 'react'
import Canvas from './components/Canvas'
import Info from './components/Info'
import './styles/styles.css'

export const LOWEST_FPS = 1
export const HIGHEST_FPS = 60

export default function App(): React.ReactElement {
  const [isPlaying, setIsPlaying] = useState(false)
  const [fps, setFps] = useState(20)

  const handleClick = () => {
    setIsPlaying((p) => !p)
  }

  return (
    <div style={style}>
      <Info
        onPlay={handleClick}
        isPlaying={isPlaying}
        onSpeedDown={() =>
          setFps((oldFPS) => (oldFPS > LOWEST_FPS ? oldFPS - 1 : oldFPS))
        }
        onSpeedUp={() =>
          setFps((oldFPS) => (oldFPS < HIGHEST_FPS ? oldFPS + 1 : oldFPS))
        }
        fps={fps}
      />
      <Canvas isPlaying={isPlaying} fps={fps} />
    </div>
  )
}

const style: React.CSSProperties = {
  display: 'flex',
  margin: 0,
  padding: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'aquamarine',
  fontFamily: 'Helvetica, sans-serif',
  overflow: 'hidden',
}
