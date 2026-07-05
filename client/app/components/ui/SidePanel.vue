<script setup lang="ts">
const toast = useToast()

const openProjects = () => {
  toast.show('Projects panel coming soon...')
}

const openSkills = () => {
  toast.show('Skills panel coming soon...')
}

const contact = () => {
  toast.show('Contact section coming soon...')
}
</script>

<template>

<div
class="glass rounded-2xl p-8 border border-white/10 max-w-md w-full">

<h3
class="text-cyan-400 font-mono text-xs">

SYSTEM OVERVIEW

</h3>

<h2
class="mt-3 text-3xl font-bold">

Scalable Backend Logic

</h2>

<p
class="mt-4 text-slate-400">

Build robust backend services,
microservice architecture,
and modern frontend applications.

</p>

<div
class="grid grid-cols-2 gap-3 mt-8">

<button
@click="openProjects"
class="rounded-lg bg-cyan-500/10 py-3">

Projects

</button>

<button
@click="openSkills"
class="rounded-lg bg-emerald-500/10 py-3">

Skills

</button>

<button
@click="contact"
class="col-span-2 rounded-lg bg-amber-500/10 py-3">

Contact

</button>

</div>

</div>

</template>