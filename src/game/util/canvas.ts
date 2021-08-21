import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/sizes'

export const createCanvas = (): HTMLCanvasElement => {
  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  document.body.appendChild(canvas)
  document.body.style.padding = '0px'
  document.body.style.margin = '0px'
  document.body.style.overflow = 'hidden'

  return canvas
}

export const clearCanvas = (context: CanvasRenderingContext2D): void => {
  context.fillStyle = '#001219'
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}
