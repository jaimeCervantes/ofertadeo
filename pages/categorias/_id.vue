<template>
  <ofer-container :breadcrumbs="exists(info) ? breadcrumbs : null">
    <template slot="info-section" v-if="exists(info)">
      <ofer-header-info :info="info">
      <template slot="social-network">
        <share-buttons
          :url="`${config.host}${config.routes.categoriesList}/${id}`"
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
        <v-divider class="section-divider"></v-divider>
        <div class="middle-content">
          <h2>Ofertas de {{info.name}}</h2>
          <v-row id="main-list" itemscope itemtype="http://schema.org/ItemList">
            <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
              <ofer-item :item="item" :to-link="config.routes.main + '/' + item.slug" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i"></ofer-item>
            </v-col>
          </v-row>
        </div>
        <div>
          <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
        </div>
      </div>
    </template>
    <template slot="content" v-else>
      <ofer-not-exists v-bind:title="notExistTitle"></ofer-not-exists>
    </template>
  </ofer-container>
</template>

<script>
import axios from '~plugins/axios'
import OferContainer from '~components/ofer-container.vue'
import OferHeaderInfo from '~components/ofer-header-info.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'
import OferNotExists from '~components/ofer-not-exists.vue'
import ShareButtons from '~components/share-buttons.vue'
import OferExpand from '~components/ofer-expand.vue'

// asyncData does not have acces to 'this' reference
var urlReq = '/api/categories/'

export default {
  mixins: [OferPaths, OferCommon],
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
    if (data && data.info) {
      data.info.description = `Descubre las mejores ofertas y promociones de ${data.info.name} en ofertadeo. Descuentos, promociones y ofertas en ${data.info.name}. ✓ ¡Ahorra dinero ya!`
      data.info.h1 = data.info.name
      data.info.img_alt = `Ofertas ${data.info.name}`
    }

    return Object.assign({
      path: route.path,
      id: params.id
    },
    data)
  },
  components: {
    OferContainer,
    OferItem,
    OferMoreItems,
    OferHeaderInfo,
    OferNotExists,
    OferCommon,
    ShareButtons,
    OferExpand
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
      { hid: 'title', name: 'title', content: `Descuentos, promociones y ofertas en ${this.info.name}` },
      { hid: 'description', name: 'description', content: this.sliceTextFromHtmlByWord(this.info.content, this.config.seo.description.wordsLimit) },
      { hid: 'og:title', property: 'og:title', content: `Descuentos, promociones y ofertas en ${this.info.name}` },
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
      title: `Descuentos, promociones y ofertas en ${this.info.name}`,
      meta: metas,
      link: [
        { rel: 'canonical', href: `${this.config.host}${this.config.routes.categoriesList}/${this.id}` }
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
