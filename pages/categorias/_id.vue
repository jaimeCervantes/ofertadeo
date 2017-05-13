<template>
<v-app top-toolbar>
  <v-toolbar>
    <v-toolbar-side-icon @click.native.stop="$store.commit('toggleCategoriesNav')"></v-toolbar-side-icon>
    <v-btn icon @click.native.stop="$store.commit('toggleStoresNav')">
      <v-icon>store</v-icon>
    </v-btn>
    <v-toolbar-items>
      <v-toolbar-item>{{current}}</v-toolbar-item>
    </v-toolbar-items>
  </v-toolbar>
  <main>
    <ofer-sidebar :path="routes.categories" :items="categories" opened="openedCats" />
    <ofer-sidebar :path="routes.stores" :items="stores" opened="openedStores" />
    <ofer-content :routes="routes" :catalogs="catalogs" :breadcrumbs="breadcrumbs"/>
  </main>
</v-app>
</template>

<script>
import axios from '~plugins/axios'
import OferSidebar from '~components/ofer-sidebar.vue'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get('/api/categorias/' + params.id)
    return Object.assign({
      breadcrumbs: [{ text: data.routes.categories, disabled: true }, { text: params.id, disabled: true }],
      current: params.id
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Categorías'
    }
  },
  components: {
    OferSidebar,
    OferContent
  }
}
</script>
