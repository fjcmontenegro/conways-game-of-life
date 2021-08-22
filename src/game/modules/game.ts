import { INITIAL_FADE_RATE, INITIAL_FPS } from '../constants/animation'
import { CELL_SIZE } from '../constants/sizes'
import { Point } from '../types/geometry'
import { clearCanvas } from '../util/canvas'
import { Grid } from './grid'
import formation1 from '../data/formation1.json'

export class Game {
  canvas: HTMLCanvasElement
  container: HTMLDivElement
  context: CanvasRenderingContext2D | null
  map: Grid

  isPlaying: boolean
  mousePos: Point
  isUserDrawing: boolean
  updatedCells: string[]

  lastFrame: number
  animationFrame?: number

  MAX_CELL_X: number
  MAX_CELL_Y: number
  fps: number
  fadeRate: number

  lastLoopPerformance: number[]

  constructor(canvas: HTMLCanvasElement, container: HTMLDivElement) {
    this.canvas = canvas
    this.canvas.height = container.clientHeight
    this.canvas.width = container.clientWidth

    this.MAX_CELL_X = Math.floor(this.canvas.width / CELL_SIZE)
    this.MAX_CELL_Y = Math.floor(this.canvas.height / CELL_SIZE)
    this.container = container

    this.context = this.canvas.getContext('2d')
    this.map = new Grid(this.MAX_CELL_X, this.MAX_CELL_Y)

    this.mousePos = { x: 0, y: 0 }
    this.updatedCells = []
    this.isUserDrawing = false
    this.isPlaying = false

    this.lastFrame = 0
    this.fps = INITIAL_FPS
    this.fadeRate = INITIAL_FADE_RATE

    this.lastLoopPerformance = []
  }

  resize(container: HTMLDivElement): void {
    this.canvas.height = container.clientHeight
    this.canvas.width = container.clientWidth

    this.MAX_CELL_X = Math.floor(this.canvas.width / CELL_SIZE)
    this.MAX_CELL_Y = Math.floor(this.canvas.height / CELL_SIZE)
    this.container = container

    // copy current
    const newGrid: Grid = new Grid(this.MAX_CELL_X, this.MAX_CELL_Y)
    for (const x in this.map.cells) {
      for (const y in this.map.cells[x]) {
        if (parseInt(x) < this.MAX_CELL_X && parseInt(y) < this.MAX_CELL_Y) {
          newGrid.cells[x][y] = this.map.cells[x][y]
        }
      }
    }
    this.map = newGrid
  }

  init(): void {
    this.container.addEventListener(
      'mousemove',
      ({ buttons, offsetX, offsetY }) => {
        this.mousePos.x = offsetX
        this.mousePos.y = offsetY

        if (this.isUserDrawing && buttons === 1) {
          this.updatePoint(this.mousePos.x, this.mousePos.y)
        }
      },
    )

    this.container.addEventListener('mousedown', ({ button }) => {
      if (button === 0) {
        this.isUserDrawing = true
        this.updatePoint(this.mousePos.x, this.mousePos.y)
      }
    })

    this.container.addEventListener('mouseup', ({ button }) => {
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

  setPlay(play: boolean): void {
    this.isPlaying = play
  }

  setFps(fps: number): void {
    this.fps = fps
  }

  setFadeRate(fadeRate: number): void {
    this.fadeRate = fadeRate
  }

  updatePoint(mouseX: number, mouseY: number): void {
    const cellX = Math.floor(mouseX / CELL_SIZE)
    const cellY = Math.floor(mouseY / CELL_SIZE)
    const coord = `${cellX},${cellY}`

    // if we don't check we can have a rounding error and try to select a cell
    // that doesn't exist
    if (
      cellX >= 0 &&
      cellX < this.MAX_CELL_X &&
      cellY >= 0 &&
      cellY < this.MAX_CELL_Y
    ) {
      if (!this.updatedCells.includes(coord)) {
        this.map.cells[cellX][cellY] =
          this.map.cells[cellX][cellY] === 1 ? 0 : 1
        this.updatedCells.push(coord)
      }
    }
  }

  update(time: number): void {
    if (time - this.lastFrame < 1000 / this.fps) {
      return
    }

    this.lastFrame = time
    const newMap = new Grid(this.MAX_CELL_X, this.MAX_CELL_Y)

    for (let i = 0; i < this.MAX_CELL_X; i++) {
      for (let j = 0; j < this.MAX_CELL_Y; j++) {
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
            this.map.cells[i][j] > 0 ? this.map.cells[i][j] - this.fadeRate : 0
        }
        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      }
    }

    this.map = newMap
  }

  render(): void {
    if (!this.context) return

    clearCanvas(this.context, this.canvas.width, this.canvas.height)

    for (let i = 0; i < this.MAX_CELL_X; i++) {
      for (let j = 0; j < this.MAX_CELL_Y; j++) {
        if (this.map.cells[i][j] > 0) {
          this.context.fillStyle = `rgba(148, 210, 189, ${this.map.cells[i][j]})`
          this.context.fillRect(
            i * CELL_SIZE,
            j * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
          )
        } else {
          this.context.fillStyle = 'red'
          this.context.fillRect(
            i * CELL_SIZE,
            j * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
          )
        }
      }
    }
  }

  mainLoop(t?: number): void {
    const t0 = performance.now()

    this.animationFrame = window.requestAnimationFrame(this.mainLoop.bind(this))
    this.render()
    this.isPlaying && this.update(t ?? 0)

    if (this.lastLoopPerformance.length > 50) {
      this.lastLoopPerformance = this.lastLoopPerformance.splice(1)
    }

    const dt = Math.floor((performance.now() - t0) * 1000)
    this.lastLoopPerformance.push(dt)
    console.log(
      this.lastLoopPerformance.reduce((acc, curr) => acc + curr) /
        this.lastLoopPerformance.length,
    )
  }
}
