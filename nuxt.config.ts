// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    routeRules: {
      '/**': { isr: 60 }
    }
  },

  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image', 'nuxt-icon']
})