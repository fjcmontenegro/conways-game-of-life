import { INITIAL_FADE_RATE, INITIAL_FPS } from '../constants/animation'
import { CELL_SIZE } from '../constants/sizes'
import { Point } from '../types/geometry'
import { clearCanvas } from '../util/canvas'
import formation1 from '../data/formation1.json'
import { Grid } from './grid'

export class Game {
  canvas: HTMLCanvasElement
  container: HTMLDivElement
  context: CanvasRenderingContext2D | null
  grid: Grid

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
    this.grid = new Grid()

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
    this.container = container
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

    if (!this.updatedCells.includes(coord)) {
      const cellVal = this.grid.get(cellX, cellY)
      this.grid.set(cellX, cellY, cellVal === 1 ? 0 : 1)
      this.updatedCells.push(coord)
    }
  }

  update(time: number): void {
    if (time - this.lastFrame < 1000 / this.fps) {
      return
    }

    // if there are no cells
    if (!Object.keys(this.grid.cells).length) {
      return
    }

    this.lastFrame = time
    const newGrid = new Grid()

    // evaluate entire existing map to generate newGrid
    for (const keyX in this.grid.cells) {
      for (const keyY in this.grid.cells[keyX]) {
        const [x, y] = [parseInt(keyX), parseInt(keyY)]

        // if the cell is outside the canvas, ignore this cell
        if (!this.isPointInsideCanvas(x * CELL_SIZE, y * CELL_SIZE)) {
          break
        }

        const neighboors = this.grid.getNeighbors(x, y)

        // if there are no neighbors, ignore this cell
        if (!neighboors.length) {
          break
        }

        const count = this.grid.countAliveNeighbors(neighboors)

        // Any live cell with two or three live neighbours survives.
        const rule1 = this.grid.get(x, y) === 1 && (count === 2 || count === 3)
        // Any dead cell with three live neighbours becomes a live cell
        const rule2 = this.grid.get(x, y) !== 1 && count === 3

        if (rule1 || rule2) {
          newGrid.set(x, y, 1)
        } else {
          const cellOldValue = this.grid.get(x, y)
          if (cellOldValue && cellOldValue > 0) {
            newGrid.set(x, y, cellOldValue - this.fadeRate)
          }
        }
        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      }
    }

    this.grid = newGrid
  }

  isPointInsideCanvas(x: number, y: number): boolean {
    return x >= 0 && x < this.canvas.width && y >= 0 && y < this.canvas.height
  }

  render(): void {
    if (!this.context) return

    clearCanvas(this.context, this.canvas.width, this.canvas.height)

    for (const keyX in this.grid.cells) {
      for (const keyY in this.grid.cells[keyX]) {
        const [x, y] = [parseInt(keyX), parseInt(keyY)]
        const cellValue = this.grid.get(x, y)

        if (cellValue && cellValue > 0) {
          this.context.fillStyle = `rgba(148, 210, 189, ${cellValue})`
          this.context.fillRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
          )
        } else {
          this.context.fillStyle = 'rgba(148, 210, 189, 0.1)'
          this.context.fillRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
          )
        }
      }
    }
  }

  mainLoop(t?: number): void {
    // const t0 = performance.now()

    this.animationFrame = window.requestAnimationFrame(this.mainLoop.bind(this))
    this.render()
    this.isPlaying && this.update(t ?? 0)

    // if (this.lastLoopPerformance.length > 50) {
    //   this.lastLoopPerformance = this.lastLoopPerformance.splice(1)
    // }

    // const dt = Math.floor((performance.now() - t0) * 1000)
    // this.lastLoopPerformance.push(dt)
    // console.log(
    //   this.lastLoopPerformance.reduce((acc, curr) => acc + curr) /
    //     this.lastLoopPerformance.length,
    // )
  }
}
