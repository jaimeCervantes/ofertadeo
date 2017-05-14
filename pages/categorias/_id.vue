<template>
<v-app top-toolbar>
  <v-toolbar>
    <v-toolbar-side-icon @click.native.stop="$store.commit('toggleCategoriesNav')"></v-toolbar-side-icon>
    <v-btn icon @click.native.stop="$store.commit('toggleStoresNav')">
      <v-icon>store</v-icon>
    </v-btn>
    <v-toolbar-items>
      <v-toolbar-item>{{current.split('-').join(' ')}}</v-toolbar-item>
    </v-toolbar-items>
  </v-toolbar>
  <main>
    <ofer-sidebar :path="routes.categories" :items="categories" opened="openedCats" />
    <ofer-sidebar :path="routes.stores" :items="stores" opened="openedStores" />
    <ofer-content :routes="routes" :items="catalogs" :breadcrumbs="breadcrumbs"/>
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
      breadcrumbs: [
        { text: data.routes.categories.split('/')[1], href: data.routes.categories, disabled: false, target: '_self' },
        { text: params.id.split('-').join(' '), disabled: true }
      ],
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
