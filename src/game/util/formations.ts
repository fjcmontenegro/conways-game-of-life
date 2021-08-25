import { Grid } from '../modules/grid'
import { Point } from '../types/geometry'

export const formation1 = (grid: Grid<number>, gridSize: Point): void => {
  const formationSize = { x: 12, y: 3 }
  const offset = {
    x: Math.floor((gridSize.x - formationSize.x) / 2),
    y: Math.floor((gridSize.y - formationSize.y) / 2),
  }

  for (let i = 0; i < 3 * 4; i++) {
    if (i % 4 !== 0) {
      grid.set(offset.x + i, offset.y, 1)
      grid.set(offset.x + i, offset.y + 1, 1)
      grid.set(offset.x + i, offset.y + 2, 1)
    }
  }
}

export const formation2 = (grid: Grid<number>, gridSize: Point): void => {
  const xperiod = 11
  const totalPeriods = 5
  const yperiod = 11
  let on = true

  const center = {
    x: Math.floor(gridSize.x / 2) - Math.floor((xperiod * totalPeriods) / 2),
    y: Math.floor(gridSize.y / 2),
  }

  for (let i = 0; i < xperiod * totalPeriods; i++) {
    if (on) {
      grid.set(center.x + i, center.y - yperiod * 2, 1)
      grid.set(center.x + i, center.y - yperiod, 1)
      grid.set(center.x + i, center.y, 1)
      grid.set(center.x + i, center.y + yperiod, 1)
      grid.set(center.x + i, center.y + yperiod * 2, 1)
    }

    if (i % xperiod === xperiod - 1) {
      on = !on
    }
  }
}

export const formation3 = (grid: Grid<number>, gridSize: Point): void => {
  const center = {
    x: Math.floor(gridSize.x) / 2,
    y: Math.floor(gridSize.y / 2),
  }

  const cells: Point[] = [
    { x: 4, y: 6 },
    { x: 3, y: 6 },
    { x: 2, y: 6 },

    { x: 6, y: 4 },
    { x: 6, y: 3 },
    { x: 6, y: 2 },

    { x: 1, y: 4 },
    { x: 1, y: 3 },
    { x: 1, y: 2 },

    { x: 4, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 1 },
  ]

  cells.map((cell) => grid.set(center.x + cell.x, center.y + cell.y, 1))
  cells.map((cell) => grid.set(center.x - cell.x, center.y + cell.y, 1))
  cells.map((cell) => grid.set(center.x + cell.x, center.y - cell.y, 1))
  cells.map((cell) => grid.set(center.x - cell.x, center.y - cell.y, 1))
}

export const formation4 = (grid: Grid<number>, gridSize: Point): void => {
  const xperiod = 7
  const totalPeriods = 7
  const yperiod = 5
  let on = true

  const center = {
    x: Math.floor(gridSize.x / 2) - Math.floor((xperiod * totalPeriods) / 2),
    y: Math.floor(gridSize.y / 2),
  }

  for (let i = 0; i < xperiod * totalPeriods; i++) {
    if (on) {
      grid.set(center.x + i, center.y - yperiod * 2, 1)
      grid.set(center.x + i, center.y - yperiod, 1)
      grid.set(center.x + i, center.y, 1)
      grid.set(center.x + i, center.y + yperiod, 1)
      grid.set(center.x + i, center.y + yperiod * 2, 1)
    }

    if (i % xperiod === xperiod - 1) {
      on = !on
    }
  }
}
