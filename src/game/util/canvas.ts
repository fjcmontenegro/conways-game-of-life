export const clearCanvas = (
  context: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
): void => {
  context.fillStyle = `rgb(${color})`
  context.fillRect(0, 0, w, h)
}
