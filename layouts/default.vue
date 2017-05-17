<template>
  <v-app>
    <ofer-toolbar opened="sidebar"></ofer-toolbar>
    <main>
      <ofer-sidebar/>
      <nuxt/>
    </main>
  </v-app>
</template>

<script>
import OferToolbar from '~components/ofer-toolbar.vue'
import OferSidebar from '~components/ofer-sidebar.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default {
  components: {
    OferToolbar,
    OferSidebar
  }
}
</script>

<style lang="stylus">
  @import '`~assets/stylus/main'
</style>
