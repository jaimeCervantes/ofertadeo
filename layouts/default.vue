<template>
  <v-app id="ofertadeo">
    <ofer-toolbar opened="sidebar" class="ofer"></ofer-toolbar>
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
