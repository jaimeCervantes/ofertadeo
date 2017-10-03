<template>
  <ofer-container>
    <article v-if="exists(item)">
      <header>
        <p class="promotion-data">
          <a class="taxonomy" :href="config.host + config.routes.categories + '/' + category._id" v-for="(category,i) in item.categories" :key="i">
            <span class="promotion-data__category" v-text="category.name"></span>
            </a>
          </p>
          <h1>{{item.name}}</h1>
      </header>

      <v-divider class="section-divider"></v-divider>

      <v-row>
        <v-col xs12 sm12 md9 lg9 xl9>
          <section class="promotion">
            <div class="thumbnail ml-3">
              <a :href="item.img" target="_blank"><img :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title"></a>
              <v-btn tag="a" :href="item.url" rel="nofollow noopener" target="_blank" light primary class="btn--light-flat-pressed z-depth-2">Ir a la oferta</v-btn>
              <share-buttons :url="`${config.host}${config.routes.main}/${item.slug}`"  :media="item.img" twitter-user="ofertadeo" :title="item.name">
              ></share-buttons>
            </div>
            <div class="promotion-content" v-html="item.content"></div>
            <p class="promotion-data">
            <v-btn outline class="taxonomy" tag="a" :to="config.host + config.routes.storeList + '/' + item.stores[0]._id">Ofertas y promociones en {{item.stores[0].name}}
            </v-btn>
          </p>
          </section>
        </v-col>
      </v-row>

    </article>
    <ofer-not-exists v-else v-bind:title="notExistTitle"></ofer-not-exists>
  </ofer-container>
</template>

<script>
import axios from '~plugins/axios'
import OferContainer from '~components/ofer-container.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferNotExists from '~components/ofer-not-exists.vue'
import ShareButtons from '~components/share-buttons.vue'

export default {
  mixins: [OferCommon],
  data () {
    return {
      item: {},
      storesOffer: [
        { _id: 'amazon', name: 'Amazon', slug: 'amazon' },
        { _id: 'costco', name: 'Costco', slug: 'costco' },
        { _id: 'sears', name: 'Sears', slug: 'sears' },
        { _id: 'sanborns', name: 'Sanborns', slug: 'sanborns' },
        { _id: 'suburbia', name: 'Suburbia', slug: 'suburbia' },
        { _id: 'cinepolis', name: 'Cinepolis', slug: 'cinepolis' },
        { _id: 'palacio-de-hierro', name: 'Palacio de Hierro', slug: 'palacio-de-hierro' },
        { _id: 'cyamoda', name: 'C&A', slug: 'cyamoda' },
        { _id: 'bodega-alianza', name: 'Bodega Alianza', slug: 'bodega-alianza' }
      ],
      notExistTitle: 'La oferta no existe. Te recomendamos verificar la url.'
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/promotions/' + params.slug)
    return Object.assign({
      path: route.path,
      slug: params.slug
    },
    data)
  },
  components: {
    OferContainer,
    OferCommon,
    OferNotExists,
    ShareButtons
  },
  methods: {
    createMetas () {
      let description = this.sliceTextFromHtml(this.item.content, this.config.seo.description.charsLimit)
      let metas = [
        { hid: 'title', name: 'title', content: `${this.item.name}` },
        { hid: 'description', name: 'description', content: this.meta_description || description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${this.item.name}` },
        { hid: 'og:description', property: 'og:description', content: this.meta_description || description },
        { hid: 'og:url', property: 'og:url', content: `${this.config.host}${this.config.routes.main}/${this.item.slug}` },
        { hid: 'article:publisher', property: 'article:publisher', content: this.config.publisher.fb },
        { hid: 'article:tag', property: 'article:tag', content: this.item.stores[0].name },
        { hid: 'article:section', property: 'article:section', content: this.item.categories[0].name },
        { hid: 'article:published_time', property: 'article:published_time', content: this.getISODateStr(this.item.modified) },
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

      return metas
    }
  },
  head () {
    let host = this.config.host
    let urlLogo = `${host}/favicons/apple-touch-icon-60x60.png`
    let urlPromociones = `${this.config.host}${this.config.routes.main}`
    let url = `${urlPromociones}/${this.item.slug}`
    let content = this.sliceTextFromHtml(this.item.content)
    let description = this.sliceTextFromHtmlByWord(this.item.content, this.config.seo.description.wordsLimit)

    return this.exists(this.item) ? {
      title: `${this.item.name} | Ofertadeo`,
      meta: this.createMetas(),
      link: [
        { rel: 'canonical', href: url }
      ],
      script: [
        {
          innerHTML: JSON.stringify(
            {
              '@context': 'http://schema.org',
              '@type': 'Article',
              'mainEntityOfPage': url,
              'headline': this.item.name,
              'image': {
                '@type': 'ImageObject',
                'url': this.item.img,
                'height': this.item.img_data && this.item.img_data.height ? this.item.img_data.height : 600,
                'width': this.item.img_data && this.item.img_data.width ? this.item.img_data.width : 600
              },
              'datePublished': this.getISODateStr(this.item.published),
              'dateModified': this.getISODateStr(this.item.modified),
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
                  'width': 60,
                  'height': 60
                }
              },
              'description': this.meta_description || description,
              'articleBody': content
            }),
          type: 'application/ld+json'
        }
      ]
    } : { title: this.notExistTitle, meta: [ { name: 'robots', content: 'noindex,follow' } ] }
  }
}
</script>

<style lang="stylus" scoped>
h1 {
  margin-bottom: 0.5rem;
}

.promotion {
  padding-top: 0.5rem;
  .thumbnail {
    float:right;
    text-align:center;
    img {
      display: block;
      max-width: 300px;
      margin: 0 auto;
      @media(max-width: 600px) {
        max-width:200px;
      }
    }
  }
}

p.promotion-data {
  font-size: 1rem;
  :first-letter {
    text-transform: uppercase;
  }

  .taxonomy {
    margin-right: 10px;
    text-transform: uppercase;
    color: #888;
    .promotion-data__store {
      display: inline;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
}

.promotion  {
  .promotion-data {
    .taxonomy {
      color: #1976d2;
      font-weight:bold;
      text-transform:initial;
      margin-right:initial;
      margin-left: 0;
      margin-top: 0;
      &:hover, :visited {
        text-decoration: none;
      }
    }
  }
}
</style>
