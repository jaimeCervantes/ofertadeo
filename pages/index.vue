<template>
<v-app top-toolbar>
  <ofer-toolbar>
    <template slot="left-items">
      <v-toolbar-title>Ofertadeo</v-toolbar-title>      
    </template>
  </ofer-toolbar>
  <main>
    <ofer-sidebar :path="routes.categories" :items="categories" opened="openedCats" title="Categorías" />
    <ofer-sidebar :path="routes.stores" :items="stores" opened="openedStores"  title="Tiendas" />
    <ofer-content :routes="routes" :items="catalogs" />
  </main>
</v-app>
</template>

<script>
import axios from '~plugins/axios'
import OferToolbar from '~components/ofer-toolbar.vue'
import OferSidebar from '~components/ofer-sidebar.vue'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/home')
    return Object.assign({ categoriesOpened: false, storesOpened: false }, data)
  },
  head () {
    return {
      title: 'Ofertadeo'
    }
  },
  computed: {
    openedCats () { return this.$store.state.openedCats },
    openedStores () { return this.$store.state.openedStores }
  },
  components: {
    OferSidebar,
    OferContent,
    OferToolbar
  }
}
</script>
