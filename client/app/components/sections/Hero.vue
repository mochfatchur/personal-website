<template>
  <section class="min-h-screen flex items-center">
    <div
      class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center"
    >
      <!-- Kolom kiri -->
      <div>
        <div
          class="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2"
        >
          <div class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span class="text-xs font-mono">FULLSTACK ENGINEER</span>
        </div>

        <h1 class="mt-8 text-6xl font-black leading-tight">
          Building
          <span class="text-cyan-400">Reliable</span>
          <br />
          Software Systems
        </h1>

        <p class="mt-8 text-slate-400 leading-8">
          I love designing scalable backend architecture and crafting beautiful
          frontend experiences.
        </p>
      </div>

      <!-- Kolom kanan -->
      <div class="space-y-6">
        <UiSidePanel />

        <CanvasArchitectureCanvas />
      </div>
    </div>
  </section>
</template>