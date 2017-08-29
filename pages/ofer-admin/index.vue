<template>
  <ofer-content>
    <template slot="info-section">
      <h1>Ofertas, promociones y descuentos en México</h1>
      <p>Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad como Walmart, Chedraui, Sams Club, Liverpool, Soriana, Cinepolis, Cinemex y muchas tiendas mas.  ✓ ¡Ahorra con ofertadeo!</p>
    </template>
    <template slot="content">
      <h2>Lista de ofertas y promociones en México</h2>
      <v-row>
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="config.routes.main + '/' + item.slug">
            <template slot="item-content">
              <v-card-row>
                <div class="pl-2 pr-2">
                  <v-btn small primary dark tag="a" :to="`${config.host}${config.routes.admin}${config.routes.main}/editar/${item.slug}`">Editar</v-btn>
                </div>
              </v-card-row>
            </template>
          </ofer-item>
        </v-col>
      </v-row>
    </template>
    <template slot="more-content">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq" txt="Cargar más ofertas"></ofer-more-items>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'
import OferCommon from '~components/mixins/ofer-common.vue'

var urlReq = '/api/home'

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
    OferContent,
    OferItem,
    OferMoreItems
  },
  methods: {
    concatItems (items) {
      this.items = this.items.concat(items)
    }
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
              '@type': 'WebSite',
              'name': 'Ofertadeo',
              'url': host
            }),
          type: 'application/ld+json'
        },
        {
          innerHTML: JSON.stringify(
            {
              '@context': 'http://schema.org',
              '@type': 'Organization',
              'url': host,
              'logo': urlLogo,
              'sameAs': [
                'https://www.facebook.com/ofertadeo',
                'https://twitter.com/ofertadeo',
                'https://plus.google.com/110009950298317863923',
                'https://www.youtube.com/channel/UCG8yl6wupq3kHem9SE4qa0g',
                'https://es.pinterest.com/ofertadeo/'
              ]
            }),
          type: 'application/ld+json'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .title { margin-top: 0.5rem; }
</style>
