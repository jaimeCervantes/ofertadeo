<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <h1 class="title">Ofertas, promociones y descuentos por Categorías.</h1>
      <h2 class="subheading">En esta sección encontrarás las mejores ofertas, promociones y descuentos de Categorías como Frutas y Verduras, Meses sin Intereses, Ventas Nocturnas y más ordenadas alfabéticamente.</h2>
    </template>
    <template slot="content">
      <div id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <div v-for="(letter, j) in items" :key="j">
          <h3 v-text="letter._id.toUpperCase()"></h3>
          <v-row >
            <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item, i) in letter.categories" :key="i">
              <ofer-item class="mini" :item="item" :to-link="config.routes.categories + '/' + item._id" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
                <template slot="content">
                  <v-card-row class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
                    <div class="pl-2 pr-2" itemprop="headline">
                      <a itemprop="name" :href="getItemLink(item._id)">
                        {{item.name}}
                      </a>
                    </div>
                  </v-card-row> 
                  <v-card-row>
                    <div class="pl-2 pr-2">
                      <v-btn small primary dark tag="a" :to="`${config.host}${config.routes.admin}${config.routes.categoriesList}/editar/${item.slug}`">Editar</v-btn>
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

var urlReq = OferCommon.props.config.default().host + '/api/categories'

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
      return `${this.config.host}${this.config.routes.categoriesList}/${path}`
    }
  },
  head () {
    return {
      title: 'Editar Categorias | Ofertadeo',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  h3 {
    margin-bottom: 0;
    padding-bottom: 0;
    margin-top: 1.2rem;
    font-size: 1.5rem;
  }
</style>
