export interface Point {
  x: number
  y: number
}

export type Grid2D = {
  [x: number]: {
    [y: number]: number
  }
}
