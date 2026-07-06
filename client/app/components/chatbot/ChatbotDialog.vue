<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()


const { 
  messages,
  sendMessage,
  loading
} = useChat();

const input = ref('')

const submit = async () => {

    if (!input.value.trim())
        return

    await sendMessage(
        input.value
    )

    input.value = ''
}

</script>

<template>
  <Transition name="chat">
    <div
      v-if="open"
      class="fixed bottom-24 right-6 z-40 flex h-[650px] w-[380px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
    >
      <!-- Header -->

      <div
        class="flex items-center justify-between border-b border-slate-700 px-5 py-4"
      >
        <div>
          <h2 class="text-lg font-bold text-white">
            Gemini Assistant
          </h2>

          <p class="text-xs text-slate-400">
            Ask me anything
          </p>
        </div>

        <button
          class="text-slate-400 transition hover:text-white"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <!-- Messages -->

      <div
        class="flex-1 overflow-y-auto bg-slate-950 p-4 space-y-4"
      >
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="message.role === 'user'
            ? 'justify-end'
            : 'justify-start'"
        >
          <div
            class="max-w-[80%] rounded-2xl px-4 py-3"
            :class="message.role === 'user'
              ? 'bg-cyan-500 text-white'
              : 'bg-slate-700 text-white'"
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Input -->

      <form
        class="flex gap-3 border-t border-slate-700 p-4"
        @submit.prevent="submit"
      >
        <input
          v-model="input"
          placeholder="Type your message..."
          class="flex-1 rounded-full border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
        >

        <button
          type="submit" class="rounded-full bg-cyan-500 px-5 text-white transition hover:bg-cyan-400"
        >
          Send
        </button>
      </form>

    </div>
  </Transition>
</template>

<style scoped>
.chat-enter-active,
.chat-leave-active {
  transition: .25s;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>