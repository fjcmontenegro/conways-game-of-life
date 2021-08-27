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
          initialFormation="gliderGun"
        />
      </div>
      <div className="body-width">
        <p>
          The Game of Life is a pretty fun cellular automaton. It was created by
          the British mathematician John Horton Conway in 1970. It&apos;s a 2D
          grid where every cell is either <b>dead</b> or <b>alive</b>, and they
          interact with their 8 neighbors following simple rules.
        </p>
        <p>
          I will present the Game of Life to you through{' '}
          <b>interactive demos</b>. You can click in any of the simulations and
          draw new live cells. If you draw over living cells, you erase them.
          You can control the simulations through the buttons on the left. Have
          fun!
        </p>
        {/*  */}
        <h2>1. Rules of life</h2>
        <p>
          Every cell in the Game of Life, dead or alive, is controlled by the
          same four simple rules. To explain these rules, I will disable the
          fading out effect from the next demos, and I&apos;ll make things
          really slow (1 frame per second) so that we can see what&apos;s
          happening.
        </p>
        <h3>Rule 1:</h3>
        <blockquote>
          Any <b>live cell</b> with fewer than <b>two</b> live neighbours{' '}
          <b>dies</b>, as if by underpopulation.
        </blockquote>
        <div className="rule1-demo rule-demo">
          <p>
            The cell in the left has no live neighbors, so it will die once you
            press play. The two cells on the right have only one neighbor each
            (since we don&apos;t count a cell as neighbor of itself), so they
            will both die as well, the poor fellows.
          </p>
          <div className="game">
            <Game
              bgColor="0, 18, 25"
              cellColor="148, 210, 189"
              initialFormation="rule1"
              fps={1}
              fadeRate={1}
              drawDead={false}
            />
          </div>
        </div>
        <h3>Rule 2:</h3>
        <blockquote>
          Any <b>live cell</b> with <b>two or three</b> live neighbours{' '}
          <b>lives</b> on to the next generation.
        </blockquote>
        <div className="rule2-demo rule-demo">
          <div className="game">
            <Game
              bgColor="0, 18, 25"
              cellColor="148, 210, 189"
              initialFormation="rule2"
              fps={1}
              fadeRate={1}
              drawDead={false}
            />
          </div>
          <p>
            The two formations on the left are considered <b>still lifes</b>. If
            you check each cell in those formations, you&apos;ll see they all
            have 2 neighbors, so rule 2 tells us they will simply stay alive.
            But if you press play, the guy on the right will start blinking.
            Why&apos;s that? Well, that&apos;s because of rule 4, so let&apos;
            keep going.
          </p>
        </div>
        <h3>Rule 3:</h3>
        <blockquote>
          Any <b>live cell</b> with more than <b>three</b> live neighbours{' '}
          <b>dies</b>, as if by overpopulation.
        </blockquote>
        <div className="rule3-demo rule-demo">
          <p>
            The cell in the center of this formation is surrounded by 4 total
            live neighbors, and rule 3 says it will die. Indeed that&apos;s what
            happens, but check out what happens next. That&apos;s because of my
            favorite rule of GoL, rule 4!
          </p>
          <div className="game">
            <Game
              bgColor="0, 18, 25"
              cellColor="148, 210, 189"
              initialFormation="rule3"
              fps={1}
              fadeRate={1}
              drawDead={false}
            />
          </div>
        </div>
        <h3>Rule 4:</h3>
        <blockquote>
          Any <b>dead cell</b> with exactly <b>three</b> live neighbours becomes
          a <b>live</b> cell, as if by reproduction.
        </blockquote>
        <div className="rule4-demo rule-demo">
          <div className="game">
            <Game
              bgColor="0, 18, 25"
              cellColor="148, 210, 189"
              initialFormation="rule4"
              fps={1}
              fadeRate={1}
              drawDead={false}
            />
          </div>
          <p>
            So far we&apos;ve set the rules for when living cells stay alive or
            die, but rule 4 is the one that <b>creates</b> life! Every dead cell
            between the three vertical dotted lines have exaclty 3 live
            neighbors, so when you press play, they&apos;ll become alive and
            form two full lines (and keep going from there).
          </p>
        </div>
        <p>
          Interact with the demos and see if you can come up with interesting{' '}
          <b>forms of life</b>.
        </p>
        {/*  */}
        <h2>2. Forms of life</h2>
        <p>
          There are a lot of patterns that emerge in GoL, and they can be
          classified. I&apos;m just going to mention two.
        </p>
        <div className="life-form-demo">
          <p>
            The most common from of life are <b>still forms</b>, when cells get
            themselves in a formation that doesn&apos;t change from one frame to
            the next. Another common life form are <b>oscillators</b>,
            formations that go back and forth between two states. And look, our
            little friend <b>blinker</b> is in there!
          </p>
          <div className="game">
            <Game
              bgColor="0, 18, 25"
              cellColor="148, 210, 189"
              initialFormation="forms"
              fps={10}
              fadeRate={1 / 2}
              drawDead={false}
            />
          </div>
        </div>
        <p>
          If you interact with this demo, you&apos;ll see I bumped the frame
          rate to 10, and I added a nice fading effect when the cell dies. So,
          that got me thinking, where can we go from here?
        </p>
        {/*  */}
        <h2>3. Playing the Game of Life</h2>
        <p>
          When I add a little fading effect for dying cells and use a higher
          frame rate, we can start getting interesting results. Here&apos; a
          demo with a <b>Gosper glider gun</b>. Guns are formations that
          oscillate between states, and end up generating <b>spaceships</b>.
          These are forms of life that move forward indefinitely. Check it out!
        </p>
        <div className="gun-demo">
          <Game
            bgColor="0, 18, 25"
            cellColor="148, 210, 189"
            playOnMount={true}
            initialFormation="gliderGun"
            fps={25}
            fadeRate={0.05}
          />
        </div>
        <p>
          Here we have a higher frame rate as well as slower fading effect. The
          cell only leaves the grid 20 frames after its death.
        </p>
      </div>
    </div>
  )
}
