<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <button
    class="fixed bottom-6 right-6 z-50 rounded-full bg-cyan-500 px-6 py-4 text-white shadow-xl transition hover:scale-105"
    @click="emit('toggle')"
  >
    {{ open ? 'Close' : 'Ask Chatbot AI' }}
  </button>
</template>