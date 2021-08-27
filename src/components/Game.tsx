import React, { useState } from 'react'
import { Formation, GameConstructorOptions } from '../game/modules/game'
import '../styles/Game.scss'
import Canvas from './Canvas'

type Props = {
  playOnMount?: boolean
  initialFormation?: Formation
} & GameConstructorOptions

const Game = ({ playOnMount = false, initialFormation, ...props }: Props) => {
  const [isPlaying, setIsPlaying] = useState(playOnMount)
  const [canvasId, setCanvasId] = useState(new Date().getTime())

  return (
    <div className="Game">
      <div className="game-controls">
        <button onClick={() => setIsPlaying((playing) => !playing)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className="reset-button"
          onClick={() => setCanvasId(new Date().getTime())}
        >
          Reset
        </button>
      </div>
      <Canvas
        key={canvasId}
        isPlaying={isPlaying}
        initialFormation={initialFormation}
        {...props}
      />
    </div>
  )
}

export default Game
