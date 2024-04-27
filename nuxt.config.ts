// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    [
      '@pinia/nuxt',

      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
    '@nuxtjs/supabase',
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/callback',
      exclude: ['/', '/**'],
    },
  },
  app: {
    head: {
      title: 'Jamusshop - Find your products',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',
        },
      ],
    },
  },
  css: [
    'bootstrap/scss/bootstrap.scss',
    'swiper/css/bundle',
    '@/assets/css/font-awesome-pro.css',
    '@/assets/css/flaticon_shofy.css',
    '@/assets/scss/main.scss',
  ],
})
