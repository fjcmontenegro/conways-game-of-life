import React, { useState } from 'react'
import Game from './components/Game'
import './styles/App.scss'

export default function App(): React.ReactElement {
  const [currStep, setCurrStep] = useState(0)

  return (
    <div className="App">
      <h1 className="site-title">
        Conway&apos;s
        <br /> Game of Life
      </h1>
      <h2 className="site-subtitle">
        by{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/SplinterDev"
        >
          SplinterDev
        </a>
      </h2>
      <div className="game-container">
        <Game
          bgColor="0, 18, 25"
          cellColor="148, 210, 189"
          playOnMount={true}
        />
      </div>
      <div className="body-width">
        <p>
          The Game of Life is a pretty fun cellular automaton. It was created by
          the British mathematician John Horton Conway in 1970. It&apos;s a 2D
          grid where every cell is either <b>dead</b> or <b>alive</b>, and they
          interact with their neighbors following four simple rules.
        </p>

        <h2>1. Rules of life</h2>
        <ol>
          <li>
            Any <b>live cell</b> with fewer than <b>two</b> live neighbours{' '}
            <b>dies</b>, as if by underpopulation.
          </li>
          <li>
            Any <b>live cell</b> with <b>two or three</b> live neighbours{' '}
            <b>lives</b> on to the next generation.
          </li>
          <li>
            Any <b>live cell</b> with more than <b>three</b> live neighbours
            <b>dies</b>, as if by overpopulation.
          </li>
          <li>
            Any <b>dead cell</b> with exactly <b>three</b> live neighbours
            becomes a <b>live</b> cell, as if by reproduction.
          </li>
        </ol>
      </div>
    </div>
  )
}
