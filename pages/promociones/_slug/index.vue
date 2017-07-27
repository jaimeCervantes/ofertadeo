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
              <social-sharing :url="`${$store.state.host}${$store.state.routes.stores}/${item.slug}`" inline-template :media="item.img" twitter-user="ofertadeo" :title="item.title">
                <div id="social-sharing">
                  <network network="facebook">
                    <v-btn>
                      <img src="/icons/facebook.svg" alt="Compartir en facebook" title="Compartir">
                    </v-btn>
                  </network>
                  <network network="twitter">
                    <v-btn>
                      <img src="/icons/twitter.svg" alt="Compartir en Twitter+" title="Compartir">
                    </v-btn>
                  </network>
                  <network network="googleplus">
                    <v-btn>
                      <img src="/icons/google-plus.svg" alt="Compartir en Google+" title="Compartir">
                    </v-btn>
                  </network>
                  <network network="pinterest">
                    <v-btn>
                      <img src="/icons/pinterest.svg" alt="Compartir en Pinterest+" title="Compartir">
                    </v-btn>
                  </network>
                </div>
              </social-sharing>
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
import Vue from 'vue'
import SocialSharing from 'vue-social-sharing'

Vue.use(SocialSharing)

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
    let host = this.$store.state.host
    let urlLogo = `${host}/logo.png`
    let urlPromociones = `${this.$store.state.host}${this.$store.state.routes.stores}`
    let url = `${urlPromociones}/${this.item.slug}`
    let description = `${this.getTextFromHtml(this.item.content).slice(0, 150)}...`

    let metas = [
      { hid: 'title', name: 'title', content: `${this.item.name} | Ofertadeo` },
      { hid: 'description', name: 'description', content: description },
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
      { hid: 'og:locale', property: 'og:locale', content: 'es_MX' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' }
    ]

    if (this.item.img_data) {
      metas.push(
        { hid: 'og:image:width', property: 'og:image:width', content: this.item.img_data.width },
        { hid: 'og:image:height', property: 'og:image:height', content: this.item.img_data.height },
        { hid: 'og:image:type', property: 'og:image:type', content: this.item.img_data.type }
      )
    }
    return this.exists(this.item) ? {
      title: `${this.item.name} | Ofertadeo`,
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
                  '@id': urlPromociones,
                  'name': 'Promociones'
                }
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'item': {
                  '@id': url,
                  'name': 'Promociones'
                }
              }]
            }),
          type: 'application/ld+json'
        },
        {
          innerHTML: JSON.stringify(
            {
              '@context': 'http://schema.org',
              '@type': 'Article',
              'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': url
              },
              'headline': this.item.name,
              'image': {
                '@type': 'ImageObject',
                'url': this.item.thumbnail,
                'height': this.item.img_data.height,
                'width': this.item.img_data.width
              },
              'datePublished': this.item.published,
              'dateModified': this.item.modified,
              'author': {
                '@type': 'Organization',
                'name': 'Ofertadeo'
              },
              'publisher': {
                '@type': 'Organization',
                'name': 'Ofertadeo',
                'logo': {
                  '@type': 'ImageObject',
                  'url': urlLogo,
                  'width': 200,
                  'height': 199
                }
              },
              'description': description
            }),
          type: 'application/ld+json'
        }
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

<style lang="stylus">
  #social-sharing {
    .btn {
      width:30px;
      min-width:30px;
      min-height:30px;
      padding:0;
      background-color: #fff;
      border-radius: 0;
      img {
        width: 30px;
      }
    }
  }
</style>
