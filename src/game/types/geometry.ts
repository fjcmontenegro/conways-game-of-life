export interface Point {
  x: number
  y: number
}

export type Grid2D<T> = {
  [x: number]: {
    [y: number]: T
  }
}
