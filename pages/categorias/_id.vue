<template>
  <v-container grid-list-md fluid>
    <header>
      <ofer-header-info v-if="exists(info)" :info="seo">
        <template slot="social-network">
          <share-buttons
            :url="`${config.host}${config.routes.categoriesList}/${id}`"
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
    <section v-if="exists(items)">
      <h2>{{seo.h2}}</h2>
      <v-layout row wrap>
        <v-flex xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="config.routes.main + '/' + item.slug" :position="i"></ofer-item>
        </v-flex>
      </v-layout>
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
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
    <section v-else>
      <ofer-not-exists v-bind:title="notExistTitle"></ofer-not-exists>
    </section>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import OferHeaderInfo from '~/components/ofer-header-info.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferItem from '~/components/ofer-item.vue'
import OferMoreItems from '~/components/ofer-more-items.vue'
import OferNotExists from '~/components/ofer-not-exists.vue'
import ShareButtons from '~/components/share-buttons.vue'
import OferExpand from '~/components/ofer-expand.vue'
import OferSeo from '~/components/mixins/ofer-seo.vue'

// asyncData does not have acces to 'this' reference
var urlReq = OferCommon.props.config.default().host + '/api/categories/'

export default {
  mixins: [OferPaths, OferCommon, OferSeo],
  data () {
    return {
      urlReq: urlReq,
      info: {},
      expanded: false,
      notExistTitle: 'La categoría no existe. Te recomendamos verificar la url.'
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq + params.id)
    return Object.assign({
      path: route.path,
      id: params.id
    },
    data)
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
    ShareButtons,
    OferExpand,
    OferSeo
  },
  methods: {
    changeExpanded (eventData) {
      this.expanded = eventData.expanded
    }
  },
  head () {
    let host = this.config.host
    let urlCategories = `${host}${this.config.routes.categoriesList}`
    let url = `${urlCategories}/${this.id}`

    let metas = [
      { hid: 'title', name: 'title', content: this.seo.meta_title },
      { hid: 'description', name: 'description', content: this.sliceTextFromHtmlByWord(this.info.content, this.config.seo.description.wordsLimit) },
      { hid: 'og:title', property: 'og:title', content: this.seo.meta_title },
      { hid: 'og:description', property: 'og:description', content: this.sliceTextFromHtmlByWord(this.info.content, this.config.seo.description.wordsLimit) },
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
        { rel: 'canonical', href: `${this.config.host}${this.config.routes.categoriesList}/${this.id}` }
      ]
    } : { title: this.notExistTitle, meta: [ { name: 'robots', content: 'noindex,follow' } ] }
  }
}
</script>
<style lang="stylus" scoped> 
  .expand {
    margin-top: 0.5rem;
  }
</style>
