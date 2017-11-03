<template>
  <div>
    <header>
      <v-breadcrumbs divider="/" v-if="breadcrumbs">
        <v-breadcrumbs-item
          v-for="item in breadcrumbs" :key="item.href"
          :disabled="item.disabled"
          :href="item.href"
          :target="item.target || '_self'"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <h1>Ofertas, promociones y descuentos en Tiendas de México</h1>
      <h2 class="subheading">En esta sección encontrarás las mejores ofertas, promociones y descuentos de las principales tiendas de México ordenas alfabéticamente.</h2>
    </header>
    <section id="main-list" itemscope itemtype="http://schema.org/ItemList">
      <div v-for="(letter,l) in items" :key="l">
        <h3 v-text="letter._id.toUpperCase()"></h3>
        <v-layout row wrap id="main-list" itemscope itemtype="http://schema.org/ItemList">
          <v-flex xs6  sm3 md2 lg2 xl2 v-for="(item,i) in letter.stores" :key="i" >
            <ofer-item :item="item" :to-link="config.routes.storeList + '/' + item._id" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i" class="mini">
              <template slot="content">
                <div class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
                  <div class="pl-2 pr-2" itemprop="headline">
                    <a itemprop="name" :href="getItemLink(item._id)">
                      {{sliceTextFromHtml(item.name, 45)}}
                    </a>
                  </div>
                  <div class="pl-2 pr-2">
                      <v-btn small primary dark :href="`${config.host}${config.routes.admin}${config.routes.storeList}/editar/${item._id}`">Editar</v-btn>
                    </div>
                </div> 
              </template>
            </ofer-item>
          </v-flex>
        </v-layout>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'

var urlReq = OferCommon.props.config.default().host + '/api/stores'

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
    OferItem,
    OferCommon
  },
  methods: {
    getItemLink (path) {
      return `${this.config.host}${this.config.routes.storeList}/${path}`
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
