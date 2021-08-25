/**
 * Returns a random number between 0 and max
 */
export const getRandom = <T>(max?: number | T[]): T | number => {
  const r = Math.random()

  if (typeof max === 'undefined') {
    return r
  } else if (Array.isArray(max)) {
    const pos = Math.floor(Math.random() * max.length)
    return max[pos]
  } else {
    return Math.floor(Math.random() * max)
  }
}

/**
 * Truncates a number value between min and max
 */
export const trunc = (min: number, max: number, value: number): number =>
  value < min ? min : value > max ? max : value

export const randomRGB = (): string =>
  `${getRandom(255)},${getRandom(255)},${getRandom(255)}`
