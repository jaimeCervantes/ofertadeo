<template>
  <ofer-content>
    <template slot="info-section" v-if="exists(item)">
      <p class="promotion-data">
        <nuxt-link :to="$store.state.routes.storeList + '/' + (item.store_id || item.stores[0])">
          Ofertas 
          <span class="promotion-data__store">{{arrayToString(item.stores || [item.store_id])}}</span>
        </nuxt-link>
        |
        <nuxt-link :to="createLinkToCategories()">
          <span class="promotion__category" v-text="arrayToString(item.categories)"></span>
        </nuxt-link>
      </p>
      <h1>{{item.name}}</h1>      
    </template>
    <template slot="content">
      <v-row v-if="exists(item)">
        <v-col class="mt-3 mb-3" xs12 sm12 md9 lg9 xl9>
          <div class="promotion">
            <div class="thumbnail ml-3">
              <a :href="item.img" target="_blank"><img :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title"></a>
              <v-btn tag="a" :href="item.url" rel="nofollow" target="_blank" light primary class="btn--light-flat-pressed z-depth-2">Ir a la oferta</v-btn>
            </div>
            <div class="promotion-content" v-html="item.content"></div>
          </div>
        </v-col>
      </v-row>
      <ofer-not-exists v-if="!exists(item)" v-bind:title="notExistTitle"></ofer-not-exists>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferNotExists from '~components/ofer-not-exists.vue'

export default {
  mixins: [OferCommon],
  data () {
    return { item: {}, notExistTitle: 'La oferta no existe. Te recomendamos verificar la url.' }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/promotions/' + params.slug)
    return Object.assign({
      path: route.path,
      slug: params.slug
    },
    data)
  },
  methods: {
    createLinkToCategories () {
      return this.$store.state.routes.categories + '/' + (this.item.categories && this.item.categories[0])
    }
  },
  components: {
    OferContent,
    OferCommon,
    OferNotExists
  },
  head () {
    return this.exists(this.item) ? {
      title: `${this.item.name} | Ofertadeo`,
      meta: [
        { hid: 'title', name: 'title', content: `${this.item.name} | Ofertadeo` },
        { hid: 'description', name: 'description', content: `${this.getTextFromHtml(this.item.content).slice(0, 150)}...` },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${this.item.name}` },
        { hid: 'og:description', property: 'og:description', content: `${this.getTextFromHtml(this.item.content).slice(0, 150)}...` },
        { hid: 'og:url', property: 'og:url', content: `${this.$store.state.host}${this.$store.state.routes.main}/${this.item.slug}` },
        { hid: 'article:publisher', property: 'article:publisher', content: this.$store.state.publisher.fb },
        { hid: 'article:tag', property: 'article:tag', content: this.arrayToString(this.item.stores || [this.item.store_id]) },
        { hid: 'article:section', property: 'article:section', content: this.arrayToString(this.categories) },
        { hid: 'article:published_time', property: 'article:published_time', content: this.item.modified },
        { hid: 'og:image', property: 'og:image', content: this.item.img },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: this.item.img },
        { hid: 'og:locale', property: 'og:locale', content: 'es-MX' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' }
      ],
      link: [
        { rel: 'canonical', href: `${this.$store.state.host}${this.$store.state.routes.stores}/${this.item.slug}` }
      ]
    } : { title: this.notExistTitle, meta: [ { name: 'robots', content: 'noindex,follow' } ] }
  }
}
</script>

<style lang="stylus" scoped>
.promotion {
  .thumbnail {
    float:right;
    text-align:center;
    img {
      display: block;
      max-width: 200px;
      margin: 0 auto;
    }
  }
}

p.promotion-data {
  color: #888;
  font-size: 1rem;
  text-transform: uppercase
  :first-letter {
    text-transform: uppercase;
  }

  a {
    color: #888;
  }

  .promotion-data__store {
    display: inline;
    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
