<template>
  <div id="__nuxt">
    <nuxt-loading ref="loading"></nuxt-loading>
    <component v-if="layout" :is="layout"></component>
  </div>
</template>

<script>
import NuxtLoading from './components/nuxt-loading.vue'

let layouts = {

  "_admin": () => import('/home/jaime/develop/ofertadeo/layouts/admin.vue'  /* webpackChunkName: "layouts/admin" */),

  "_default": () => import('/home/jaime/develop/ofertadeo/layouts/default.vue'  /* webpackChunkName: "layouts/default" */)

}

export default {
  head: {"htmlAttrs":{"lang":"es-MX"},"title":"Ofertas, promociones y descuentos en México | Ofertadeo","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"theme-color","content":"#1976d2"},{"name":"msapplication-TileColor","content":"#2d89ef"},{"name":"msapplication-TileImage","content":"/favicons/mstile-144x144.png"},{"name":"msapplication-config","content":"/favicons/browserconfig.xml"},{"name":"p:domain_verify","content":"d22a77a044a4490ebd5019e778f4a37b"},{"name":"google-site-verification","content":"-jN3QPeaXQTbgPBlyAXlXXh7qRSesWIpa3GC3ijTjJM"},{"name":"msvalidate.01","content":"162D9E28E432D290B43E41702E108642"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicons/favicon.ico"},{"rel":"apple-touch-icon","sizes":"180x180","href":"/favicons/apple-touch-icon.png"},{"rel":"icon","type":"image/png","sizes":"32x32","href":"/favicons/favicon-32x32.png"},{"rel":"icon","type":"image/png","sizes":"16x16","href":"/favicons/favicon-16x16.png"},{"rel":"manifest","href":"/favicons/manifest.json"},{"rel":"mask-icon","href":"/favicons/safari-pinned-tab.svg","color":"#1976d2"},{"rel":"shortcut icon","href":"/favicons/favicon.ico"},{"rel":"dns-prefetch","href":"//www.google-analytics.com"}]},
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


<style src="~assets/stylus/main.styl" lang="stylus"></style>

<style src="~assets/css/main.scss" lang="scss"></style>

