import { Grid } from '../modules/grid'
import { Point } from '../types/geometry'

export const fiveBlocks = (grid: Grid<number>, gridSize: Point): void => {
  const squares = 5
  const formationSize = { x: 4 * squares, y: 3 }
  const offset = {
    x: Math.floor((gridSize.x - formationSize.x) / 2),
    y: Math.floor((gridSize.y - formationSize.y) / 2),
  }

  for (let i = 0; i < squares * 4; i++) {
    if (i % 4 !== 0) {
      grid.set(offset.x + i, offset.y, 1)
      grid.set(offset.x + i, offset.y + 1, 1)
      grid.set(offset.x + i, offset.y + 2, 1)
    }
  }
}

export const theBrain = (grid: Grid<number>, gridSize: Point): void => {
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

export const pulsars = (grid: Grid<number>, gridSize: Point): void => {
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

  cells.map((cell) =>
    grid.set(center.x - 10 + cell.x, center.y - 10 + cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x - 10 - cell.x, center.y - 10 + cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x - 10 + cell.x, center.y - 10 - cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x - 10 - cell.x, center.y - 10 - cell.y, 1),
  )

  cells.map((cell) =>
    grid.set(center.x + 10 + cell.x, center.y - 10 + cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x + 10 - cell.x, center.y - 10 + cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x + 10 + cell.x, center.y - 10 - cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x + 10 - cell.x, center.y - 10 - cell.y, 1),
  )

  cells.map((cell) =>
    grid.set(center.x - 10 + cell.x, center.y + 10 + cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x - 10 - cell.x, center.y + 10 + cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x - 10 + cell.x, center.y + 10 - cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x - 10 - cell.x, center.y + 10 - cell.y, 1),
  )

  cells.map((cell) =>
    grid.set(center.x + 10 + cell.x, center.y + 10 + cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x + 10 - cell.x, center.y + 10 + cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x + 10 + cell.x, center.y + 10 - cell.y, 1),
  )
  cells.map((cell) =>
    grid.set(center.x + 10 - cell.x, center.y + 10 - cell.y, 1),
  )
}

export const formation4 = (grid: Grid<number>, gridSize: Point): void => {
  const center = {
    x: Math.floor(gridSize.x / 2),
    y: Math.floor(gridSize.y / 2),
  }

  grid.set(center.x, center.y, 1)

  grid.set(center.x, center.y - 3, 1)
  grid.set(center.x + 1, center.y - 4, 1)
  grid.set(center.x - 1, center.y - 4, 1)
  grid.set(center.x + 1, center.y - 5, 1)
  grid.set(center.x - 1, center.y - 5, 1)
  grid.set(center.x, center.y - 6, 1)

  grid.set(center.x, center.y + 3, 1)
  grid.set(center.x + 1, center.y + 4, 1)
  grid.set(center.x - 1, center.y + 4, 1)
  grid.set(center.x + 1, center.y + 5, 1)
  grid.set(center.x - 1, center.y + 5, 1)
  grid.set(center.x, center.y + 6, 1)
  grid.set(center.x, center.y + 7, 1)

  grid.set(center.x - 3, center.y, 1)
  grid.set(center.x - 4, center.y + 1, 1)
  grid.set(center.x - 4, center.y - 1, 1)
  grid.set(center.x - 5, center.y + 1, 1)
  grid.set(center.x - 5, center.y - 1, 1)
  grid.set(center.x - 6, center.y, 1)

  grid.set(center.x + 3, center.y, 1)
  grid.set(center.x + 4, center.y + 1, 1)
  grid.set(center.x + 4, center.y - 1, 1)
  grid.set(center.x + 5, center.y + 1, 1)
  grid.set(center.x + 5, center.y - 1, 1)
  grid.set(center.x + 6, center.y, 1)
}

export const neverendingThingy = (
  grid: Grid<number>,
  gridSize: Point,
): void => {
  const center = {
    x: Math.floor(gridSize.x / 2),
    y: Math.floor(gridSize.y / 2),
  }

  grid.set(center.x, center.y, 1)

  grid.set(center.x + 2, center.y, 1)
  grid.set(center.x + 2, center.y + 1, 1)

  grid.set(center.x + 4, center.y + 2, 1)
  grid.set(center.x + 4, center.y + 3, 1)
  grid.set(center.x + 4, center.y + 4, 1)

  grid.set(center.x + 6, center.y + 3, 1)
  grid.set(center.x + 6, center.y + 4, 1)
  grid.set(center.x + 6, center.y + 5, 1)
  grid.set(center.x + 7, center.y + 4, 1)
}

export const gliderGun = (grid: Grid<number>, gridSize: Point): void => {
  const startX = Math.floor(gridSize.x / 2) - 18 // width is 36
  const startY = Math.floor(gridSize.y / 2) - 4 // height is 9

  grid.set(startX + 24, startY, 1)

  grid.set(startX + 22, startY + 1, 1)
  grid.set(startX + 24, startY + 1, 1)

  grid.set(startX + 12, startY + 2, 1)
  grid.set(startX + 13, startY + 2, 1)
  grid.set(startX + 20, startY + 2, 1)
  grid.set(startX + 21, startY + 2, 1)
  grid.set(startX + 34, startY + 2, 1)
  grid.set(startX + 35, startY + 2, 1)

  grid.set(startX + 11, startY + 3, 1)
  grid.set(startX + 15, startY + 3, 1)
  grid.set(startX + 20, startY + 3, 1)
  grid.set(startX + 21, startY + 3, 1)
  grid.set(startX + 34, startY + 3, 1)
  grid.set(startX + 35, startY + 3, 1)

  grid.set(startX, startY + 4, 1)
  grid.set(startX + 1, startY + 4, 1)
  grid.set(startX + 10, startY + 4, 1)
  grid.set(startX + 16, startY + 4, 1)
  grid.set(startX + 20, startY + 4, 1)
  grid.set(startX + 21, startY + 4, 1)

  grid.set(startX, startY + 5, 1)
  grid.set(startX + 1, startY + 5, 1)
  grid.set(startX + 10, startY + 5, 1)
  grid.set(startX + 14, startY + 5, 1)
  grid.set(startX + 16, startY + 5, 1)
  grid.set(startX + 17, startY + 5, 1)
  grid.set(startX + 22, startY + 5, 1)
  grid.set(startX + 24, startY + 5, 1)

  grid.set(startX + 10, startY + 6, 1)
  grid.set(startX + 16, startY + 6, 1)
  grid.set(startX + 24, startY + 6, 1)

  grid.set(startX + 11, startY + 7, 1)
  grid.set(startX + 15, startY + 7, 1)

  grid.set(startX + 12, startY + 8, 1)
  grid.set(startX + 13, startY + 8, 1)
}

export const rule1 = (grid: Grid<number>, gridSize: Point): void => {
  const center = {
    x: Math.floor(gridSize.x / 2),
    y: Math.floor(gridSize.y / 2),
  }

  grid.set(center.x - 1, center.y, 1)
  grid.set(center.x + 2, center.y, 1)
  grid.set(center.x + 2, center.y + 1, 1)
}

export const rule2 = (grid: Grid<number>, gridSize: Point): void => {
  const center = {
    x: Math.floor(gridSize.x / 2),
    y: Math.floor(gridSize.y / 2),
  }

  grid.set(center.x - 9, center.y, 1)
  grid.set(center.x - 9, center.y - 1, 1)
  grid.set(center.x - 8, center.y + 1, 1)
  grid.set(center.x - 8, center.y - 1, 1)
  grid.set(center.x - 7, center.y, 1)
  grid.set(center.x - 7, center.y + 1, 1)

  grid.set(center.x - 4, center.y, 1)
  grid.set(center.x - 3, center.y + 1, 1)
  grid.set(center.x - 3, center.y - 1, 1)
  grid.set(center.x - 2, center.y, 1)

  grid.set(center.x + 9, center.y, 1)
  grid.set(center.x + 8, center.y, 1)
  grid.set(center.x + 7, center.y, 1)
}

export const rule3 = (grid: Grid<number>, gridSize: Point): void => {
  const center = {
    x: Math.floor(gridSize.x / 2),
    y: Math.floor(gridSize.y / 2),
  }

  grid.set(center.x - 1, center.y, 1)
  grid.set(center.x, center.y, 1)
  grid.set(center.x, center.y + 1, 1)
  grid.set(center.x, center.y - 1, 1)
  grid.set(center.x + 1, center.y, 1)
}

export const rule4 = (grid: Grid<number>, gridSize: Point): void => {
  const center = {
    x: Math.floor(gridSize.x / 2),
    y: Math.floor(gridSize.y / 2),
  }

  grid.set(center.x - 2, center.y - 2, 1)
  grid.set(center.x - 2, center.y, 1)
  grid.set(center.x - 2, center.y + 2, 1)

  grid.set(center.x, center.y - 3, 1)
  grid.set(center.x, center.y - 1, 1)
  grid.set(center.x, center.y + 1, 1)
  grid.set(center.x, center.y + 3, 1)

  grid.set(center.x + 2, center.y - 2, 1)
  grid.set(center.x + 2, center.y, 1)
  grid.set(center.x + 2, center.y + 2, 1)
}

export const forms = (grid: Grid<number>, gridSize: Point): void => {
  const center = {
    x: Math.floor(gridSize.x / 2),
    y: Math.floor(gridSize.y / 2),
  }

  grid.set(center.x - 15, center.y - 15, 1)
  grid.set(center.x - 16, center.y - 13, 1)
  grid.set(center.x - 15, center.y - 13, 1)
  grid.set(center.x - 14, center.y - 14, 1)
  grid.set(center.x - 14, center.y - 13, 1)

  grid.set(center.x - 15, center.y - 1, 1)
  grid.set(center.x - 15, center.y, 1)
  grid.set(center.x - 16, center.y - 1, 1)
  grid.set(center.x - 16, center.y, 1)

  grid.set(center.x - 3, center.y + 10, 1)
  grid.set(center.x - 2, center.y + 11, 1)
  grid.set(center.x - 2, center.y + 9, 1)
  grid.set(center.x - 1, center.y + 11, 1)
  grid.set(center.x - 1, center.y + 9, 1)
  grid.set(center.x, center.y + 10, 1)

  grid.set(center.x - 5, center.y - 10, 1)
  grid.set(center.x - 4, center.y - 11, 1)
  grid.set(center.x - 4, center.y - 9, 1)
  grid.set(center.x - 3, center.y - 10, 1)

  grid.set(center.x + 6, center.y - 6, 1)
  grid.set(center.x + 7, center.y - 6, 1)
  grid.set(center.x + 8, center.y - 6, 1)

  grid.set(center.x + 10, center.y + 5, 1)
  grid.set(center.x + 11, center.y + 5, 1)
  grid.set(center.x + 11, center.y + 6, 1)
  grid.set(center.x + 12, center.y + 5, 1)
  grid.set(center.x + 12, center.y + 6, 1)
  grid.set(center.x + 13, center.y + 6, 1)
}
