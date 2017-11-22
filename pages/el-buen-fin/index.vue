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
      <h1>{{config.txt.elBuenFin}}</h1>
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
    <v-divider />
    <section id="store-list">
      <h3>El Buen Fin 2018 Tiendas Populares</h3>
        <v-layout row wrap>
          <v-flex xs6 sm3 md3 lg2 xl2 v-for="(item,i) in stores" :key="i">
            <ofer-item  class="mini" :item="item" :to-link="config.routes.elBuenFin + '/' + item._id" :position="i">
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
        <div>
          <v-btn primary large tag="a" :href="config.host + config.routes.elBuenFin + config.routes.storeList">Ver todas las tiendas</v-btn>
        </div>
    </section>
    <section id="main-list" itemscope itemtype="http://schema.org/ItemList" v-if="items.length > 0">
      <h2>Promociones y Ofertas del Buen Fin 2018</h2>
        <v-layout row wrap>
          <v-flex xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
              <ofer-item :item="item" :to-link="config.routes.main + '/' + item.slug" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
              </ofer-item>
          </v-flex>
        </v-layout>
        <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq + '/items'" txt="Cargar más ofertas"></ofer-more-items>
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
    </section>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'
import OferMoreItems from '~/components/ofer-more-items.vue'
import OferExpand from '~/components/ofer-expand.vue'

var urlReq = OferCommon.props.config.default().host + '/api/el-buen-fin'

export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return {
      urlReq: urlReq,
      headerInfo: {
        name: 'El Buen Fin 2018',
        h1: 'El Buen Fin 2018',
        thumbnail: 'https://www.ofertadeo.com/uploads/2017/10/26/logo-buen-fin-1_thumb.png',
        img_alt: 'El Buen Fin 2018',
        img_title: 'El Buen Fin 2018'
      },
      expanded: false,
      content: `
        <p>Descubre todos los descuentos, promociones y ofertas del Buen Fin 2018. Esta nueva edición del Buen Fin 2018, será del 17 al 20 de noviembre, aunque estaremos publicando desde antes promociones del Buen Fin, pues algunas tiendas adelantan sus ofertas y descuentos. En Ofertadeo queremos que ahorres tiempo y dinero en tus compras del Buen Fin, y por eso te compartimos las mejores ofertas en un solo lugar. Aquí en Ofertadeo agrupamos todas las ofertas del Buen Fin, de esta forma podrás ver desde la comodidad de tu hogar los descuentos, sin hacer grandes colas o quedar atorado en el tráfico. Ademas por año consecutivo se incorpora al Buen Fin el sector turístico como las aerolíneas Volaris y Aeroméxico, de igual manera los harán asociaciones dedicadas al comercio electrónico como Amazon, Linio y ebay.</p>

        <h2>¿Cuándo es el Buen Fin 2018 en México? Fechas</h2>

        <p>Aqui te decimos cuándo es el Buen Fin 2018 en México, las fechas de las ofertas y promociones. Este año la fehca para El Buen Fin 2018 en México será del 17 al 20 de noviembre. En el que participaran tiendas como Liverpool, Amaon, Best Buy, Walmart, Chedraui, Apple,America Eagle, Zara, Burger King, Game Plantet, Ticketmaster. El Buen Fin se caracteriza por ser el fin de semana más largo del año en donde se ofrecen grandes promociones y descuentos con el objetivo de reactivar la economía, en donde empresas y consumidores salen ganando, pues como consumidor te beneficias comprando al mejor precio del año.</p>

        <p>
        Como lo mencionamos anteriormente este año el Buen Fin México 2017 se llevará a cabo del 18 al 20 de noviembre, en donde todas las empresas ofrecen sus productos al precio más bajo del mercado brindando la posibilidad de adquirir aquello que siempre has querido. Las autoridades federales y representantes del sector privado fueron quienes decidieron cuándo será la fecha de inicio del Buen Fin 2018 en México.
        </p>`
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
    OferExpand,
    OferMoreItems
  },
  head () {
    let host = this.config.host
    let urlStoreList = `${host}${this.config.routes.elBuenFin}`
    let urlLogo = `${host}/logo.png`

    return {
      title: 'El Buen Fin 2018 - ofertas, promociones y descuentos.',
      meta: [
        { hid: 'title', name: 'title', content: 'El Buen Fin 2018 - ofertas, promociones y descuentos' },
        { hid: 'description', name: 'description', content: 'Descubre las mejores promociones, descuentos y ofertas del Buen Fin. La fecha para El Buen Fin 2018 en México será del 17 al 20 de noviembre' },
        { hid: 'og:title', property: 'og:title', content: 'OEl Buen Fin 2018 - ofertas, promociones y descuentos' },
        { hid: 'og:description', property: 'og:description', content: 'Descubre las mejores promociones, descuentos y ofertas del Buen Fin. La fecha para El Buen Fin 2018 en México será del 17 al 20 de noviembre' },
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
  
  #store-list {
    margin-bottom: 1rem;
  }
  
  .btn:first-child {
    margin-left: 0;
  }
  
  .info-content {
    margin-bottom: 0.6rem;
  }
  
  .divider {
    background-color: #DA251D;
  }
  
  .expand, section {
    margin-top: 0.5rem;
  }
  
  h1 {
    background-color: #DA251D;
    padding: 1rem;
    margin-bottom: 0;
    color: white;
    display: inline-block;
  }
</style>

