export const clearCanvas = (
  context: CanvasRenderingContext2D,
  w: number,
  h: number,
): void => {
  // context.fillStyle = '#001219'
  context.fillStyle = '#001219'
  context.fillRect(0, 0, w, h)
}
