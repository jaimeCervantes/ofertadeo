<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <h1 class="title">Ofertas, promociones y descuentos por Categorías.</h1>
      <h2 class="subheading">En esta sección encontrarás las mejores ofertas, promociones y descuentos de Categorías como Frutas y Verduras, Meses sin Intereses, Ventas Nocturnas y más ordenadas alfabéticamente.</h2>
      <!-- encabezado-adaptable -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-3434008864168200"
           data-ad-slot="2635524670"
           data-ad-format="auto"></ins>
      <script>
      (window.adsbygoogle || []).push({})
      </script>
    </template>
    <template slot="content">
      <div id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <div v-for="(letter, j) in items" :key="j">
          <h3 v-text="letter._id.toUpperCase()"></h3>
          <v-row >
            <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item, i) in letter.categories" :key="i">
              <ofer-item :item="item" :to-link="config.routes.categories + '/' + item._id" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
                <template slot="content">
                  <v-card-row class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
                    <div class="pl-2 pr-2" itemprop="headline">
                      <a itemprop="name" :href="getItemLink(item._id)">
                        {{item.name}}
                      </a>
                    </div>
                  </v-card-row> 
                </template>
              </ofer-item>
            </v-col>
          </v-row>          
        </div>
      </div>
      <!-- pie-adaptable -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-3434008864168200"
           data-ad-slot="8124489226"
           data-ad-format="auto"></ins>
      <script>
      (window.adsbygoogle || []).push({})
      </script>
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
      return `${this.config.host}${this.config.routes.categories}/${path}`
    }
  },
  components: {
    OferContent,
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
