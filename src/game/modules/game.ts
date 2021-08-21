import { FPS, FADE_RATE } from '../constants/animation'
import { CELL_SIZE, MAX_CELL_X, MAX_CELL_Y } from '../constants/sizes'
import { Point } from '../types/geometry'
import { createButtons } from '../util/buttons'
import { createCanvas, clearCanvas } from '../util/canvas'
import { Grid } from './grid'
import formation1 from '../data/formation1.json'

export class Game {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D | null
  map: Grid

  playing: boolean
  mousePos: Point
  isUserDrawing: boolean
  updatedCells: string[]

  lastFrame: number

  playBtn: HTMLButtonElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.map = new Grid()

    this.playing = false
    this.mousePos = { x: 0, y: 0 }
    this.isUserDrawing = false
    this.updatedCells = []

    this.lastFrame = 0

    // setup button with a callback
    this.playBtn = createButtons(() => {
      this.playing = !this.playing
      this.playBtn.innerHTML = this.playing ? 'Pause' : 'Play'
    })
  }

  init() {
    this.canvas.addEventListener('mousemove', ({ buttons, pageX, pageY }) => {
      this.mousePos.x = pageX
      this.mousePos.y = pageY

      if (this.isUserDrawing && buttons === 1) {
        this.updatePoint(this.mousePos.x, this.mousePos.y)
      }
    })

    this.canvas.addEventListener('mousedown', ({ button }) => {
      if (button === 0) {
        this.isUserDrawing = true
        this.updatePoint(this.mousePos.x, this.mousePos.y)
      }
    })

    this.canvas.addEventListener('mouseup', ({ button }) => {
      if (button === 0) {
        this.isUserDrawing = false
        this.updatedCells = []
      }
    })
    document.body.addEventListener('keydown', ({ key }) => {
      if (key === ' ') {
        console.log(this.map.export())
      } else if (key === '1') {
        this.map.import(formation1)
      }
    })
  }

  updatePoint(mouseX: number, mouseY: number) {
    const cellX = Math.floor(mouseX / CELL_SIZE)
    const cellY = Math.floor(mouseY / CELL_SIZE)
    const coord = `${cellX},${cellY}`

    if (!this.updatedCells.includes(coord)) {
      this.map.cells[cellX][cellY] = this.map.cells[cellX][cellY] === 1 ? 0 : 1
      this.updatedCells.push(coord)
    }
  }

  update(time: number) {
    if (time - this.lastFrame < 1000 / FPS) {
      return
    }

    this.lastFrame = time
    const newMap = new Grid()

    for (let i = 0; i < MAX_CELL_X; i++) {
      for (let j = 0; j < MAX_CELL_Y; j++) {
        const aliveCount = this.map.getAliveNeighboors({ x: i, y: j })

        // Any live cell with two or three live neighbours survives.
        const rule1 =
          this.map.cells[i][j] === 1 && (aliveCount === 2 || aliveCount === 3)
        // Any dead cell with three live neighbours becomes a live cell
        const rule2 = this.map.cells[i][j] !== 1 && aliveCount === 3

        if (rule1 || rule2) {
          newMap.cells[i][j] = 1
        } else {
          newMap.cells[i][j] =
            this.map.cells[i][j] > 0 ? this.map.cells[i][j] - FADE_RATE : 0
        }
        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      }
    }

    this.map = newMap
  }

  render() {
    if (!this.context) return

    clearCanvas(this.context)

    for (let i = 0; i < MAX_CELL_X; i++) {
      for (let j = 0; j < MAX_CELL_Y; j++) {
        this.context.fillStyle = `rgba(148, 210, 189, ${this.map.cells[i][j]})`
        this.context.fillRect(
          i * CELL_SIZE,
          j * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE,
        )
      }
    }
  }

  mainLoop(t?: number) {
    window.requestAnimationFrame(this.mainLoop.bind(this))
    this.render()
    this.playing && this.update(t ?? 0)
  }
}
