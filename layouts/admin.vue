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
import '~/assets/stylus/main-admin.styl'
import '~/assets/css/main.scss'
import OferToolbar from '~/components/ofer-toolbar.vue'
import OferSidebar from '~/components/ofer-sidebar.vue'
import OferFooter from '~/components/ofer-footer.vue'
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

