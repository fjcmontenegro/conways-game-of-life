export interface Point {
  x: number
  y: number
}

export type Map2D = {
  [x: number]: {
    [y: number]: number
  }
}
