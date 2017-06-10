<template>
  <ofer-content :breadcrumbs="exists(info) ? breadcrumbs : null">
    <template slot="info-section" v-if="exists(info)">
      <ofer-header-info :info="info"></ofer-header-info>
    </template>
    <template slot="content">
      <v-row v-if="exists(info)">
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="$store.state.routes.stores + '/' + item.slug"></ofer-item>
        </v-col>
      </v-row>
      <ofer-not-exists v-if="!exists(info)" v-bind:title="notExistTitle"></ofer-not-exists>
    </template>
    <template slot="more-content" v-if="exists(info)">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferHeaderInfo from '~components/ofer-header-info.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'
import OferNotExists from '~components/ofer-not-exists.vue'

// asyncData does not have acces to 'this' reference
var urlReq = '/api/categories/'

export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return {
      urlReq: urlReq,
      info: {},
      notExistTitle: 'La categoría no existe. Te recomendamos verificar la url.'
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq + params.id)
    return Object.assign({
      path: route.path,
      id: params.id
    },
    data)
  },
  head () {
    return this.exists(this.info) ? {
      title: `Descuentos, promociones y ofertas en ${this.info.name} | Ofertadeo`,
      meta: [
        { hid: 'title', name: 'title', content: `Descuentos, promociones y ofertas en ${this.info.name} | Ofertadeo` },
        { hid: 'description', name: 'description', content: `Descubre las mejores ofertas y promociones de ${this.info.name} en ofertadeo. Descuentos, promociones y ofertas en ${this.info.name}. ✓ ¡Ahorra dinero ya!` },
        { hid: 'og:title', property: 'og:title', content: `Descuentos, promociones y ofertas en ${this.info.name} | Ofertadeo` },
        { hid: 'og:description', property: 'og:description', content: `Descubre las mejores ofertas y promociones de ${this.info.name} en ofertadeo. Descuentos, promociones y ofertas en ${this.info.name}. ✓ ¡Ahorra dinero ya!` },
        { hid: 'og:url', property: 'og:url', content: `${this.$store.state.host}${this.$store.state.routes.categoriesList}/${this.id}` },
        { hid: 'og:image', property: 'og:image', content: this.info.img },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: this.info.img },
        { hid: 'og:locale', property: 'og:locale', content: 'es-MX' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' }
      ],
      link: [
        { rel: 'canonical', href: `${this.$store.state.host}${this.$store.state.routes.categoriesList}/${this.id}` }
      ]
    } : { title: this.notExistTitle }
  },
  components: {
    OferContent,
    OferItem,
    OferMoreItems,
    OferHeaderInfo,
    OferNotExists
  },
  methods: {
    concatItems (items) {
      this.items = this.items.concat(items)
    }
  }
}
</script>
