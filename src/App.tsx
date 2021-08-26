import React, { useState } from 'react'
import Game from './components/Game'
import './styles/App.scss'

export default function App(): React.ReactElement {
  const [currStep, setCurrStep] = useState(0)

  return (
    <div className="App">
      <h1>Conway&apos;s Game of Life</h1>
      <div className="game-container">
        <Game bgColor="148, 210, 189" cellColor="0, 18, 25" />
      </div>
    </div>
  )
}
