<template>
<v-app top-toolbar>
  <ofer-toolbar></ofer-toolbar>
  <main>
    <ofer-sidebar :path="routes.categories" :items="categories" opened="openedCats" title="Categorías"/>
    <ofer-sidebar :path="routes.storeList" :items="stores" opened="openedStores" title="Tiendas"/>
    <ofer-content :routes="routes" :items="catalogs" :breadcrumbs="breadcrumbs"/>
  </main>
</v-app>
</template>

<script>
import axios from '~plugins/axios'
import OferToolbar from '~components/ofer-toolbar.vue'
import OferSidebar from '~components/ofer-sidebar.vue'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get('/api/categories/' + params.id)
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
    OferContent,
    OferToolbar
  }
}
</script>
