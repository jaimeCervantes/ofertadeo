<template>
<main>
  <v-app id="ofertadeo">
    <header>
      <ofer-toolbar opened="sidebar" class="ofer"></ofer-toolbar>
    </header>
    <ofer-sidebar/>
    <nuxt/>
  </v-app>
  <ofer-footer></ofer-footer>
</main>
</template>

<script>
import OferToolbar from '~components/ofer-toolbar.vue'
import OferSidebar from '~components/ofer-sidebar.vue'
import OferFooter from '~components/ofer-footer.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default {
  components: {
    OferToolbar,
    OferSidebar,
    OferFooter
  }
}
</script>
<style lang="stylus">
  @import '~assets/stylus/main-admin.styl'
</style>
