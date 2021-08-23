import React, { useState } from 'react'
import Canvas from './components/Canvas'
import Info from './components/Info'
import './styles/styles.css'

export default function App(): React.ReactElement {
  const [isPlaying, setIsPlaying] = useState(false)
  const [immortality, setImmortality] = useState(false)

  const handleClick = () => {
    setIsPlaying((p) => !p)
  }

  return (
    <div style={style}>
      <Info
        onPlay={handleClick}
        immortality={immortality}
        onToggleImmortality={() => setImmortality((im) => !im)}
        isPlaying={isPlaying}
      />
      <div className="canvas-area">
        {/* <div style={{ height: '50%', width: '50%' }}>
          <Canvas isPlaying={isPlaying} fadeRate={1} drawDead={false} />
        </div>
        <div style={{ height: '50%', width: '50%' }}>
          <Canvas isPlaying={isPlaying} fadeRate={1} />
        </div>
        <div style={{ height: '50%', width: '50%' }}>
          <Canvas isPlaying={isPlaying} fadeRate={0.25} />
        </div>
        <div style={{ height: '50%', width: '50%' }}>
          <Canvas isPlaying={isPlaying} fadeRate={0.05} />
        </div> */}
        <Canvas
          isPlaying={isPlaying}
          immortality={immortality}
          fadeRate={0.1}
        />
      </div>
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
