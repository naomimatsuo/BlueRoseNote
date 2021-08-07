import webpack from 'webpack'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BlueRoseNote',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'bluerosenote,ブルーローズノート,体温記録,食事記録,症状記録,薬記録,健康記録の共有' },
      { hid: 'description', name: 'description', content: 'ブルーローズノートは日々の健康記録と共有機能を提供します。' },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: 'ブルーローズノートは日々の健康記録と共有機能を提供します。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'js/script.js',
        body: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/app.scss', lang: 'scss' },
    { src: 'croppie/croppie.css', lang: 'css' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/amplify.js', ssr: false },
    { src: '~/plugins/main.js', mode: 'client', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    ['cookie-universal-nuxt', { alias: 'cookies' }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  loading: {
    color: '#85b8c9',
    height: '5px'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      babelrc: false,
      compact: false,
      presets ({ isServer }, [preset, options]) {
        options.loose = true;
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        // グローバルモジュール
        $: 'jquery'
      })
    ]
  }
}
