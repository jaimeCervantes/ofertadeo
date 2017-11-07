<template>
  <v-container grid-list-md fluid>
    <header>
      <h1>Ofertas, promociones y descuentos en México</h1>
      <p>Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad como Walmart, Chedraui, Sams Club, Liverpool, Soriana, Cinepolis, Cinemex y muchas tiendas mas.  ✓ ¡Ahorra con ofertadeo!</p>
      <v-layout class="anuncio">
        <v-flex xs12 sm12 md12 lg12 xl12>
          <!-- encabezado-adaptable -->
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-3434008864168200"
               data-ad-slot="2635524670"
               data-ad-format="auto"></ins>
          <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </v-flex>
      </v-layout >
    </header>
    <h2>Lista de ofertas y promociones en México</h2> 
    <v-layout row wrap id="main-list" itemscope itemtype="http://schema.org/ItemList">
      <link itemprop="url" :href="config.host" />
      <v-flex xs6 sm4 md3 lg2 xl2 v-for="(item,i) in items" :key="i" >
        <ofer-item :item="item" :to-link="`${config.routes.main}/${item.slug}`" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i"></ofer-item>
      </v-flex>
    </v-layout>
    <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq" txt="Cargar más ofertas"></ofer-more-items>
    <v-layout  class="anuncio">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <!-- pie-adaptable -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-3434008864168200"
             data-ad-slot="8124489226"
             data-ad-format="auto"></ins>
        <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'
import OferMoreItems from '~/components/ofer-more-items.vue'

var urlReq = OferCommon.props.config.default().host + '/api/home'

export default {
  mixins: [OferCommon],
  data () {
    return { urlReq: urlReq }
  },
  async asyncData () {
    let { data } = await axios.get(urlReq)
    return data
  },
  components: {
    OferCommon,
    OferItem,
    OferMoreItems
  },
  head () {
    let host = this.config.host
    let urlLogo = `${host}/logo.png`
    return {
      meta: [
        { hid: 'title', name: 'title', content: 'Ofertas, promociones y descuentos en México | Ofertadeo' },
        { hid: 'publisher', rel: 'publisher', href: 'https://plus.google.com/110009950298317863923' },
        { hid: 'description', name: 'description', content: 'Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!' },
        { hid: 'og:locale', property: 'og:locale', content: 'es_MX' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' },
        { hid: 'og:title', property: 'og:title', content: 'Ofertas, promociones y descuentos en México | Ofertadeo' },
        { hid: 'og:description', property: 'og:description', content: 'Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!' },
        { hid: 'og:url', property: 'og:url', content: host },
        { hid: 'og:image', property: 'og:image', content: urlLogo },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: urlLogo }
      ],
      link: [
        { rel: 'canonical', href: host }
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
                  '@id': `${host}/promociones`,
                  'name': 'Promociones'
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
