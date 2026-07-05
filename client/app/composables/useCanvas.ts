export const useCanvas = () => {
  const canvas = ref<HTMLCanvasElement>()
  const context = ref<CanvasRenderingContext2D>()

  const animationId = ref<number>()

  const size = reactive({
    width: 0,
    height: 0
  })

  const mouse = reactive({
    x: 0,
    y: 0
  })

  const resize = () => {
    if (!canvas.value) return

    size.width = canvas.value.clientWidth
    size.height = canvas.value.clientHeight

    canvas.value.width = size.width
    canvas.value.height = size.height
  }

  const render = () => {
    if (!context.value) return

    // Bersihkan canvas
    context.value.clearRect(0, 0, size.width, size.height)

    // ===== Background =====
    context.value.fillStyle = '#0f172a'
    context.value.fillRect(0, 0, size.width, size.height)

    // ===== Grid =====
    context.value.strokeStyle = '#06b6d4'
    context.value.lineWidth = 0.5

    for (let i = 0; i < 30; i++) {
      context.value.beginPath()

      context.value.moveTo(0, i * 40)

      context.value.lineTo(size.width, i * 40)

      context.value.stroke()
    }

    animationId.value = requestAnimationFrame(render)
  }

  const start = () => {
    if (!canvas.value) return

    context.value = canvas.value.getContext('2d')!

    resize()

    render()
  }

  const stop = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }
  }

  return {
    canvas,
    resize,
    start,
    stop
  }
}