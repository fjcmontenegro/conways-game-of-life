import { CELL_SIZE } from '../constants/sizes'
import { Point } from '../types/geometry'
import { clearCanvas } from '../util/canvas'
import { Grid } from './grid'
import { DEFAULT_FADE_RATE, DEFAULT_FPS } from '../constants/animation'
import { formation1, formation2, formation3 } from '../util/formations'

/**
 * My game:
 * n  live  dead
 * 0  dead  dead
 * 1  dead  dead
 * 2  live  dead
 * 3  live  dead
 * 4  live  live
 * 5  live  live
 * 6  dead  dead
 * 7  dead  dead
 * 8  dead  dead
 * 9  dead  dead
 */

type GameConstructorOptions = {
  drawDead?: boolean
  fps?: number
  fadeRate?: number
  immortality?: boolean
}

export class Game {
  canvas: HTMLCanvasElement
  container: HTMLDivElement
  context: CanvasRenderingContext2D | null
  grid: Grid<number>

  isPlaying: boolean
  mousePos: Point
  isUserDrawing: boolean
  updatedCells: string[]

  lastFrame: number
  animationFrame?: number

  fps: number
  fadeRate: number

  lastLoopPerformance: number[]
  drawDead: boolean
  immortality: boolean

  constructor(
    canvas: HTMLCanvasElement,
    container: HTMLDivElement,
    options?: GameConstructorOptions,
  ) {
    this.container = container
    this.canvas = canvas
    this.canvas.height = container.clientHeight
    this.canvas.width = container.clientWidth
    this.context = this.canvas.getContext('2d')

    this.grid = new Grid<number>(() => 0)

    this.mousePos = { x: 0, y: 0 }
    this.updatedCells = []
    this.isUserDrawing = false
    this.isPlaying = false

    this.lastFrame = 0
    this.lastLoopPerformance = []

    this.fps = options?.fps ?? DEFAULT_FPS
    this.fadeRate = options?.fadeRate ?? DEFAULT_FADE_RATE
    this.drawDead = options?.drawDead ?? true
    this.immortality = options?.immortality ?? false
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

    window.addEventListener('keypress', ({ key }) => {
      if (key === 'e') {
        console.log(this.grid.export())
      }
    })

    this.addInitialFormation()
  }

  setPlay(play: boolean): void {
    this.isPlaying = play
  }

  setImmortality(immortality: boolean): void {
    this.immortality = immortality
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
    const newGrid = new Grid(() => 0)

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

        const count = neighboors.filter((cell) => cell === 1).length

        // Any live cell with two or three live neighbours survives.
        const rule1 = this.grid.get(x, y) === 1 && (count === 2 || count === 3)
        // Any dead cell with three live neighbours becomes a live cell
        const rule2 = this.grid.get(x, y) !== 1 && count === 3

        if (rule1 || rule2) {
          newGrid.set(x, y, 1)
        } else {
          // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
          const cellOldValue = this.grid.get(x, y)

          if (cellOldValue && cellOldValue > 0) {
            if (this.immortality) {
              newGrid.set(x, y, cellOldValue)
            } else {
              // take a bit of life away
              const newValue = cellOldValue - this.fadeRate
              // avoid rounding errors by limiting value to 0..1
              newGrid.set(x, y, newValue < 0 ? 0 : newValue > 1 ? 1 : newValue)
            }
          }
        }
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
        } else if (this.drawDead) {
          this.context.fillStyle = `rgba(148, 210, 189, ${this.fadeRate / 2})`
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

  addInitialFormation(): void {
    const gridSize = {
      x: Math.floor(this.canvas.width / CELL_SIZE),
      y: Math.floor(this.canvas.height / CELL_SIZE),
    }
    // formation1(this.grid, gridSize)
    formation2(this.grid, gridSize)
    // formation3(this.grid, gridSize)
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
