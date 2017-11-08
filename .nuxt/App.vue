<template>
  <div id="__nuxt">
    <nuxt-loading ref="loading"></nuxt-loading>
    <component v-if="layout" :is="nuxt.err ? 'nuxt' : layout"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/stylus/main.styl'

import '../assets/css/main.scss'

import '../assets/stylus/roboto-material-icons.styl'


let layouts = {

  "_admin": () => import('../layouts/admin.vue'  /* webpackChunkName: "layouts/admin" */).then(m => m.default || m),

  "_default": () => import('../layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"htmlAttrs":{"lang":"es-MX"},"title":"Ofertas, promociones y descuentos en México | Ofertadeo","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"theme-color","content":"#1976d2"},{"name":"msapplication-TileColor","content":"#2d89ef"},{"name":"msapplication-TileImage","content":"/favicons/mstile-144x144.png"},{"name":"msapplication-config","content":"/favicons/browserconfig.xml"},{"name":"p:domain_verify","content":"d22a77a044a4490ebd5019e778f4a37b"},{"name":"google-site-verification","content":"-jN3QPeaXQTbgPBlyAXlXXh7qRSesWIpa3GC3ijTjJM"},{"name":"msvalidate.01","content":"162D9E28E432D290B43E41702E108642"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicons/favicon.ico"},{"rel":"apple-touch-icon","sizes":"180x180","href":"/favicons/apple-touch-icon.png"},{"rel":"icon","type":"image/png","sizes":"32x32","href":"/favicons/favicon-32x32.png"},{"rel":"icon","type":"image/png","sizes":"16x16","href":"/favicons/favicon-16x16.png"},{"rel":"manifest","href":"/favicons/manifest.json"},{"rel":"mask-icon","href":"/favicons/safari-pinned-tab.svg","color":"#1976d2"},{"rel":"shortcut icon","href":"/favicons/favicon.ico"},{"rel":"dns-prefetch","href":"//pagead2.googlesyndication.com"},{"rel":"dns-prefetch","href":"//fonts.gstatic.com"},{"rel":"dns-prefetch","href":"//www.google-analytics.com"},{"rel":"dns-prefetch","href":"//googleads.g.doubleclick.net"},{"rel":"dns-prefetch","href":"//www.google.com"},{"rel":"dns-prefetch","href":"//www.googletagmanager.com"},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"}],"__dangerouslyDisableSanitizers":["script"],"style":[],"script":[]},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options._nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}
</script>

