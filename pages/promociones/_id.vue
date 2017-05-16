<template>
<v-app top-toolbar>
  <ofer-toolbar></ofer-toolbar>
  <main>
    <ofer-sidebar :path="routes.categories" :items="categories" opened="openedCats" title="Categorías" />
    <ofer-sidebar :path="routes.storeList" :items="stores" opened="openedStores" title="Tiendas" />
    <ofer-content :breadcrumbs="breadcrumbs">
      <template slot="items">
        <v-col class="pa-3" xs12 sm12 md9 lg9 xl9 v-for="(item,i) in catalogs" :key="i">
          <v-card raised>
            <v-card-row class="light-blue">
              <v-card-title>
                <span class="white--text">{{item.title}}</span>
                <v-spacer></v-spacer>
                <v-menu id="space" bottom left origin="top right" transition="v-scale-transition">
                  <v-btn icon="icon" slot="activator" class="white--text">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-title>Acccion 1</v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-title>Accion 2</v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
            </v-card-row>
            <v-card-row :img="item.thumbnail" height="300px"></v-card-row>
            <v-card-text>
              <div v-html="item.content"></div>
            </v-card-text>
            <v-card-row actions class="light-blue mt-0">
              <v-btn flat class="white--text">Accion 1</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon class="white--text">explore</v-icon>
              </v-btn>
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
    let { data } = await axios.get('/api/promotions/' + params.id)
    return Object.assign({
      breadcrumbs: [
        { text: data.routes.stores.split('/')[1], disabled: false, href: data.routes.stores },
        { text: params.id, disabled: true }
      ],
      current: params.id
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Tienda'
    }
  },
  components: {
    OferSidebar,
    OferContent,
    OferToolbar
  }
}
</script>
