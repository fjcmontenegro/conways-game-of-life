import React from 'react'

interface Props {
  isPlaying: boolean
  onPlay: () => void
  immortality: boolean
  onToggleImmortality: () => void
}

const Info = ({
  isPlaying,
  onPlay,
  immortality,
  onToggleImmortality,
}: Props): React.ReactElement => {
  return (
    <div className="info-container">
      <div>
        <h1>Conway&apos;s Game of Life</h1>

        <p>
          Interact with the dark canvas on the right and press <b>Play</b> when
          you&apos;re ready to start the simulation.
        </p>

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
      <div className="play-control">
        <button onClick={onToggleImmortality}>
          {immortality ? 'Deactivate Immortality' : 'Activate Immortality'}
        </button>
      </div>
    </div>
  )
}

export default Info
