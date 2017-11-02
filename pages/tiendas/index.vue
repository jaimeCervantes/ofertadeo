<template>
  <v-container grid-list-md fluid>
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
                </div> 
              </template>
            </ofer-item>
          </v-flex>
        </v-layout>
      </div>
    </section>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'

var urlReq = OferCommon.props.config.default().host + '/api/stores'

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
  methods: {
    getItemLink (path) {
      return `${this.config.host}${this.config.routes.storeList}/${path}`
    }
  },
  components: {
    OferItem,
    OferCommon
  },
  head () {
    let host = this.config.host
    let urlStoreList = `${host}${this.config.routes.storeList}`
    let urlLogo = `${host}/logo.png`

    return {
      title: 'Ofertas, promociones y descuentos en Tiendas de México',
      meta: [
        { hid: 'title', name: 'title', content: 'Ofertas, promociones y descuentos en Tiendas de México' },
        { hid: 'description', name: 'description', content: 'Las mejores ofertas, promociones y descuentos de Tiendas en México como Walmart, Soriana, Chedraui, Liverpool, Bodega Aurrera y más.' },
        { hid: 'og:title', property: 'og:title', content: 'Ofertas, promociones y descuentos en Tiendas de México' },
        { hid: 'og:description', property: 'og:description', content: 'Las mejores ofertas, promociones y descuentos de Tiendas en México como Walmart, Soriana, Chedraui, Liverpool, Bodega Aurrera y más.' },
        { hid: 'og:url', property: 'og:url', content: urlStoreList },
        { hid: 'og:locale', property: 'og:locale', content: 'es_MX' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' },
        { hid: 'og:image', property: 'og:image', content: urlLogo },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: urlLogo }
      ],
      link: [
        { rel: 'canonical', href: urlStoreList }
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
