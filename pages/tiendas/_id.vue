<template>
  <ofer-container :breadcrumbs="exists(info) ? breadcrumbs : null">
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
    <template v-if="exists(info)" slot="content">
      <div>
        <ofer-expand
          :content="info.content"
          :expanded="expanded"
          @on-expanded="changeExpanded">
        </ofer-expand>
        <v-divider class="section-divider" v-if="exists(info)"></v-divider>
      </div>
      <div class="middle-content">
        <h2 v-html="seo.h2"></h2>
        <v-row id="main-list" itemscope itemtype="http://schema.org/ItemList">
          <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
            <ofer-item :item="item" type="store" :to-link="config.routes.main + '/' + item.slug" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i"></ofer-item>
          </v-col>
        </v-row>
      </div>
      <div>
        <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
      </div>
    </template>
    <template v-else slot="content">
      <ofer-not-exists v-if="!exists(info)" v-bind:title="notExistTitle"></ofer-not-exists>
    </template>
  </ofer-container>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferContainer from '~components/ofer-container.vue'
import OferHeaderInfo from '~components/ofer-header-info.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferSeo from '~components/mixins/ofer-seo.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'
import OferNotExists from '~components/ofer-not-exists.vue'
import ShareButtons from '~components/share-buttons.vue'
import OferExpand from '~components/ofer-expand.vue'

// asyncData does not have acces to 'this' reference
var urlReq = '/api/stores/'

export default {
  mixins: [OferPaths, OferCommon, OferSeo],
  data () {
    return {
      urlReq: urlReq,
      info: {},
      expanded: false,
      notExistTitle: 'La tienda no existe. Te recomendamos verificar la url.'
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq + params.id)
    return Object.assign({ path: route.path, id: params.id }, data)
  },
  created () {
    // data.info.description = `Descubre las mejores ofertas y promociones de ${data.info.name} en Ofertadeo. Descuentos, promociones y ofertas en ${data.info.name} ${OferCommon.methods.getDate('YYYY')}. ❤ ¡Ahorra ya!`
    if (this.exists(this.seo) && this.exists(this.info)) {
      this.seo = this.getSeoData(this.seo, this.info)
      this.seo = this.getDefaultsForSeo(this.seo, this.info)
      this.info.h1 = this.seo.h1
      this.info.description = this.seo.description
      this.info.img_alt = `Ofertas ${this.info.name}`
    }
  },
  components: {
    OferContent,
    OferContainer,
    OferItem,
    OferMoreItems,
    OferHeaderInfo,
    OferNotExists,
    OferCommon,
    OferSeo,
    ShareButtons,
    OferExpand
  },
  methods: {
    changeExpanded (eventData) {
      this.expanded = eventData.expanded
    },
    getMetas (params) {
      if (this.exists(params.info) && this.exists(params.seo)) {
        let metas = [
          { hid: 'title', name: 'title', content: params.seo.meta_title },
          { hid: 'description', name: 'description', content: params.seo.meta_description },
          { hid: 'og:title', property: 'og:title', content: params.seo.meta_title },
          { hid: 'og:description', property: 'og:description', content: params.seo.meta_description },
          { hid: 'og:url', property: 'og:url', content: params.url },
          { hid: 'og:image', property: 'og:image', content: params.info.img },
          { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: params.info.img },
          { hid: 'og:locale', property: 'og:locale', content: 'es_MX' },
          { hid: 'og:type', property: 'og:type', content: 'website' },
          { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' }
        ]

        if (params.info.img_data) {
          metas.push(
            { hid: 'og:image:width', property: 'og:image:width', content: params.info.img_data.width },
            { hid: 'og:image:height', property: 'og:image:height', content: params.info.img_data.height },
            { hid: 'og:image:type', property: 'og:image:type', content: params.info.img_data.type }
          )
        }

        return metas
      }

      return []
    }
  },
  head () {
    let host = this.config.host
    let urlStoreList = `${host}${this.config.routes.storeList}`
    let url = `${urlStoreList}/${this.id}`

    return (this.info && this.info.name) ? {
      title: this.seo.title,
      meta: this.getMetas({ seo: this.seo, info: this.info, url: url }),
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
                },
                {
                  '@type': 'ListItem',
                  'position': 3,
                  'item': {
                    '@id': url,
                    'name': this.info.name
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
