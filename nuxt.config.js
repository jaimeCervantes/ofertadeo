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
      { hid: 'title', name: 'title', content: 'Ofertas, promociones y descuentos en México | Ofertadeo' },
      { hid: 'description', name: 'description', content: 'Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
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
    vendor: ['axios'],
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
