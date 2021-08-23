import { Grid2D, Point } from '../types/geometry'

/**
 * There's no recycling in this class. If you need to remove cells, create a new
 * map.
 * @todo make this class BE the cells, and not hold cells
 */
export class Grid<T> {
  cells: Grid2D<T>
  /**
   * This functions is used when creating empty neighbors when cells are set.
   * The value returned by this function will be used for those neighbors
   */
  defaultNeighborSetter: () => T

  constructor(defaultNeighborSetter: () => T) {
    this.cells = {}
    this.defaultNeighborSetter = defaultNeighborSetter
  }

  /**
   * For game of life, when we create a tile in the grid, we will create all of
   * its neighbors.
   */
  set(x: number, y: number, val: T, setNeighbors = true): void {
    if (this.cells[x] === undefined) {
      this.cells[x] = {}
    }

    if (setNeighbors) {
      const neighborsPos = this.getNeighborsPos(x, y)

      neighborsPos.map((pos) => {
        if (this.get(pos.x, pos.y) === null) {
          // when creating neighbors we don't want recursion
          this.set(pos.x, pos.y, this.defaultNeighborSetter(), false)
        }
      })
    }

    this.cells[x][y] = val
  }

  get(x: number, y: number): T | null {
    if (this.cells[x] === undefined) {
      return null
    }

    if (this.cells[x][y] === undefined) {
      return null
    }

    return this.cells[x][y]
  }

  count(): number {
    let count = 0

    for (const x in this.cells) {
      count += Object.keys(x).length
    }
    return count
  }

  getNeighborsPos(x: number, y: number): Point[] {
    return [
      { x: x - 1, y: y - 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y + 1 },
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y + 1 },
    ]
  }

  /**
   * Returns the values of existing neighbor cells
   */
  getNeighbors(x: number, y: number): T[] {
    const neighborsPos = this.getNeighborsPos(x, y)
    return neighborsPos
      .map((pos) => this.get(pos.x, pos.y))
      .filter((cell) => cell !== null) as T[]
  }

  export(): string {
    return JSON.stringify(this.cells)
  }
}
