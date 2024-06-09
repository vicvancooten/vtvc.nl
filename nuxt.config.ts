// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    routeRules: {
      '/**': { swr: 15 }
    }
  },

  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image']
})