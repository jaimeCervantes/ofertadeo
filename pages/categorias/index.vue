<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <h1 class="title">Ofertas, promociones y descuentos por Categorías.</h1>
      <h2 class="subheading">En esta sección encontrarás las mejores ofertas, promociones y descuentos de Categorías como Frutas y Verduras, Meses sin Intereses, Ventas Nocturnas y más ordenadas alfabéticamente.</h2>
    </template>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="$store.state.routes.categories + '/' + item._id"></ofer-item>
        </v-col>
      </v-row>
    </template>
    <template slot="more-content">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq" txt="Cargar más categorías"></ofer-more-items>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'

var urlReq = '/api/categories'

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
  components: {
    OferContent,
    OferItem,
    OferMoreItems,
    OferCommon
  },
  head () {
    let host = this.$store.state.host
    let urlLogo = `${host}/logo.png`
    let urlCategories = `${host}${this.$store.state.routes.categoriesList}`

    return {
      title: 'Ofertas, promociones y descuentos por Categorías | Ofertadeo',
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
      ],
      script: [
        {
          innerHTML: JSON.stringify(
            {
              '@context': 'http://schema.org',
              '@type': 'BreadcrumbList',
              'itemListElement': [{
                '@type': 'ListItem',
                'position': 1,
                'item': {
                  '@id': host,
                  'name': 'Ofertadeo'
                }
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'item': {
                  '@id': urlCategories,
                  'name': 'Categorias'
                }
              }]
            }),
          type: 'application/ld+json'
        }
      ]
    }
  }
}
</script>
