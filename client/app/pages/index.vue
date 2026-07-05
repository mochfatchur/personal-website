<template>
  <div class="font-sans antialiased text-slate-300">
    <div class="relative min-h-screen flex flex-col">
        <!-- Background grid lines mapping architectural layouts -->
        <div class="fixed inset-0 pointer-events-none opacity-[0.15] bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] z-0"></div>
        <div class="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-dark-950 to-transparent pointer-events-none z-10"></div>

        <!-- Navigation Bar -->
        <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Dynamic status connection tracking -->
                    <div class="flex items-center space-x-3">
                        <div class="w-3 h-3 rounded-full bg-cyber-emerald animate-ping absolute"></div>
                        <div class="w-3 h-3 rounded-full bg-cyber-emerald relative"></div>
                        <span class="font-mono text-xs tracking-widest text-white font-semibold">VUE_CLUSTER // SYS_ACTIVE</span>
                    </div>
                    <!-- Navigation / View switches -->
                    <div class="flex items-center space-x-6">
                        <div class="flex space-x-6 font-mono text-xs">
                            <button @click="switchView('visualizer')" 
                                    :class="currentView === 'visualizer' ? 'text-cyber-cyan font-bold' : 'text-slate-400 hover:text-white'"
                                    class="tracking-wider transition-colors flex items-center gap-1.5">
                                <i class="fa-solid fa-network-wired"></i>/blueprint
                            </button>
                            <button @click="switchView('document')" 
                                    :class="currentView === 'document' ? 'text-cyber-emerald font-bold' : 'text-slate-400 hover:text-white'"
                                    class="tracking-wider transition-colors flex items-center gap-1.5">
                                <i class="fa-solid fa-file-code"></i>/static_doc
                            </button>
                        </div>
                        <!-- Reactive Live Telemetry diagnostics -->
                        <div class="hidden md:flex items-center bg-dark-950/80 px-3 py-1.5 rounded border border-white/5 font-mono text-[10px] space-x-3 text-slate-400">
                            <span>LATENCY: <b class="text-cyber-green">{{ latency }}ms</b></span>
                            <span class="text-slate-700">|</span>
                            <span>CPU_LOAD: <b class="text-cyber-green">{{ overallCpuUsage }}%</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main Interactive Workspace View -->
        <main v-show="currentView === 'visualizer'" class="relative pt-16 h-screen flex flex-col z-20">
            
            <!-- Left Interactive Dashboard (Glassmorphic Window) -->
            <div id="side-panel" 
                 :class="{ 'glass-active': isSidePanelActive }"
                 class="absolute left-4 top-20 bottom-24 w-[calc(100%-2rem)] max-w-sm sm:max-w-md md:max-w-lg glass rounded-xl border border-white/5 shadow-2xl flex flex-col z-30 transition-all duration-300 overflow-hidden">
                
                <!-- Terminal Header Control Bar -->
                <div class="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-dark-900/60 font-mono text-xs text-slate-400">
                    <span class="flex items-center gap-2">
                        <i class="fa-solid fa-terminal text-cyber-cyan animate-pulse"></i>
                        <span>SYSTEM.VUE_ENGINE // {{ activeNodeLabel }}</span>
                    </span>
                    <div class="flex items-center space-x-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-cyber-green/80"></span>
                    </div>
                </div>

                <!-- Dynamic Content Render Panel (Scrollable) -->
                <div class="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    <!-- OVERVIEW SECTION -->
                    <div v-if="selectedNodeId === 'node-overview'" class="space-y-6">
                        <div class="space-y-3">
                            <span class="font-mono text-[11px] bg-cyber-cyan/10 text-cyber-cyan px-2.5 py-1 rounded border border-cyber-cyan/25 tracking-widest uppercase">System Overview</span>
                            <h1 class="text-3xl font-extrabold text-white tracking-tight leading-tight">
                                Scalable Backend Logic & Modular Clients
                            </h1>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                I design elegant, deterministic backends and cloud-capable pipelines. At the same time, my daily routine as a fullstack engineer keeps me translating complex endpoints into high-performance user interfaces.
                            </p>
                        </div>

                        <!-- User Interactive Command Gateway -->
                        <div class="p-4 rounded-lg bg-dark-950/60 border border-white/5 space-y-3">
                            <h3 class="font-mono text-xs text-white font-semibold flex items-center gap-2">
                                <i class="fa-solid fa-circle-info text-cyber-green"></i> BLUEPRINT SIMULATOR
                            </h3>
                            <p class="text-xs text-slate-400 leading-relaxed">
                                Interact with the dynamic topology layout directly. Select network nodes to explore layers, trigger pipeline test loads, or reboot servers.
                            </p>
                            <div class="flex flex-wrap gap-2 pt-1.5">
                                <button @click="selectNodeById('node-about')" class="font-mono text-[10px] bg-cyber-blue/10 text-cyber-cyan border border-cyber-cyan/30 px-2.5 py-1.5 rounded hover:bg-cyber-cyan hover:text-dark-950 transition-all">/about_me</button>
                                <button @click="selectNodeById('node-projects')" class="font-mono text-[10px] bg-cyber-emerald/10 text-cyber-green border border-cyber-emerald/30 px-2.5 py-1.5 rounded hover:bg-cyber-green hover:text-dark-950 transition-all">/projects</button>
                                <button @click="selectNodeById('node-skills')" class="font-mono text-[10px] bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 px-2.5 py-1.5 rounded hover:bg-cyan-400 hover:text-dark-950 transition-all">/tech_stack</button>
                                <button @click="selectNodeById('node-contact')" class="font-mono text-[10px] bg-cyber-amber/10 text-cyber-amber border border-cyber-amber/30 px-2.5 py-1.5 rounded hover:bg-cyber-amber hover:text-dark-950 transition-all">/contact_gate</button>
                            </div>
                        </div>

                        <!-- System Cluster Controls -->
                        <div class="space-y-3">
                            <h3 class="font-mono text-xs text-slate-400 uppercase tracking-widest">Workspace Load Testing</h3>
                            <div class="grid grid-cols-2 gap-3">
                                <button @click="triggerLoadTest" :disabled="systemLoad > 1" class="flex flex-col items-center justify-center p-4 rounded-lg border border-cyber-cyan/20 bg-cyber-cyan/5 hover:bg-cyber-cyan/10 transition-all text-center group disabled:opacity-50">
                                    <i class="fa-solid fa-gauge-high text-cyber-cyan text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                                    <span class="font-mono text-[10px] text-white">INJECT SURGE TRAFFIC</span>
                                    <span class="font-mono text-[8px] text-slate-500 mt-1">Simulate micro-requests</span>
                                </button>
                                <button @click="rebootSystem" class="flex flex-col items-center justify-center p-4 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all text-center group">
                                    <i class="fa-solid fa-power-off text-red-400 text-xl mb-2 group-hover:scale-110 transition-transform"></i>
                                    <span class="font-mono text-[10px] text-white">REBOOT CLUSTERS</span>
                                    <span class="font-mono text-[8px] text-slate-500 mt-1">Realign topology vectors</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- ABOUT NODE SECTION -->
                    <div v-if="selectedNodeId === 'node-about'" class="space-y-6">
                        <div class="space-y-3">
                            <span class="font-mono text-[11px] bg-cyber-blue/10 text-cyber-cyan px-2.5 py-1 rounded border border-cyber-cyan/25 tracking-widest uppercase">Node // Profile</span>
                            <h2 class="text-3xl font-extrabold text-white tracking-tight leading-none">Who is the Engineer?</h2>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                I specialize in modeling resilient software systems. While backend protocols, secure APIs, and data integrity occupy my engineering focus, my daily workflows challenge me to develop robust client application lifecycles from start to finish.
                            </p>
                        </div>

                        <div class="space-y-4">
                            <h3 class="font-mono text-xs text-white uppercase tracking-wider">Design Architecture Paradigm</h3>
                            <ul class="space-y-3 text-xs text-slate-400">
                                <li class="flex items-start gap-2.5">
                                    <i class="fa-solid fa-shield-halved text-cyber-cyan mt-0.5"></i>
                                    <span><b>Absolute Observability:</b> Implementing structured middleware telemetry pipelines, enabling quick diagnostic reviews of cluster status.</span>
                                </li>
                                <li class="flex items-start gap-2.5">
                                    <i class="fa-solid fa-arrows-spin text-cyber-cyan mt-0.5"></i>
                                    <span><b>Decoupled Micro-services:</b> Restructuring monoliths into reactive streams over lightweight protobuf models or Kafka queues.</span>
                                </li>
                                <li class="flex items-start gap-2.5">
                                    <i class="fa-solid fa-bolt-lightning text-cyber-cyan mt-0.5"></i>
                                    <span><b>Fluid Delivery Frameworks:</b> Structuring fast user journeys with Tailwind responsive components, state-management containers, and secure client vaults.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- PROJECTS NODE SECTION -->
                    <div v-if="selectedNodeId === 'node-projects'" class="space-y-6">
                        <div class="space-y-3">
                            <span class="font-mono text-[11px] bg-cyber-emerald/10 text-cyber-emerald px-2.5 py-1 rounded border border-cyber-emerald/25 tracking-widest uppercase">Node // Pipelines</span>
                            <h2 class="text-3xl font-extrabold text-white tracking-tight leading-none">Production Log Entries</h2>
                            <p class="text-slate-400 text-sm">A couple of my favorite system engineering models.</p>
                        </div>

                        <!-- Project List using reactive components -->
                        <div v-for="project in projects" :key="project.title" class="p-4 rounded-xl border border-white/5 bg-dark-950/40 hover:border-cyber-cyan/30 transition-all space-y-3">
                            <div class="flex items-center justify-between">
                                <h3 class="text-md font-bold text-white">{{ project.title }}</h3>
                                <span class="font-mono text-[9px] bg-cyber-cyan/10 text-cyber-cyan px-2 py-0.5 rounded">{{ project.tag }}</span>
                            </div>
                            <p class="text-xs text-slate-400 leading-relaxed">{{ project.description }}</p>
                            <div class="flex flex-wrap gap-1.5 pt-1">
                                <span v-for="tech in project.stack" :key="tech" class="font-mono text-[9px] bg-dark-900 text-slate-400 px-2 py-0.5 rounded border border-white/5">
                                    {{ tech }}
                                </span>
                            </div>
                            <div class="border-t border-white/5 pt-2.5 flex justify-between font-mono text-[9px] text-cyber-green">
                                <span>Throughput: {{ project.metrics.rate }}</span>
                                <span>{{ project.metrics.info }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- TECH STACK NODE SECTION -->
                    <div v-if="selectedNodeId === 'node-skills'" class="space-y-6">
                        <div class="space-y-3">
                            <span class="font-mono text-[11px] bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded border border-cyan-400/25 tracking-widest uppercase">Node // System Tech</span>
                            <h2 class="text-3xl font-extrabold text-white tracking-tight leading-none">The Engineering Stack</h2>
                            <p class="text-slate-400 text-sm">Categorized layers from datastores and backend runtimes up to user interactions.</p>
                        </div>

                        <div class="space-y-4">
                            <!-- Backend and Protocols -->
                            <div class="space-y-2">
                                <h4 class="font-mono text-xs text-cyber-cyan uppercase tracking-wider flex items-center gap-1.5">
                                    <i class="fa-solid fa-server"></i> System Logic & Core Protocols
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="skill in skills.backend" :key="skill" class="font-mono text-xs bg-dark-950 text-slate-300 px-3 py-1 rounded border border-white/5">
                                        {{ skill }}
                                    </span>
                                </div>
                            </div>

                            <!-- Frontend & Fullstack UI -->
                            <div class="space-y-2">
                                <h4 class="font-mono text-xs text-cyber-green uppercase tracking-wider flex items-center gap-1.5">
                                    <i class="fa-solid fa-display"></i> User Interfaces & Fullstack UX
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="skill in skills.frontend" :key="skill" class="font-mono text-xs bg-dark-950 text-slate-300 px-3 py-1 rounded border border-white/5">
                                        {{ skill }}
                                    </span>
                                </div>
                            </div>

                            <!-- DBs and Cloud Infrastructure -->
                            <div class="space-y-2">
                                <h4 class="font-mono text-xs text-cyber-amber uppercase tracking-wider flex items-center gap-1.5">
                                    <i class="fa-solid fa-database"></i> Datastores & Architecture Deployment
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="skill in skills.infra" :key="skill" class="font-mono text-xs bg-dark-950 text-slate-300 px-3 py-1 rounded border border-white/5">
                                        {{ skill }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- CONTACT GATE NODE SECTION -->
                    <div v-if="selectedNodeId === 'node-contact'" class="space-y-6">
                        <div class="space-y-3">
                            <span class="font-mono text-[11px] bg-cyber-amber/10 text-cyber-amber px-2.5 py-1 rounded border border-cyber-amber/25 tracking-widest uppercase">Node // Contact Gateway</span>
                            <h2 class="text-3xl font-extrabold text-white tracking-tight leading-none">Connect Channels</h2>
                            <p class="text-slate-400 text-sm">Launch a payload handshake connection over the wire.</p>
                        </div>

                        <!-- Reactive Vue contact submission form -->
                        <form @submit.prevent="handleContactSubmit" class="space-y-4">
                            <div class="space-y-1">
                                <label class="font-mono text-[10px] text-slate-500 uppercase">client_identifier (your name)</label>
                                <input v-model="contactForm.name" type="text" required placeholder="Alice Jenkins" class="w-full bg-dark-950/60 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-all">
                            </div>
                            <div class="space-y-1">
                                <label class="font-mono text-[10px] text-slate-500 uppercase">client_handshake_endpoint (email)</label>
                                <input v-model="contactForm.email" type="email" required placeholder="alice@system.io" class="w-full bg-dark-950/60 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-all">
                            </div>
                            <div class="space-y-1">
                                <label class="font-mono text-[10px] text-slate-500 uppercase">payload_description (message)</label>
                                <textarea v-model="contactForm.message" required rows="3" placeholder="I'm interested in scaling a core system architecture..." class="w-full bg-dark-950/60 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-all resize-none"></textarea>
                            </div>
                            <button type="submit" class="w-full bg-white text-dark-950 hover:bg-slate-200 py-3 rounded-lg font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2">
                                <i class="fa-solid fa-paper-plane"></i> POST CONNECTION_HANDSHAKE
                            </button>
                        </form>

                        <!-- Alternate Network Links -->
                        <div class="border-t border-white/5 pt-4 flex justify-around items-center">
                            <a href="mailto:your.email@example.com" class="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs">
                                <i class="fa-solid fa-envelope text-cyber-cyan"></i> Mail Direct
                            </a>
                            <a href="https://github.com" target="_blank" class="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs">
                                <i class="fa-brands fa-github text-cyber-green"></i> GitHub
                            </a>
                            <a href="https://linkedin.com" target="_blank" class="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs">
                                <i class="fa-brands fa-linkedin text-cyber-blue"></i> LinkedIn
                            </a>
                        </div>
                    </div>

                </div>

                <!-- Window Footer Diagnostic Panel -->
                <div class="px-5 py-3 border-t border-white/5 bg-dark-900/60 font-mono text-[10px] text-slate-500 flex justify-between items-center">
                    <span>SELECTION: {{ selectedNodeId.toUpperCase() }}</span>
                    <span>SYS_TEMP: {{ systemTemp }}°C</span>
                </div>
            </div>

            <!-- Canvas Architecture container mapping system topology -->
            <div class="flex-1 w-full relative">
                <canvas ref="archCanvas" class="w-full h-full cursor-grab active:cursor-grabbing"></canvas>
                
                <!-- Architecture Legend (Floating) -->
                <div class="absolute right-6 top-4 glass px-4 py-3 rounded-xl border border-white/5 hidden sm:block max-w-[280px]">
                    <h4 class="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Topology Map Legend</h4>
                    <div class="space-y-2 text-[10px] font-mono">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded bg-cyber-cyan border border-cyber-cyan/30 block"></span>
                            <span class="text-white">API Gateway Node</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded bg-cyber-emerald border border-cyber-emerald/30 block"></span>
                            <span class="text-white">Active Microservices</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded bg-cyan-400 border border-cyan-400/30 block"></span>
                            <span class="text-white">Operational Datastore</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded bg-cyber-amber border border-cyber-amber/30 block"></span>
                            <span class="text-white">Inbound Request Queue</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Live Scrolling Console Logging Terminal footer -->
            <footer class="h-20 bg-dark-950/90 border-t border-white/5 backdrop-blur-md z-30 font-mono text-[10px] flex items-center overflow-hidden">
                <div class="w-40 flex items-center justify-center border-r border-white/5 h-full bg-dark-950 px-4 text-center">
                    <span class="text-cyber-green text-glow-green font-bold tracking-widest">LIVE_TELEMETRY</span>
                </div>
                <div class="flex-1 px-6 overflow-x-auto h-full flex items-center select-none" ref="logMarqueeContainer">
                    <div class="flex space-x-8 text-slate-500 whitespace-nowrap py-2">
                        <span v-for="(log, idx) in logMarquee" :key="idx" 
                              :class="{ 'text-white text-glow-cyan font-semibold': idx === logMarquee.length - 1 }">
                            {{ log }}
                        </span>
                    </div>
                </div>
            </footer>
        </main>

        <!-- Accessible / Semantic Static Document View (Rendered when blueprint view is off) -->
        <main v-show="currentView === 'document'" class="min-h-screen pt-24 pb-20 max-w-5xl mx-auto px-6 space-y-20 z-20 relative">
            
            <!-- Document Header -->
            <section class="space-y-6">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-emerald/30 bg-cyber-emerald/5 text-cyber-emerald font-mono text-xs">
                    <span class="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
                    Fullstack Developer Operational Parameters Loaded
                </div>
                <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
                    Decoupled Infrastructure. <br class="hidden sm:inline">
                    Reliable <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green">API Engines.</span>
                </h1>
                <p class="text-slate-400 text-lg max-w-2xl">
                    I design robust backend network structures built to fail gracefully, alongside seamless modern user clients tailored to maximize rendering workflows.
                </p>
            </section>

            <!-- About Me Document -->
            <section class="border-t border-white/5 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="md:col-span-1">
                    <h2 class="font-mono text-xs text-cyber-cyan tracking-widest uppercase">// CORE METRIC</h2>
                    <h3 class="text-2xl font-bold text-white mt-2">Core Philosophy</h3>
                </div>
                <div class="md:col-span-2 space-y-4 text-slate-400 text-sm leading-relaxed">
                    <p>
                        Software architecture shouldn't be about clever layers that can break at simple scale. My designs prioritize continuous observability, robust asynchronous streaming layers, and predictable system boundaries.
                    </p>
                    <p>
                        In my daily role as a fullstack engineer, I ensure frontend UI elements load with speed by minimizing layout calculation shifts, scheduling client tasks efficiently, and maintaining strict type parameters over client APIs.
                    </p>
                </div>
            </section>

            <!-- Projects Grid (Static Portfolio layout) -->
            <section class="border-t border-white/5 pt-12 space-y-8">
                <div>
                    <h2 class="font-mono text-xs text-cyber-green tracking-widest uppercase">// STABLE DEPLOYMENTS</h2>
                    <h3 class="text-2xl font-bold text-white mt-2">Selected Projects</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div v-for="project in projects" :key="project.title" class="p-6 rounded-xl border border-white/5 bg-dark-900/60 hover:border-cyber-cyan/30 transition-all space-y-4">
                        <div class="flex justify-between items-start">
                            <span class="font-mono text-[10px] text-cyber-cyan">{{ project.tag.toUpperCase() }}</span>
                        </div>
                        <h4 class="text-xl font-bold text-white">{{ project.title }}</h4>
                        <p class="text-slate-400 text-xs leading-relaxed">{{ project.description }}</p>
                        <div class="flex flex-wrap gap-2 pt-2">
                            <span v-for="tech in project.stack" :key="tech" class="font-mono text-[10px] bg-dark-950 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Core Stack Matrix -->
            <section class="border-t border-white/5 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="md:col-span-1">
                    <h2 class="font-mono text-xs text-cyber-blue tracking-widest uppercase">// SYSTEM CAPABILITY</h2>
                    <h3 class="text-2xl font-bold text-white mt-2">Technical Matrix</h3>
                </div>
                <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div class="space-y-3">
                        <h4 class="font-mono text-xs text-white uppercase tracking-wider">Primary System Tech</h4>
                        <ul class="space-y-2 text-slate-400 font-mono text-xs">
                            <li v-for="skill in skills.backend" :key="skill" class="flex items-center gap-2">
                                <span class="w-1.5 h-1.5 bg-cyber-cyan rounded-full"></span> {{ skill }}
                            </li>
                        </ul>
                    </div>
                    <div class="space-y-3">
                        <h4 class="font-mono text-xs text-white uppercase tracking-wider">Client & Deploy Tools</h4>
                        <ul class="space-y-2 text-slate-400 font-mono text-xs">
                            <li v-for="skill in [...skills.frontend, ...skills.infra]" :key="skill" class="flex items-center gap-2">
                                <span class="w-1.5 h-1.5 bg-cyber-green rounded-full"></span> {{ skill }}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Contact Section -->
            <section class="border-t border-white/5 pt-12 space-y-6 text-center max-w-xl mx-auto">
                <h2 class="font-mono text-xs text-cyber-amber tracking-widest uppercase">// ESTABLISH INBOUND ROUTE</h2>
                <h3 class="text-3xl font-extrabold text-white">Let's craft scalable system boundaries together.</h3>
                <p class="text-slate-400 text-sm leading-relaxed">
                    If you want to integrate modular backend structures with highly elegant user frameworks, shoot over an integration request!
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <a href="mailto:your.email@example.com" class="bg-white hover:bg-slate-200 text-dark-950 px-6 py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2">
                        <i class="fa-solid fa-envelope"></i> Shoot Email
                    </a>
                    <div class="flex gap-2">
                        <a href="https://github.com" target="_blank" class="p-3 border border-white/5 rounded-lg text-slate-400 hover:text-white hover:border-cyber-cyan transition-all"><i class="fa-brands fa-github text-lg"></i></a>
                        <a href="https://linkedin.com" target="_blank" class="p-3 border border-white/5 rounded-lg text-slate-400 hover:text-white hover:border-cyber-blue transition-all"><i class="fa-brands fa-linkedin text-lg"></i></a>
                    </div>
                </div>
            </section>

            <!-- Document Footer -->
            <footer class="border-t border-white/5 pt-8 font-mono text-[10px] text-slate-500 flex justify-between">
                <span>© 2026 ARCHITECT PORTFOLIO // BUILT WITH VUE 3</span>
                <span>SYSTEM RATING: NOMINAL</span>
            </footer>
        </main>

        <!-- Dynamic Handshake Feedback Notification Toast -->
        <div id="toast-notif" 
             :class="isToastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'"
             class="fixed bottom-6 right-6 transition-all duration-300 glass border border-cyber-cyan/30 px-4 py-3 rounded-lg text-xs font-mono text-white flex items-center gap-2 shadow-lg shadow-black/40 z-50">
            <i class="fa-solid fa-circle-check text-cyber-green animate-pulse"></i>
            <span>{{ toastMessage }}</span>
        </div>

        <!-- Chatbot -->
        <ChatbotDialog
          :open="open"
          @close="close"
        />

        <ChatbotChatToogle
          :open="open"
          @toggle="toggle"
        />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

const { open, toggle, close } = useChat();

const currentView = ref('visualizer');
const selectedNodeId = ref('node-overview');
const isSidePanelActive = ref(false);
  
const latency = ref('4');
const systemTemp = ref(34);
const overallCpuUsage = ref(12);

const isToastVisible = ref(false);
const toastMessage = ref('');

// Custom log telemetry entries queue
const logMarquee = ref([
    "[SYS] Vue cluster runtime initialization completed.",
    "[DB] Testing relational datastore replication layers... OK",
    "[NET] Direct microservice pathways connected successfully.",
    "[REDIS] Latency optimization parameters: ENABLED",
]);

const contactForm = reactive({
    name: '',
    email: '',
    message: ''
});

// Structured projects model
const projects = [
    {
        title: "Distributed E-Voting Protocol",
        tag: "Core Backend System",
        description: "A highly secure decoupled casting architecture leveraging homomorphic encryption schemas to authorize absolute vote verification without compromising identity integrity.",
        stack: ["Go Services", "gRPC / Protobuf", "Paillier Cryptography", "Docker Containers"],
        metrics: { rate: "< 45ms", info: "Verified Audit logs" }
    },
    {
        title: "Enterprise API Gateway Routing",
        tag: "Fullstack Architecture",
        description: "High-throughput custom gateway managing enterprise client identity mappings, multi-threaded request throttling, cache layer routing, and web console dashboards.",
        stack: ["Spring Boot", "Redis cache", "Vue 3 / Vuex", "PostgreSQL tuning"],
        metrics: { rate: "18k req/sec", info: "99.999% uptime" }
    }
];

// Core Technology list mappings
const skills = {
    backend: ["Spring Boot (Java)", "FastAPI (Python)", "Go REST Services", "gRPC & Protobuf", "IPC Channels"],
    frontend: ["Vue 3 Composition", "React Native", "Zustand State Engine", "Tailwind CSS Layouts"],
    infra: ["PostgreSQL Tuning", "Redis Caching Layers", "Docker Configurations", "Kafka Stream Queues"]
};

// Node dynamic computed label header 
const activeNodeLabel = computed(() => {
    const mappings = {
        'node-overview': 'ROOT_OVERVIEW_MODULE',
        'node-about': 'PROFILE_MAPPING_NODE',
        'node-projects': 'PRODUCTION_LOG_NODE',
        'node-skills': 'SYSTEM_UTILITIES_NODE',
        'node-contact': 'CONNECTION_HANDSHAKE_NODE'
    };
    return mappings[selectedNodeId.value] || 'NULL_NODE';
});

// Canvas reference setup
const archCanvas = ref(null);
const logMarqueeContainer = ref(null);
let ctx = null;
let width = 0;
let height = 0;
let animationId = null;

// Canvas Entity lists
let nodes = [];
let connections = [];
let dataPackets = [];
let dragNode = null;
let hoveredNode = null;
let systemLoad = 1;

// Color schemes design tokens
const colors = {
    cyan: '#00f2fe',
    emerald: '#10b981',
    blue: '#3b82f6',
    amber: '#f59e0b',
    slate: '#64748b'
};

class NetworkNode {
    constructor(id, label, x, y, size, colorClass, type, summary) {
        this.id = id;
        this.label = label;
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.size = size;
        this.baseSize = size;
        this.color = colorClass;
        this.type = type;
        this.summary = summary;
        this.pulse = 0;
        this.cpuUsage = Math.floor(Math.random() * 15) + 5;
    }

    update() {
        this.pulse += 0.04;
        this.x += (this.targetX - this.x) * 0.1;
        this.y += (this.targetY - this.y) * 0.1;

        const isFocused = selectedNodeId.value === this.id;
        if (isFocused) {
            this.size = this.baseSize * 1.2 + Math.sin(this.pulse) * 1.5;
        } else {
            this.size = this.baseSize + Math.sin(this.pulse) * 0.5;
        }

        // Slight variance simulation
        if (Math.random() < 0.04) {
            this.cpuUsage = Math.max(2, Math.min(99, this.cpuUsage + (Math.random() > 0.5 ? 2 : -2)));
        }
    }

    draw() {
        const isFocused = selectedNodeId.value === this.id;

        // Radial shadow/glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = this.color === colors.cyan ? 'rgba(0, 242, 254, 0.03)' :
                        this.color === colors.emerald ? 'rgba(16, 185, 129, 0.03)' :
                        this.color === colors.amber ? 'rgba(245, 158, 11, 0.03)' : 'rgba(59, 130, 246, 0.03)';
        ctx.fill();

        // Solid border block
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.strokeStyle = isFocused ? '#ffffff' : this.color;
        ctx.lineWidth = isFocused ? 2.5 : 1.5;
        ctx.fillStyle = '#090d16';
        ctx.fill();
        ctx.stroke();

        // Inner central anchor point
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Node Title text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.label, this.x, this.y - this.size - 10);

        // Node Telemetry text
        ctx.fillStyle = '#64748b';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(`LOAD: ${this.cpuUsage}%`, this.x, this.y + this.size + 15);
    }
}

class Link {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.from.x, this.from.y);
        ctx.lineTo(this.to.x, this.to.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

class DataPacket {
    constructor(link, speed = 1.5, color = colors.cyan) {
        this.link = link;
        this.progress = 0;
        this.speed = speed * (0.8 + Math.random() * 0.4);
        this.color = color;
        this.size = 2 + Math.random() * 2;
    }

    update() {
        this.progress += (this.speed / 100);
        return this.progress >= 1;
    }

    draw() {
        const start = this.link.from;
        const end = this.link.to;
        const x = start.x + (end.x - start.x) * this.progress;
        const y = start.y + (end.y - start.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur immediately
    }
}

// Node Setup Initializer
const initTopology = () => {
    const canvasEl = archCanvas.value;
    if (!canvasEl) return;

    ctx = canvasEl.getContext('2d');
    width = canvasEl.width = canvasEl.parentElement.clientWidth;
    height = canvasEl.height = canvasEl.parentElement.clientHeight;

    nodes = [];
    connections = [];
    dataPackets = [];

    const isMobile = window.innerWidth < 768;
    const centerOffset = isMobile ? width * 0.75 : width * 0.62;

    const systemGateway = new NetworkNode('node-overview', 'API GATEWAY', centerOffset, height * 0.45, 22, colors.cyan, 'gateway', 'ROOT_ENTRY');
    const aboutMeNode = new NetworkNode('node-about', 'VUE: ABOUT_ME', centerOffset - (isMobile ? 95 : 180), height * 0.25, 18, colors.blue, 'service', 'ABOUT_SERVICE');
    const projectsNode = new NetworkNode('node-projects', 'MICROSERVICE: PROJECTS', centerOffset + (isMobile ? 95 : 180), height * 0.25, 18, colors.emerald, 'service', 'LOGS_SERVICE');
    const skillsNode = new NetworkNode('node-skills', 'DATABASE: TECH_STACK', centerOffset - (isMobile ? 95 : 180), height * 0.65, 18, colors.cyan, 'db', 'SKILLS_REPOSITORY');
    const contactNode = new NetworkNode('node-contact', 'INBOUND_QUEUE: CONTACT', centerOffset + (isMobile ? 95 : 180), height * 0.65, 18, colors.amber, 'queue', 'CONTACT_GATEWAY');

    nodes.push(systemGateway, aboutMeNode, projectsNode, skillsNode, contactNode);

    // Map static node pathways
    connections.push(new Link(aboutMeNode, systemGateway));
    connections.push(new Link(projectsNode, systemGateway));
    connections.push(new Link(systemGateway, skillsNode));
    connections.push(new Link(systemGateway, contactNode));
    connections.push(new Link(skillsNode, contactNode));
};

const systemLoop = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    connections.forEach(link => link.draw());

    // Stream packets based on simulated loads
    if (Math.random() < 0.05 * systemLoad && connections.length > 0) {
        const randomLink = connections[Math.floor(Math.random() * connections.length)];
        dataPackets.push(new DataPacket(randomLink, 1.2 * systemLoad, randomLink.to.color));
    }

    // Update streaming packet steps
    for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i];
        const completed = packet.update();
        if (completed) {
            packet.link.to.pulse += 0.15;
            dataPackets.splice(i, 1);
        } else {
            packet.draw();
        }
    }

    // Draw and animate system nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });

    // Random telemetry latency adjustments
    if (Math.random() < 0.015) {
        latency.value = (Math.floor(Math.random() * 4) + 2).toString();
        // Sync general core temperature readings
        systemTemp.value = Math.max(30, Math.min(65, systemTemp.value + (Math.random() > 0.5 ? 1 : -1)));
        // Sync computational layout cpu average
        const totalCpu = nodes.reduce((acc, curr) => acc + curr.cpuUsage, 0);
        overallCpuUsage.value = Math.floor(totalCpu / nodes.length);
    }

    animationId = requestAnimationFrame(systemLoop);
};

const onResize = () => {
    initTopology();
};

const selectNodeById = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
        selectedNodeId.value = nodeId;
        
        // Style triggers
        isSidePanelActive.value = true;
        setTimeout(() => isSidePanelActive.value = false, 600);

        dispatchLog(`[API] Microservice context focus: ${node.label}`);
    }
};

const handleCanvasInteraction = (clientX, clientY) => {
    const rect = archCanvas.value.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    let selected = false;
    nodes.forEach(node => {
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist < node.size + 15) {
            dragNode = node;
            selected = true;
            selectNodeById(node.id);
        }
    });

    if (!selected) {
        selectedNodeId.value = 'node-overview';
        dispatchLog("[API] Context redirected to ROOT_OVERVIEW.");
    }
};

const setupEventListeners = () => {
    const canvasEl = archCanvas.value;
    if (!canvasEl) return;

    canvasEl.addEventListener('mousedown', (e) => {
        handleCanvasInteraction(e.clientX, e.clientY);
    });

    canvasEl.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        handleCanvasInteraction(touch.clientX, touch.clientY);
    });

    canvasEl.addEventListener('mousemove', (e) => {
        const rect = canvasEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (dragNode) {
            dragNode.targetX = x;
            dragNode.targetY = y;
        }

        let currentHover = null;
        nodes.forEach(node => {
            const dist = Math.hypot(node.x - x, node.y - y);
            if (dist < node.size + 10) {
                currentHover = node;
            }
        });

        if (currentHover !== hoveredNode) {
            hoveredNode = currentHover;
            canvasEl.style.cursor = currentHover ? 'pointer' : 'grab';
        }
    });

    canvasEl.addEventListener('touchmove', (e) => {
        if (!dragNode) return;
        const rect = canvasEl.getBoundingClientRect();
        const touch = e.touches[0];
        dragNode.targetX = touch.clientX - rect.left;
        dragNode.targetY = touch.clientY - rect.top;
    });

    const stopDragging = () => { dragNode = null; };
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    window.addEventListener('resize', onResize);
};

const dispatchLog = (message) => {
    logMarquee.value.push(message);
    if (logMarquee.value.length > 8) {
        logMarquee.value.shift();
    }
    nextTick(() => {
        if (logMarqueeContainer.value) {
            logMarqueeContainer.value.scrollLeft = logMarqueeContainer.value.scrollWidth;
        }
    });
};

const triggerLoadTest = () => {
    systemLoad = 4.5;
    showToast("Simulating heavy dynamic payload load test pattern...");
    dispatchLog("[ALERT] Testing routing pipelines... handling 15,000 req/sec mock metrics.");

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            if (connections.length > 0) {
                const randomLink = connections[Math.floor(Math.random() * connections.length)];
                dataPackets.push(new DataPacket(randomLink, 3.2, randomLink.to.color));
            }
        }, i * 160);
    }

    setTimeout(() => {
        systemLoad = 1;
        dispatchLog("[INFO] Surge cleared. Load balancer restored connection buffer parameters.");
    }, 5000);
};

const rebootSystem = () => {
    showToast("Triggering topology system restart sequence...");
    dispatchLog("[SYS] Restart process initialized. Restructuring socket vectors...");
    
    dataPackets = [];
    initTopology();

    setTimeout(() => dispatchLog("[BOOT] API gateway verification check... NOMINAL"), 400);
    setTimeout(() => dispatchLog("[BOOT] Relational datastores connected and scaled."), 800);
    setTimeout(() => dispatchLog("[BOOT] Topology operational. Dynamic canvas active."), 1200);
};

const handleContactSubmit = () => {
    dispatchLog(`[HANDSHAKE] Verification POST accepted for sender: ${contactForm.name}`);
    showToast("Inbound handshake registered! Verifying logs.");
    
    // Clear inputs
    contactForm.name = '';
    contactForm.email = '';
    contactForm.message = '';

    setTimeout(() => {
        selectedNodeId.value = 'node-overview';
    }, 2000);
};

const showToast = (message) => {
    toastMessage.value = message;
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 4000);
};

const switchView = (mode) => {
    currentView.value = mode;
    if (mode === 'visualizer') {
        nextTick(() => {
            initTopology();
        });
    }
};

onMounted(() => {
    initTopology();
    systemLoop();
    setupEventListeners();
});

onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
});

</script>
