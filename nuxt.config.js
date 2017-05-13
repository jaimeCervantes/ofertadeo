module.exports = {
  loading: {
    color: '#42a5f5',
    height: '7px'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Ofertadeo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ofertadeo' }
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
    vendor: ['axios', 'vue-material'],
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
