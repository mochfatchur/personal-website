<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

let animationId: number | null = null

const resizeCanvas = () => {
  if (!canvasRef.value) return

  canvasRef.value.width = canvasRef.value.clientWidth
  canvasRef.value.height = canvasRef.value.clientHeight
}

const render = () => {
  if (!canvasRef.value) return

  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  const { width, height } = canvasRef.value

  // Clear
  ctx.clearRect(0, 0, width, height)

  // Background
  ctx.fillStyle = '#05070c'
  ctx.fillRect(0, 0, width, height)

  // Grid
  ctx.strokeStyle = 'rgba(34,211,238,0.12)'
  ctx.lineWidth = 1

  const gap = 40

  // Horizontal
  for (let y = 0; y <= height; y += gap) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Vertical
  for (let x = 0; x <= width; x += gap) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  animationId = requestAnimationFrame(render)
}

onMounted(() => {
  resizeCanvas()

  render()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)

  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 overflow-hidden bg-[#05070c]"
  >
    <canvas
      ref="canvasRef"
      class="block w-full h-[500px]"
    />
  </div>
</template>