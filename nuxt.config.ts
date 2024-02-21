// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_colors.scss" as *; @use "~/assets/scss/_helpers.scss" as *;'
        }
      }
    }
  },
  runtimeConfig: {
    apiKey: process.env.API_KEY,
  }
})
