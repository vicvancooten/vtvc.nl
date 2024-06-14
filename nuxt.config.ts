// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    routeRules: {
      // API routes cache shorter than the main route, to make sure a new invokation triggers ISR
      '/api/spotify': { isr: 29 },
      '/api/lastfm': { isr: 59 },
      '/api/hass': { isr: 59 },
      '/api/duolingo': { isr: 59 },

      // Main route
      '/**': { isr: 60 },
    },
  },

  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image', 'nuxt-icon'],
})
