import React, { useState } from 'react'
import { Formation, GameConstructorOptions } from '../game/modules/game'
import '../styles/Game.scss'
import Canvas from './Canvas'

type Props = {
  playOnMount?: boolean
  initialFormation?: Formation
  showCustomFormations?: boolean
} & GameConstructorOptions

const Game = ({
  playOnMount = false,
  initialFormation,
  showCustomFormations,
  ...props
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(playOnMount)
  const [canvasId, setCanvasId] = useState(new Date().getTime())
  const [formation, setFormation] = useState<Formation | null>()
  const [immortality, setImmortality] = useState(false)

  const changeFormation = (f: Formation | null) => {
    setFormation(f)
    setCanvasId(new Date().getTime())
  }

  return (
    <div className="Game">
      <div className="game-controls">
        <button onClick={() => setIsPlaying((playing) => !playing)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {showCustomFormations && (
          <>
            <button onClick={() => setImmortality((imm) => !imm)}>
              Immortality Mode {immortality ? 'Off' : 'On'}
            </button>
            <button
              className="inverted"
              onClick={() => changeFormation('fiveBlocks')}
            >
              Five Blocks
            </button>
            <button
              className="inverted"
              onClick={() => changeFormation('theBrain')}
            >
              The Brain
            </button>
            <button
              className="inverted"
              onClick={() => changeFormation('pulsars')}
            >
              Pulsars
            </button>
            <button
              className="inverted"
              onClick={() => changeFormation('formation4')}
            >
              Flower
            </button>
            <button
              className="inverted"
              onClick={() => changeFormation('neverendingThingy')}
            >
              Never-Ending Thingy (that ends)
            </button>
          </>
        )}
        <button className="reset-button" onClick={() => changeFormation(null)}>
          Reset
        </button>
      </div>
      <Canvas
        key={canvasId}
        isPlaying={isPlaying}
        initialFormation={formation ?? initialFormation}
        {...props}
        immortality={immortality}
      />
    </div>
  )
}

export default Game
