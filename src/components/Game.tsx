import React, { useState } from 'react'
import { GameConstructorOptions } from '../game/modules/game'
import '../styles/Game.scss'
import Canvas from './Canvas'

const Game = (props: GameConstructorOptions) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="Game">
      <div className="game-controls">
        <button onClick={() => setIsPlaying((playing) => !playing)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <Canvas isPlaying={isPlaying} {...props} />
    </div>
  )
}

export default Game
