<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <h1>Tiendas participantes El Buen Fin 2017</h1>
      <p>Son muchas las empresas y comercios que se unen al evento del buen fin para ofrecer a sus clientes las mejores ofertas y entre las tiendas participantes confirmadas este año podemos encontrar: Walmart, Sam's Club, Amazon, Mercado Libre, OfficeMax, Office Depot, Iusacell, Gandhi, Farmacias Benavides, Dafiti, Cinépolis, Blockbuster, Bodega Aurrera, City Club, Elektra, Farmacias Guadalajara, HEB, Comercial Mexicana, Sanborns, Palacio de Hierro, Suburbia, Viana, Chedraui, Coppel, Famsa, Game Planet, Home Depot, Linio, Movistar, Superama, Vivaaerobus, Best Buy, Cinemex, Costco, Farmacias San Pablo, Interjet, Liverpool, Radio Shack, Soriana, Telcel, Volaris, Zara, Telmex, entre otras.</p>
    </template>
    <template slot="content">
      <div id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <div v-for="(letter,l) in items" :key="l">
          <h3 v-text="letter._id.toUpperCase()"></h3>
          <v-row >
            <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in letter.stores" :key="i">
              <ofer-item class="mini" :item="item" :to-link="config.routes.elBuenFin + '/' + item._id" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
                <template slot="content">
                  <v-card-row class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
                    <div class="pl-2 pr-2" itemprop="headline">
                      <a itemprop="name" :href="getItemLink(item._id)">
                        {{sliceTextFromHtml(item.name, 45)}}
                      </a>
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
      return `${this.config.host}${this.config.routes.elBuenFin}/${path}`
    }
  },
  components: {
    OferContent,
    OferItem,
    OferCommon
  },
  head () {
    let host = this.config.host
    let urlStoreList = `${host}${this.config.routes.elBuenFin}`
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
