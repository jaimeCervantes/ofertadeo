<template>
  <div id="__nuxt">
    <nuxt-loading ref="loading"></nuxt-loading>
    <component v-if="layout" :is="layout"></component>
  </div>
</template>

<script>
import NuxtLoading from './components/nuxt-loading.vue'

let layouts = {

  "_default": () => import('/mnt/c/jaime/develop/ofertadeo_ssr/layouts/default.vue'  /* webpackChunkName: "layouts/default" */)

}

export default {
  head: {"title":"Ofertas, promociones y descuentos en México | Ofertadeo","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"theme-color","content":"#1976d2"},{"hid":"title","name":"title","content":"Ofertas, promociones y descuentos en México | Ofertadeo"},{"hid":"publisher","rel":"publisher","href":"https://plus.google.com/110009950298317863923"},{"hid":"description","name":"description","content":"Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!"},{"hid":"og:locale","property":"og:locale","content":"es-MX"},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:site_name","property":"og:site_name","content":"Ofertadeo"},{"hid":"og:title","property":"og:title","content":"Ofertas, promociones y descuentos en México | Ofertadeo"},{"hid":"og:description","property":"og:description","content":"Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!"},{"hid":"og:url","property":"og:url","content":"https://ofertadeo.com"},{"hid":"og:image","property":"og:image","content":"https://ofertadeo.com/logo.png"},{"hid":"og:image:secure_url","property":"og:image:secure_url","content":"https://ofertadeo.com/logo.png"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"}],"htmlAttrs":{"lang":"es-MX"}},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  
  mounted () {
    this.$loading = this.$refs.loading
    this.$nuxt.$loading = this.$loading
  },
  
  methods: {
    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = layouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      let _layout = '_' + layout
      if (typeof layouts[_layout] !== 'function') {
        return Promise.resolve(layouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        layouts[_layout] = Component
        return layouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
        console.error(e)
      })
    }
  },
  components: {
    NuxtLoading
  }
}
</script>


<style src="~assets/css/main.scss" lang="scss"></style>

<style src="~assets/css/roboto-material-icons.css" lang="css"></style>

