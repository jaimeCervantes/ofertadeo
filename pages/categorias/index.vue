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
      <h1 class="title">Ofertas, promociones y descuentos por Categorías.</h1>
      <h2 class="subheading">En esta sección encontrarás las mejores ofertas, promociones y descuentos de Categorías como Frutas y Verduras, Meses sin Intereses, Ventas Nocturnas y más ordenadas alfabéticamente.</h2>
    </header>
    <div class="anuncio">
      
    </div>
    <section>
      <div id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <div v-for="(letter, j) in items" :key="j">
          <h3 v-text="letter._id.toUpperCase()"></h3>
          <v-layout row wrap>
            <v-flex xs6 sm3 md3 lg2 xl2 v-for="(item, i) in letter.categories" :key="i">
              <ofer-item class="mini" :item="item" :to-link="config.routes.categories + '/' + item._id" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
                <template slot="content">
                  <div class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
                    <div class="pl-2 pr-2" itemprop="headline">
                      <a itemprop="name" :href="getItemLink(item._id)">
                        {{item.name}}
                      </a>
                    </div>
                  </div> 
                </template>
              </ofer-item>
              <div v-if="i===3">
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
            </v-flex>
          </v-layout>          
        </div>
      </div>
    </section>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'

var urlReq = OferCommon.props.config.default().host + '/api/categories'

export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return { urlReq: urlReq }
  },
  async asyncData (context) {
    let { data } = await axios.get(urlReq)
    return Object.assign({
      path: context.route.path
    },
    data)
  },
  methods: {
    getItemLink (path) {
      return `${this.config.host}${this.config.routes.categoriesList}/${path}`
    }
  },
  components: {
    OferItem,
    OferCommon
  },
  head () {
    let host = this.config.host
    let urlLogo = `${host}/logo.png`
    let urlCategories = `${host}${this.config.routes.categoriesList}`

    return {
      title: 'Ofertas, promociones y descuentos por Categorías',
      meta: [
        { hid: 'title', name: 'title', content: 'Ofertas, promociones y descuentos por Categorías.' },
        { hid: 'description', name: 'description', content: 'En esta sección encuentra las mejores ofertas, promociones y descuentos por Categorías como carnes, abarrotes, alimentos, frutas, verduras y más.' },
        { hid: 'og:title', property: 'og:title', content: 'Ofertas, promociones y descuentos por Categorías.' },
        { hid: 'og:description', property: 'og:description', content: 'En esta sección encuentra las mejores ofertas, promociones y descuentos por Categorías como carnes, abarrotes, alimentos, frutas, verduras y más.' },
        { hid: 'og:url', property: 'og:url', content: urlCategories },
        { hid: 'og:locale', property: 'og:locale', content: 'es_MX' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' },
        { hid: 'og:image', property: 'og:image', content: urlLogo },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: urlLogo }
      ],
      link: [
        { rel: 'canonical', href: urlCategories }
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
