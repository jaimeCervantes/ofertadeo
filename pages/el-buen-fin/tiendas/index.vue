<template>
  <v-container grid-list-md fluid>
    <header v-if="exists(headerInfo)">
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
      <ofer-header-info :info="headerInfo">
      </ofer-header-info>
      <ofer-expand
        :content="content"
        :expanded="expanded"
        @on-expanded="changeExpanded"
        >
      </ofer-expand>
    </header>
    <div class="anuncio">
      <!-- encabezado-adaptable -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-3434008864168200"
           data-ad-slot="2635524670"
           data-ad-format="auto"></ins>
      <script>
      (window.adsbygoogle || []).push({})
      </script>
    </div>
    <v-divider></v-divider>
    <section>
      <div>
        <div v-for="(letter,l) in items" :key="l">
          <h3 v-text="letter._id.toUpperCase()"></h3>
          <v-layout row wrap>
            <v-flex xs6 sm3 md3 lg2 xl2 v-for="(item,i) in letter.stores" :key="i">
              <ofer-item class="mini" :item="item" :to-link="config.routes.elBuenFin + '/' + item._id"  :position="i">
                <template slot="content">
                  <div class="item__name" v-if="item.name">
                    <div class="pl-2 pr-2">
                      <a :href="getItemLink(item._id)">
                        {{sliceTextFromHtml(item.name, 45)}}
                      </a>
                    </div>
                  </div> 
                </template>
              </ofer-item>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </section>
    <div class="anuncio">
      <!-- pie-adaptable -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-3434008864168200"
           data-ad-slot="8124489226"
           data-ad-format="auto"></ins>
      <script>
      (window.adsbygoogle || []).push({})
      </script>
    </div>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'
import OferExpand from '~/components/ofer-expand.vue'
import OferHeaderInfo from '~/components/ofer-header-info.vue'

var urlReq = OferCommon.props.config.default().host + '/api/el-buen-fin/stores'

export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return {
      urlReq: urlReq,
      headerInfo: {
        name: 'El Buen Fin 2018 Tiendas Participantes',
        h1: 'El Buen Fin 2018 Tiendas Participantes',
        thumbnail: 'https://www.ofertadeo.com/uploads/2017/10/26/logo-buen-fin-1_thumb.png',
        img_alt: 'El Buen Fin 2018 Tiendas Participantes',
        img_title: 'El Buen Fin 2018 Tiendas Participantes'
      },
      expanded: false,
      content: `<p>Encuentra las mejores promociones, descuentos y ofertas del Buen Fin 2018 en México y la lista completa de tiendas participantes. Este año son muchas las empresas y comercios que se unen al evento del buen fin para ofrecer a sus clientes las mejores ofertas y entre las tiendas participantes confirmadas este año podemos encontrar: Walmart, Sam's Club, Amazon, Mercado Libre, OfficeMax, Office Depot, Iusacell, Gandhi, Farmacias Benavides, Dafiti, Cinépolis, Blockbuster, Bodega Aurrera, City Club, Elektra, Farmacias Guadalajara, HEB, Comercial Mexicana, Sanborns, Palacio de Hierro, Suburbia, Viana, Chedraui, Coppel, Famsa, Game Planet, Home Depot, Linio, Movistar, Superama, Vivaaerobus, Best Buy, Cinemex, Costco, Farmacias San Pablo, Interjet, Liverpool, Radio Shack, Soriana, Telcel, Volaris, Zara, Telmex, entre otras.</p>`
    }
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
    },
    changeExpanded (eventData) {
      this.expanded = eventData.expanded
    }
  },
  components: {
    OferItem,
    OferCommon,
    OferHeaderInfo,
    OferExpand
  },
  head () {
    let host = this.config.host
    let urlStoreList = `${host}${this.config.routes.elBuenFin}`
    let urlLogo = `${host}/logo.png`

    return {
      title: 'El Buen Fin 2018 México Tiendas Participantes',
      meta: [
        { hid: 'title', name: 'title', content: 'El Buen Fin 2018 México Tiendas Participantes' },
        { hid: 'description', name: 'description', content: 'Encuentra las mejores ofertas del Buen Fin 2018 en México y la lista completa de tiendas participantes como Liverpool, Walmart, Telcel y más. ✪ ¡Ahorra ya!' },
        { hid: 'og:title', property: 'og:title', content: 'El Buen Fin 2018 México Tiendas Participantes' },
        { hid: 'og:description', property: 'og:description', content: 'Encuentra las mejores ofertas del Buen Fin 2018 en México y la lista completa de tiendas participantes como Liverpool, Walmart, Telcel y más. ✪ ¡Ahorra ya!' },
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
  .expand {
    margin-top: 0.5rem;
  }
  
  .divider {
    background-color: #DA251D;
  }
</style>
<style>
  h1 {
    background-color: #DA251D;
    padding: 1rem;
    color: white;
  }
</style>

