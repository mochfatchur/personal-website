<script setup lang="ts">
import { ViewMode } from '~/data/view'

const currentView = ref<ViewMode>(ViewMode.VISUALIZER)

const latency = ref(4)
const cpu = ref(12)

const changeView = (view: ViewMode) => {
  currentView.value = view
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">

    <div class="max-w-7xl mx-auto">

      <div class="flex justify-between items-center h-16 px-6">

        <div class="flex items-center gap-3">

          <div class="relative">

            <div
              class="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />

            <div
              class="relative w-3 h-3 rounded-full bg-emerald-400" />

          </div>

          <span class="font-mono text-xs tracking-widest">

            VUE_CLUSTER // SYS_ACTIVE

          </span>

        </div>

        <div class="flex items-center gap-8">

          <div class="flex gap-6 font-mono text-xs">

            <button
              @click="changeView(ViewMode.VISUALIZER)"
              :class="currentView === ViewMode.VISUALIZER
                ? 'text-cyan-400'
                : 'text-gray-400'">

              Blueprint

            </button>

            <button
              @click="changeView(ViewMode.DOCUMENT)"
              :class="currentView === ViewMode.DOCUMENT
                ? 'text-emerald-400'
                : 'text-gray-400'">

              Document

            </button>

          </div>

          <div
            class="hidden lg:flex gap-4 bg-slate-900 px-4 py-2 rounded-lg font-mono text-xs">

            <span>

              LATENCY

              <span class="text-emerald-400">

                {{ latency }} ms

              </span>

            </span>

            <span>

              CPU

              <span class="text-emerald-400">

                {{ cpu }}%

              </span>

            </span>

          </div>

        </div>

      </div>

    </div>

  </nav>
</template>