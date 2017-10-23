<template>
  <ofer-container>
    <article v-if="exists(item)">
      <v-row>
        <v-col xs12 sm12 md9 lg9 xl9>
          <header>
            <!-- encabezado-adaptable -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-3434008864168200"
                 data-ad-slot="2635524670"
                 data-ad-format="auto"></ins>
            <script>
            (window.adsbygoogle || []).push({})
            </script>
            <h1>{{item.name}}</h1>
          </header>
          <v-divider class="section-divider"></v-divider>
          <section class="promotion">
            <div class="thumbnail ml-3">
              <a :href="item.img" target="_blank"><img :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title"></a>
              <v-btn tag="a" :href="item.url" rel="nofollow noopener" target="_blank" light primary class="btn--light-flat-pressed z-depth-2">Ir a la oferta</v-btn>
              <share-buttons :url="`${config.host}${config.routes.main}/${item.slug}`"  :media="item.img" twitter-user="ofertadeo" :title="item.name">
              ></share-buttons>
            </div>
            <div class="promotion-content" v-html="item.content"></div>
            <div class="gray">
              <p class="promotion-data">
                <a class="taxonomy" :href="config.host + config.routes.categories + '/' + category._id" v-for="(category,i) in item.categories" :key="i">
                  <span class="promotion-data__category" v-text="category.name"></span>
                </a>
              </p>
            </div>
            <p class="promotion-data">
              <v-btn outline class="taxonomy" tag="a" :to="config.host + config.routes.storeList + '/' + item.stores[0]._id">Ofertas y promociones en {{item.stores[0].name}}
              </v-btn>
            </p>
          </section>
          <!-- pie-adaptable -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-3434008864168200"
                 data-ad-slot="8124489226"
                 data-ad-format="auto"></ins>
            <script>
            (window.adsbygoogle || []).push({})
            </script>
          <section class="related-items" v-if="relatedItems.length > 0">
            <h3>Ofertas relacionadas</h3>
            <v-row id="main-list" itemscope itemtype="http://schema.org/ItemList">
              <link itemprop="url" :href="config.host" />
              <v-col class="mb-3" xs6 sm3 md3 lg3 xl3 v-for="(item,i) in relatedItems" :key="i">
                <ofer-item :item="item" :to-link="config.routes.main + '/' + item.slug" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
                </ofer-item>
              </v-col>
            </v-row>
          </section>
        </v-col>
        <v-col xs12 sm12 md3 lg3 xl3>
          <aside>
            <v-list dense>
              <v-subheader>
                <h3>Más {{config.txt.stores}}</h3>
              </v-subheader>
              <v-list-item  v-for="(store,i) in stores" :key="i">
                <v-list-tile ripple tag="a" :href="config.host + config.routes.storeList + '/' + store._id" class="list__tile">
                  <v-list-tile-content>
                    <v-list-tile-title v-text="store.name" />
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </aside>
        </v-col>
      </v-row>

    </article>
    <ofer-not-exists v-else v-bind:title="notExistTitle"></ofer-not-exists>
  </ofer-container>
</template>

<script>
import axios from '~/plugins/axios'
import OferContainer from '~/components/ofer-container.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferNotExists from '~/components/ofer-not-exists.vue'
import ShareButtons from '~/components/share-buttons.vue'
import OferItem from '~/components/ofer-item.vue'

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
    var urlReq = OferCommon.props.config.default().host + '/api/promotions/'
    let { data } = await axios.get(urlReq + params.slug)
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
    ShareButtons,
    OferItem
  },
  methods: {
    createMetas () {
      let description = this.sliceTextFromHtml(this.item.content, this.config.seo.description.charsLimit)
      let metas = [
        { hid: 'title', name: 'title', content: `${this.item.name}` },
        { hid: 'description', name: 'description', content: this.item.meta_description || description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${this.item.name}` },
        { hid: 'og:description', property: 'og:description', content: this.item.meta_description || description },
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
              'description': this.item.meta_description || description,
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
  margin-top: 0.5rem;
}

.promotion {
  padding-top: 0.5rem;
  overflow:hidden;
  .thumbnail {
    float:right;
    text-align:center;
    img {
      display: block;
      max-width: 200px;
      margin: 0 auto;
      @media(max-width: 600px) {
        max-width:150px;
      }
    }
  }

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
  
  .gray {

    .promotion-data {
      font-size: 1rem;
      
      :first-letter {
        text-transform: uppercase;
      }

      .taxonomy {
        font-weight: normal;
        margin-right: 10px;
        text-transform: uppercase;
        color: #888;
        &:hover, :visited {
          text-decoration: underline;
        }
      }
    }
  }
}


.list--dense {
  .list__item a {
    //text-decoration: underline;
    color: #1976d2;
  }
}

.related-items {
  margin-top: 1.5rem;
  clear:both;
  h3 {
    margin-bottom: 0.8rem;
  }
}
</style>
