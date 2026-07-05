// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts'
  ],
  css: [
   '~/assets/css/main.css',
  '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  app: {
    head: {
      title: 'Systems Architect & Fullstack Engineer Portfolio',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap'
        }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
