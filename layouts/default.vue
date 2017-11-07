<template>
  
    <v-app id="ofertadeo">
      <ofer-sidebar id="sidebar-nav" itemscope="itemscope" itemtype="https://schema.org/WPSideBar"/>
      <header id="ofer-header" itemscope="itemscope" itemtype="https://schema.org/WPHeader">
        <ofer-toolbar role="navigation" id="main-nav" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement"></ofer-toolbar>
      </header>
      <main itemscope itemprop="mainContentOfPage" itemtype="https://schema.org/WebPageElement" id="main">
        <v-content>
          <nuxt />
        </v-content>
      </main>
      <ofer-footer id="footer" itemscope="itemscope" itemtype="http://schema.org/WPFooter"></ofer-footer>
    </v-app>

</template>

<script>
import OferToolbar from '~/components/ofer-toolbar.vue'
import OferSidebar from '~/components/ofer-sidebar.vue'
import OferFooter from '~/components/ofer-footer.vue'
import VendorScripts from '~/components/vendor-scripts.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default {
  components: {
    OferToolbar,
    OferSidebar,
    OferFooter,
    VendorScripts
  }
}
</script>

