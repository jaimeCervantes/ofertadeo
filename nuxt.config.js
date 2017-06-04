module.exports = {
  loading: {
    color: '#42a5f5',
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
      { hid: 'title', name: 'title', content: 'Ofertas, promociones y descuentos en México | Ofertadeo' },
      { hid: 'publisher', rel: 'publisher', href: 'https://plus.google.com/110009950298317863923' },
      { hid: 'description', name: 'description', content: 'Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!' },
      { hid: 'og:locale', property: 'og:locale', content: 'es-MX' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' },
      { hid: 'og:title', property: 'og:title', content: 'Ofertas, promociones y descuentos en México | Ofertadeo' },
      { hid: 'og:description', property: 'og:description', content: 'Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!' },
      { hid: 'og:url', property: 'og:url', content: 'https://ofertadeo.com' },
      { hid: 'og:image', property: 'og:image', content: 'https://ofertadeo.com/logo.png' },
      { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: 'https://ofertadeo.com/logo.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
      lang: 'es-MX'
    }
  },
  /*
  ** Global CSS
  */
  css: [
     { src: '~assets/css/main.scss', lang: 'scss' }, // scss instead of sass
     '~assets/css/roboto-material-icons.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', '~plugins/striptags.js'],
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
