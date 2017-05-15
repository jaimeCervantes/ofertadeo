<template>
<v-app top-toolbar>
  <ofer-toolbar>
    <template slot="left-items">
      <v-toolbar-items>
        <v-toolbar-item>Tiendas</v-toolbar-item>
      </v-toolbar-items>  
    </template>
  </ofer-toolbar>
  <main>
    <ofer-sidebar :path="routes.categories" :items="categories" opened="openedCats" title="Categorías" />
    <ofer-sidebar :path="routes.stores" :items="stores" opened="openedStores" title="Tiendas" />
    <ofer-content :routes="routes" :breadcrumbs="breadcrumbs">
      <template slot="items">
        <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in stores" :key="i">
          <v-card hover raised>
            <v-card-row v-if="item.thumbnail" v-bind:img="item.thumbnail" height="162px"></v-card-row>
            <v-card-row v-if="item.name">
              <div class="pa-2">{{item.name}}</div>
            </v-card-row>
            <v-card-row class="actions">
                <a :href="routes.storeList + '/' + item._id"><v-btn primary>Ver</v-btn></a>  
            </v-card-row>
          </v-card>
        </v-col>
      </template>
    </ofer-content>
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
    let { data } = await axios.get('/api/stores/' + params.id)
    return Object.assign({
      breadcrumbs: [{ text: data.routes.storeList.split('/')[1], disabled: true }]
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Tiendas'
    }
  },
  components: {
    OferSidebar,
    OferContent,
    OferToolbar
  }
}
</script>
