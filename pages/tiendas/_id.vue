<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <div v-if="info" class="content__info-section">
        <div class="img-container">
          <img :src="info.img" :alt="info.img_alt" :title="info.img_title" />  
        </div>
        <div>
          <h1 class="title content__title">{{info.name}}</h1>
          <v-btn tag="a" v-tooltip:top="{ html: 'Ir a la tienda' }" :href="info.url_site" target="_blank" primary>Visitar</v-btn>
        </div>
      </div>
      <h2 class="title">Lista de ofertas, promociones y descuentos en {{info.name}}</h2>
    </template>
    <template slot="content">
      <v-row>
        <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <nuxt-link :to="$store.state.routes.stores + '/' + item.slug">
            <v-card hover raised>
              <v-card-row v-if="item.thumbnail">
                <img :src="item.thumbnail" alt="">
              </v-card-row>
              <v-card-row v-if="item.name">
                <div class="pa-2">{{item.name}}</div>
              </v-card-row>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-row>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'

export default {
  mixins: [OferPaths],
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/stores/' + params.id)
    return Object.assign({
      path: route.path
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Tienda'
    }
  },
  components: {
    OferContent
  }
}
</script>
