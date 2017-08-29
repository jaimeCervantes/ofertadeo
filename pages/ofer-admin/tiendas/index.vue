<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <h1>Ofertas, promociones y descuentos en Tiendas de México</h1>
      <h2 class="subheading">En esta sección encontrarás las mejores ofertas, promociones y descuentos de las principales tiendas de México ordenas alfabéticamente.</h2>
    </template>
    <template slot="content">
      <v-row id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="config.routes.storeList + '/' + item._id" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i"></ofer-item>
        </v-col>
      </v-row>
    </template>
    <template slot="more-content">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq" txt="Cargar más tiendas"></ofer-more-items>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'

var urlReq = '/api/stores'

export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return { urlReq: urlReq }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq)
    return Object.assign({
      path: route.path
    },
    data)
  },
  components: {
    OferContent,
    OferMoreItems,
    OferItem,
    OferCommon
  },
  head () {
    return {
      title: 'Tiendas | Ofertadeo'
    }
  }
}
</script>
