import React, { useState } from 'react'
import Canvas from './components/Canvas'
import Info from './components/Info'
import { INITIAL_FADE_RATE, INITIAL_FPS } from './game/constants/animation'
import './styles/styles.css'

export const LOWEST_FPS = 1
export const HIGHEST_FPS = 60
export const LOWEST_FADE_RATE = 0.0
export const HIGHEST_FADE_RATE = 1

export default function App(): React.ReactElement {
  const [isPlaying, setIsPlaying] = useState(false)
  const [fps, setFps] = useState(INITIAL_FPS)
  const [fadeRate, setFadeRate] = useState(INITIAL_FADE_RATE)

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
        onFadeRateDown={() =>
          setFadeRate((oldRate) =>
            oldRate > LOWEST_FADE_RATE ? oldRate - 0.05 : oldRate,
          )
        }
        onFadeRateUp={() =>
          setFadeRate((oldRate) =>
            oldRate < HIGHEST_FADE_RATE ? oldRate + 0.05 : oldRate,
          )
        }
        fps={fps}
        fadeRate={fadeRate}
      />
      <Canvas isPlaying={isPlaying} fps={fps} fadeRate={fadeRate} />
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
