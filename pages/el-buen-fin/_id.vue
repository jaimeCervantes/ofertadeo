<template>
  <div>
    <v-container grid-list-md fluid v-if="exists(info)">
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
        <ofer-header-info :info="seo" rel="nofollow noopener">
          <template slot="social-network">
            <share-buttons
              :url="`${config.host}${config.routes.elBuenFin}/${id}`"
              :media="info.thumbnail" twitter-user="ofertadeo" :title="info.name"
            ></share-buttons>
          </template>
        </ofer-header-info>
        <ofer-expand
          :content="info.content"
          :expanded="expanded"
          @on-expanded="changeExpanded">
        </ofer-expand>
      </header>
      <v-divider></v-divider>
      <section>
        <h2 v-html="seo.h2"></h2>
        <v-layout row wrapid="main-list">
          <v-flex xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
            <ofer-item :item="item" type="store" :to-link="config.routes.main + '/' + item.slug" :position="i"></ofer-item>
          </v-flex>
        </v-layout>
        <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
      </section>
    </v-container>
    <v-container grid-list-md fluid v-else>
      <ofer-not-exists v-if="!exists(info)" v-bind:title="notExistTitle"></ofer-not-exists>
    </v-container>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import OferHeaderInfo from '~/components/ofer-header-info.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferSeo from '~/components/mixins/ofer-seo.vue'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferItem from '~/components/ofer-item.vue'
import OferMoreItems from '~/components/ofer-more-items.vue'
import OferNotExists from '~/components/ofer-not-exists.vue'
import ShareButtons from '~/components/share-buttons.vue'
import OferExpand from '~/components/ofer-expand.vue'

// asyncData does not have acces to 'this' reference
var urlReq = OferCommon.props.config.default().host + '/api/el-buen-fin/stores/'

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
    if (this.exists(this.seo) && this.exists(this.info)) {
      this.seo = this.getSeoData(this.seo, this.info)
      this.seo = this.mergeSeoWith(this.seo, this.info)
    }
  },
  components: {
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
          { hid: 'title', name: 'title', content: params.seo.title },
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
    let urlStoreList = `${host}${this.config.routes.elBuenFin}`
    let url = `${urlStoreList}/${this.id}`

    return (this.info && this.info.name) ? {
      title: this.seo ? this.seo.title : this.info.title,
      meta: this.getMetas({ seo: this.seo, info: this.info, url: url }),
      link: [
        { rel: 'canonical', href: url }
      ]
    } : { title: this.notExistTitle, meta: [ { name: 'robots', content: 'noindex,follow' } ] }
  }
}
</script>
<style lang="stylus" scoped>
  .info-content {
    margin-bottom: 0.6rem;
  }
  
  .divider {
    background-color: #DA251D;
  }
  
  .expand, section {
    margin-top: 0.5rem;
  }
</style>
<style>
  h1 {
    background-color: #DA251D;
    padding: 1rem;
    color: white;
  }
</style>
