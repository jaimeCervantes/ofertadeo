<template>
  <ofer-content :breadcrumbs="exists(info) ? breadcrumbs : null">
    <template slot="info-section" v-if="exists(info)">
      <ofer-header-info :info="info">
      <template slot="social-network">
        <share-buttons
          :url="`${$store.state.host}${$store.state.routes.categoriesList}/${id}`"
          :media="info.thumbnail" twitter-user="ofertadeo" :title="info.name"
        ></share-buttons>
      </template>
      </ofer-header-info>
    </template>
    <template slot="content">
      <h2 v-if="exists(info)">Ofertas de {{info.name}}</h2>
      <v-row v-if="exists(info)" id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="$store.state.routes.stores + '/' + item.slug" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i"></ofer-item>
        </v-col>
      </v-row>
      <ofer-not-exists v-if="!exists(info)" v-bind:title="notExistTitle"></ofer-not-exists>
    </template>
    <template slot="more-content" v-if="exists(info)">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
    </template>
    <template slot="content-footer" v-if="exists(info)">
      <v-divider class="section-divider"></v-divider>
      <section class="after-items">
        <h2 v-html="'Promociones ' + info.name"></h2>
        <div v-html="info.content"></div>
      </section>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferHeaderInfo from '~components/ofer-header-info.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'
import OferNotExists from '~components/ofer-not-exists.vue'
import ShareButtons from '~components/share-buttons.vue'

// asyncData does not have acces to 'this' reference
var urlReq = '/api/categories/'

export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return {
      urlReq: urlReq,
      info: {},
      notExistTitle: 'La categoría no existe. Te recomendamos verificar la url.'
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq + params.id)
    if (data && data.info) {
      data.info.description = `Descubre las mejores ofertas y promociones de ${data.info.name} en ofertadeo. Descuentos, promociones y ofertas en ${data.info.name}. ✓ ¡Ahorra dinero ya!`
      data.info.title_front = data.info.name
    }

    return Object.assign({
      path: route.path,
      id: params.id
    },
    data)
  },
  components: {
    OferContent,
    OferItem,
    OferMoreItems,
    OferHeaderInfo,
    OferNotExists,
    OferCommon,
    ShareButtons
  },
  head () {
    let host = this.$store.state.host
    let urlCategories = `${host}${this.$store.state.routes.categoriesList}`
    let url = `${urlCategories}/${this.id}`

    let metas = [
      { hid: 'title', name: 'title', content: `Descuentos, promociones y ofertas en ${this.info.name} | Ofertadeo` },
      { hid: 'description', name: 'description', content: this.info.description },
      { hid: 'og:title', property: 'og:title', content: `Descuentos, promociones y ofertas en ${this.info.name} | Ofertadeo` },
      { hid: 'og:description', property: 'og:description', content: `Descubre las mejores ofertas y promociones de ${this.info.name} en ofertadeo. Descuentos, promociones y ofertas en ${this.info.name}. ✓ ¡Ahorra dinero ya!` },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:image', property: 'og:image', content: this.info.img },
      { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: this.info.img },
      { hid: 'og:locale', property: 'og:locale', content: 'es_MX' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' }
    ]

    if (this.info && this.info.img_data) {
      metas.push(
        { hid: 'og:image:width', property: 'og:image:width', content: this.info.img_data.width },
        { hid: 'og:image:height', property: 'og:image:height', content: this.info.img_data.height },
        { hid: 'og:image:type', property: 'og:image:type', content: this.info.img_data.type }
      )
    }

    return (this.info && this.info.name) ? {
      title: `Descuentos, promociones y ofertas en ${this.info.name} | Ofertadeo`,
      meta: metas,
      link: [
        { rel: 'canonical', href: `${this.$store.state.host}${this.$store.state.routes.categoriesList}/${this.id}` }
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
    } : { title: this.notExistTitle, meta: [ { name: 'robots', content: 'noindex,follow' } ] }
  }
}
</script>
