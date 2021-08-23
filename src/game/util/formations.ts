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

export const formation2 = (grid: Grid<number>, offset: Point): void => {
  const center = { x: offset.x + 10, y: offset.y + 10 }
  const radius = 10

  for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 36) {
    const x = Math.floor(center.x + radius * Math.cos(angle))
    const y = Math.floor(center.y + radius * Math.sin(angle))
    console.log(x, y)
    grid.set(x, y, 1)
  }
}
