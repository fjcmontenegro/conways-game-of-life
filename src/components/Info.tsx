import React from 'react'
import { HIGHEST_FPS, LOWEST_FPS } from '../App'

interface Props {
  isPlaying: boolean
  onPlay: () => void
  onSpeedUp: () => void
  onSpeedDown: () => void
  fps: number
}

const Info = ({
  isPlaying,
  onPlay,
  onSpeedDown,
  onSpeedUp,
  fps,
}: Props): React.ReactElement => {
  return (
    <div style={styles.container}>
      <div>
        <h1>Conway&apos;s Game of Life</h1>

        <p>
          Interact with the dark canvas on the right and press <b>Play</b> when
          you&apos;re ready to start the simulation.
        </p>
        <p>Current FPS: {fps}</p>

        {/* <p>Rules:</p>
        <ol>
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ol> */}
      </div>

      <div className="play-control">
        <button onClick={onPlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
      <div className="fps-controls">
        <button onClick={onSpeedDown} disabled={fps <= LOWEST_FPS}>
          - Speed
        </button>
        <button onClick={onSpeedUp} disabled={fps >= HIGHEST_FPS}>
          + Speed
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(148, 210, 189, 1)',
    overflow: 'auto',
  },
}

export default Info
