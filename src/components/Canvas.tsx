import React, { useEffect, useRef } from 'react'

const Canvas = (props: React.ComponentProps<'canvas'>): React.ReactElement => {
  const ref = useRef<HTMLCanvasElement>(null)

  console.log('canvas rendered')

  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      const context = canvas.getContext('2d')

      if (context) {
        //Our first draw
        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
      }
    }
  }, [])
  return <canvas ref={ref} {...props} />
}

export default Canvas
