import { Map2D } from '../types/geometry'

/**
 * There's no recycling in this class. If you need to remove cells, create a new
 * map.
 */
export class DynamicGrid {
  cells: Map2D

  constructor() {
    this.cells = {}
  }

  set(x: number, y: number, val: number) {
    if (this.cells[x] === undefined) {
      this.cells[x] = {}
    }

    this.cells[x][y] = val
  }

  get(x: number, y: number) {
    if (this.cells[x] === undefined) {
      return null
    }

    if (this.cells[x][y] === undefined) {
      return null
    }

    return this.cells[x][y]
  }

  count() {
    let count = 0

    for (const x in this.cells) {
      count += Object.keys(x).length
    }
    return count
  }
}
