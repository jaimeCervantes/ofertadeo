module.exports = {
  loading: {
    color: '#ff80ab',
    height: '11px'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Ofertas, promociones y descuentos en México | Ofertadeo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content:'#1976d2' },
      { name: 'msapplication-TileColor', content: '#2d89ef' },
      { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      { name: 'msapplication-config', content: '/favicons/browserconfig.xml' },
      { name: 'p:domain_verify', content: 'd22a77a044a4490ebd5019e778f4a37b' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicons/manifest.json'},
      { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#1976d2' },
      { rel: 'shortcut icon', href: '/favicons/favicon.ico' }
    ],
    htmlAttrs: {
      lang: 'es-MX'
    }
  },
  /*
  ** Global CSS
  */
  css: [
     { src: '~assets/stylus/main.styl', lang: 'stylus' },
     { src: '~assets/css/main.scss', lang: 'scss' } // scss instead of sass
  ],
  /*
  ** Add axios globally
  */
  
  build: {
    vendor: ['axios','~plugins/striptags.js'],
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
    }
  }
}
