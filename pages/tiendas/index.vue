<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <h1 class="title">Ofertas, promociones y descuentos en Tiendas de México</h1>
      <h2 class="subheading">En esta sección encontrarás las mejores ofertas, promociones y descuentos de las principales tiendas de México ordenas alfabéticamente.</h2>
    </template>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="$store.state.routes.storeList + '/' + item._id"></ofer-item>
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
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'

var urlReq = '/api/stores'

export default {
  mixins: [OferPaths],
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
  head () {
    return {
      title: 'Ofertas, promociones y descuentos en Tiendas de México | Ofertadeo',
      meta: [
        { hid: 'title', name: 'title', content: 'Ofertas, promociones y descuentos en Tiendas de México' },
        { hid: 'description', name: 'description', content: 'Las mejores ofertas, promociones y descuentos de Tiendas en México como Walmart, Soriana, Chedraui, Liverpool, Bodega Aurrera y más.' },
        { hid: 'og:title', property: 'og:title', content: 'Ofertas, promociones y descuentos en Tiendas de México' },
        { hid: 'og:description', property: 'og:description', content: 'Las mejores ofertas, promociones y descuentos de Tiendas en México como Walmart, Soriana, Chedraui, Liverpool, Bodega Aurrera y más.' },
        { hid: 'og:url', property: 'og:url', content: `${this.$store.state.host}${this.$store.state.routes.storeList}` },
        { hid: 'og:locale', property: 'og:locale', content: 'es-MX' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' },
        { hid: 'og:image', property: 'og:image', content: 'https://www.ofertadeo.com/logo.png' },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: 'https://www.ofertadeo.com/logo.png' }
      ],
      link: [
        { rel: 'canonical', href: `${this.$store.state.host}${this.$store.state.routes.storeList}` }
      ]
    }
  },
  components: {
    OferContent,
    OferMoreItems,
    OferItem
  },
  methods: {
    concatItems (items) {
      this.items = this.items.concat(items)
    }
  }
}
</script>
