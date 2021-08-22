import React, { useState } from 'react'
import Canvas from './components/Canvas'
import Info from './components/Info'
import './styles/styles.css'

export default function App(): React.ReactElement {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleClick = () => {
    setIsPlaying((p) => !p)
  }

  return (
    <div style={style}>
      <Info onPlay={handleClick} isPlaying={isPlaying} />
      {/* canvas 1 */}
      {/* <Canvas isPlaying={isPlaying} fadeRate={1} /> */}
      <Canvas isPlaying={isPlaying} fadeRate={1} drawDead />
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
