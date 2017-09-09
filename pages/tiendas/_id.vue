<template>
  <ofer-content :breadcrumbs="exists(info) ? breadcrumbs : null">
    <template slot="info-section" v-if="exists(info)">
      <ofer-header-info :info="info" rel="nofollow noopener">
        <template slot="social-network">
          <share-buttons
            :url="`${config.host}${config.routes.storeList}/${id}`"
            :media="info.thumbnail" twitter-user="ofertadeo" :title="info.name"
          ></share-buttons>
        </template>
      </ofer-header-info>
    </template>
    <template slot="content-header">
      <div class="info-content" v-html="info.content"></div>
    </template>
    <template slot="content">
      <h2 v-if="exists(info)" v-html="seo.h2"></h2>
      <v-row v-if="exists(info)" id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" type="store" :to-link="config.routes.main + '/' + item.slug" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i"></ofer-item>
        </v-col>
      </v-row>
      <ofer-not-exists v-if="!exists(info)" v-bind:title="notExistTitle"></ofer-not-exists>
    </template>
    <template slot="more-content" v-if="exists(info)">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
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
var urlReq = '/api/stores/'

export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return {
      urlReq: urlReq,
      info: {},
      notExistTitle: 'La tienda no existe. Te recomendamos verificar la url.'
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq + params.id)
    if (data && data.info) {
      // data.info.description = `Descubre las mejores ofertas y promociones de ${data.info.name} en Ofertadeo. Descuentos, promociones y ofertas en ${data.info.name} ${OferCommon.methods.getDate('YYYY')}. ❤ ¡Ahorra ya!`
      data.seo = OferCommon.methods.getSEOData(data.seo, data.info)
      data.info.h1 = data.seo.h1
      data.info.description = data.seo.description
      data.info.img_alt = `Ofertas ${data.info.name}`
    }

    return Object.assign({ path: route.path, id: params.id }, data)
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
    let host = this.config.host
    let urlStoreList = `${host}${this.config.routes.storeList}`
    let url = `${urlStoreList}/${this.id}`

    let metas = [
      { hid: 'title', name: 'title', content: this.seo.meta_title },
      { hid: 'description', name: 'description', content: this.seo.meta_description },
      { hid: 'og:title', property: 'og:title', content: this.seo.meta_title },
      { hid: 'og:description', property: 'og:description', content: this.seo.meta_description },
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
      title: this.seo.title,
      meta: metas,
      link: [
        { rel: 'canonical', href: url }
      ],
      script: [
        {
          innerHTML: JSON.stringify(
            {
              '@context': 'http://schema.org',
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
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
                    '@id': urlStoreList,
                    'name': 'Tiendas'
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
<style lang="stylus" scoped>
  .info-content {
    margin-bottom: 0.6rem;
  }
</style>
