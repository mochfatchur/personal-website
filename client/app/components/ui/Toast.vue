<script setup lang="ts">
const toast = useToast()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-300"
    enter-from-class="opacity-0 translate-y-6"
    leave-to-class="opacity-0 translate-y-6">

    <div
      v-if="toast.visible"
      class="fixed bottom-8 right-8
             bg-slate-900 border border-cyan-400/20
             rounded-xl px-5 py-3
             shadow-xl z-50">

      <p class="text-sm">

        {{ toast.message }}

      </p>

    </div>

  </Transition>
</template>