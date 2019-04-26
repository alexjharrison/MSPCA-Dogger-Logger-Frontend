const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Raleway|Roboto:500',
        rel: 'stylesheet'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'rgba(0,0,0,0)' },

  /*
  ** Global CSS
  */
  css: [],

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs
    'bootstrap-vue/nuxt'
  ],
  /*
  ** BootstrapVue module configuration
  */

  bootstrapVue: {
    // componentPlugins: ['Form', 'FormCheckbox', 'FormInput', 'FormRadio'],
    // directivePlugins: ['Popover']
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://api.doggerlogger.aharrison.xyz/api/'
    // credentials: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  }
}
