// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    routeRules: {
      // API routes cache shorter than the main route, to make sure a new invokation triggers ISR
      '/api/aotw': { isr: 59 },
      '/api/beer': { isr: 30 }, // Caching also happens at the proxy level, this is just to dedupe
      '/api/duolingo': { isr: false }, // Caching happens at the proxy level
      '/api/github': { isr: 59 },
      '/api/hass': { isr: 59 },
      '/api/lastfm-stats': { isr: 59 },
      '/api/spotify': { isr: false }, // Caching happens in the API itself
      '/api/steps': { isr: 59 },
      '/api/shopping': { isr: 59 },
      '/api/water': { isr: 59 },

      // Main route
      '/**': { isr: true },
    },
  },

  fonts: {
    google: {
      families: ['Quicksand:400,500,700'],
    },
  },

  devtools: { enabled: false },
  modules: ['@nuxt/fonts', '@nuxt/image', 'nuxt-icon'],
  compatibilityDate: '2024-08-24',
})
