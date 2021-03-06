const nodeExternals = require('webpack-node-externals')

module.exports = {
  loading: {
    color: '#ff80ab',
    height: '11px'
  },
  cache: true,
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'es-MX'
    },
    title: 'Ofertas, promociones y descuentos en México | Ofertadeo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#1976d2' },
      { name: 'msapplication-TileColor', content: '#2d89ef' },
      { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      { name: 'msapplication-config', content: '/favicons/browserconfig.xml' },
      { name: 'p:domain_verify', content: 'd22a77a044a4490ebd5019e778f4a37b' },
      { name: 'google-site-verification', content: '-jN3QPeaXQTbgPBlyAXlXXh7qRSesWIpa3GC3ijTjJM' },
      { name: 'msvalidate.01', content: '162D9E28E432D290B43E41702E108642' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicons/manifest.json' },
      { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#1976d2' },
      { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Global CSS
  */
  css: [
    '@assets/stylus/main.styl',
    '@assets/css/main.scss',
    '@assets/stylus/roboto-material-icons.styl'
  ],
  plugins: ['~/plugins/vuetify.js'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['~/plugins/vuetify.js', 'axios', '~/plugins/striptags.js'],
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    extractCSS: true,
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            // Include vuetify and quill to the bundles, anything else in node_modules will be ignored
            whitelist: [/^vuetify/,/^quill/]
          })
        ]
      }

      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.styl(us)?$/') {
          rule.use.push({
            loader: 'vuetify-loader',
            options: {
              //theme: resolve('./assets/style/theme.styl')
            }
          })
        }
      })
    }
  }
}
