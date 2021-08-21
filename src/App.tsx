import React, { useState } from 'react'
import Canvas from './components/Canvas'
import Info from './components/Info'

export default function App(): React.ReactElement {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleClick = () => {
    setIsPlaying((p) => !p)
  }

  return (
    <div style={style}>
      <Info onClick={handleClick} />
      <Canvas isPlaying={isPlaying} />
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
}
