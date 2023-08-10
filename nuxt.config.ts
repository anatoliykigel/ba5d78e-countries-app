// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  pinia: {
    autoImports: [
      'defineStore'
    ]
  },
  imports: {
    dirs: ['stores']
  },
  googleFonts: {
    families: {
      Ubuntu: [300, 400, 500, 700]
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  routeRules: {
    '/country': { redirect: '/' }
  }
});
