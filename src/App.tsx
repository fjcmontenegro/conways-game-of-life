import React from 'react'
import Canvas from './components/Canvas'
import Info from './components/Info'

export default function App(): React.ReactElement {
  return (
    <div style={style}>
      <Info />
      <Canvas />
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
