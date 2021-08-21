import { MAX_CELL_X, MAX_CELL_Y } from '../constants/sizes'
import { Map2D, Point } from '../types/geometry'

export class Grid {
  cells: Map2D

  constructor() {
    this.cells = {}
    for (let i = 0; i < MAX_CELL_X; i++) {
      this.cells[i] = {}
      for (let j = 0; j < MAX_CELL_Y; j++) {
        this.cells[i][j] = 0
      }
    }
  }

  export() {
    const alive = []
    for (const x in this.cells) {
      for (const y in this.cells[x]) {
        if (this.cells[x][y] === 1) {
          alive.push([x, y])
        }
      }
    }
    return JSON.stringify(alive)
  }

  import(alive: string[][]) {
    console.log(alive)
    alive.map((cell) => {
      const x = parseInt(cell[0])
      const y = parseInt(cell[1])
      this.cells[x][y] = 1
    })
  }

  getAliveNeighboors(p: Point) {
    const neighboors = []

    // has west
    if (p.x > 0) {
      neighboors.push(this.cells[p.x - 1][p.y - 1]) // NorthWest
      neighboors.push(this.cells[p.x - 1][p.y]) // West
      neighboors.push(this.cells[p.x - 1][p.y + 1]) // SouthWest
    }

    // has east
    if (p.x < MAX_CELL_X - 1) {
      neighboors.push(this.cells[p.x + 1][p.y - 1]) // NorthEast
      neighboors.push(this.cells[p.x + 1][p.y]) // East
      neighboors.push(this.cells[p.x + 1][p.y + 1]) // SouthEast
    }
    // center
    neighboors.push(this.cells[p.x][p.y - 1]) // North
    neighboors.push(this.cells[p.x][p.y + 1]) // South

    return neighboors.filter((cell) => cell === 1).length
  }
}
