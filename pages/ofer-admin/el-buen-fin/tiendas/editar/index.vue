<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <h1>Ofertas, promociones y descuentos en Tiendas de México</h1>
      <h2 class="subheading">En esta sección encontrarás las mejores ofertas, promociones y descuentos de las principales tiendas de México ordenas alfabéticamente.</h2>
    </template>
    <template slot="content">
      <div id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <div v-for="(letter,l) in items" :key="l">
          <h3 v-text="letter._id.toUpperCase()"></h3>
          <v-row >
            <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in letter.stores" :key="i">
              <ofer-item :item="item" :to-link="config.routes.elBuenFin + '/' + item._id" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
                <template slot="content">
                  <v-card-row class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
                    <div class="pl-2 pr-2" itemprop="headline">
                      <a itemprop="name" :href="getItemLink(item._id)">
                        {{sliceTextFromHtml(item.name, 45)}}
                      </a>
                    </div>
                  </v-card-row> 
                  <v-card-row>
                    <div class="pl-2 pr-2">
                      <v-btn small primary dark tag="a" :to="`${config.host}${config.routes.admin}${config.routes.elBuenFin}${config.routes.storeList}/editar/${item.slug}`">Editar</v-btn>
                    </div>
                  </v-card-row>
                </template>
              </ofer-item>
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~/plugins/axios'
import OferContent from '~/components/ofer-content.vue'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'

var urlReq = OferCommon.props.config.default().host + '/api/el-buen-fin/stores'

export default {
  layout: 'admin',
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
    OferItem,
    OferCommon
  },
  methods: {
    getItemLink (path) {
      return `${this.config.host}${this.config.routes.elBuenFin}/${path}`
    }
  },
  head () {
    return {
      title: 'Tiendas | Ofertadeo',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>
