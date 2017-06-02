<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md9 lg9 xl9>
          <div class="promotion">
            <p class="promotion__data">
              <nuxt-link :to="$store.state.routes.categories + '/' + item.categories[0]">
                <span class="promotion__category" v-text="getCategories()"></span>
              </nuxt-link>
               | 
              <nuxt-link :to="$store.state.routes.storeList + '/' + item.store_id">
                Ofertas y descuentos de
                <span class="promotion__store">{{getStores()}}</span>
              </nuxt-link>
            </p>
            <h1 class="title">{{item.name}}</h1>
            <div class="thumbnail ml-3">
              <img :src="item.thumbnail" :alt="item.name" :title="item.name">
              <v-btn tag="a" :href="item.url" rel="nofollow" target="_blank" light primary class="btn--light-flat-pressed z-depth-2">Ver</v-btn>
            </div>
            <div class="promotion-content" v-html="item.content"></div>
          </div>
        </v-col>
      </v-row>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferCommon from '~components/mixins/ofer-common.vue'

export default {
  mixins: [OferCommon],
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/promotions/' + params.id)
    return data
  },
  methods: {
    getStores (stores) {
      stores = stores || this.item.store_id
      return stores.split('-').join(' ')
    },
    getCategories (categories) {
      categories = categories || this.item.categories
      return categories.reduce(function (prev, curr) {
        return prev.split('-').join(' ') + curr.split('-').join(' ')
      }, '')
    }
  },
  head () {
    return {
      title: `${this.item.name}`,
      meta: [
        { hid: 'title', name: 'title', content: `${this.item.name}` },
        { hid: 'description', name: 'description', content: `${this.getTextFromHtml(this.item.content).slice(0, 150)}...` },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${this.item.name}` },
        { hid: 'og:description', property: 'og:description', content: `${this.getTextFromHtml(this.item.content).slice(0, 150)}...` },
        { hid: 'og:url', property: 'og:url', content: `${this.$store.state.host}${this.$store.state.routes.main}/${this.item.slug}` },
        { hid: 'article:publisher', property: 'article:publisher', content: this.$store.state.publisher.fb },
        { hid: 'article:tag', property: 'article:tag', content: this.getStores() },
        { hid: 'article:section', property: 'article:section', content: this.getCategories() },
        { hid: 'article:published_time', property: 'article:published_time', content: this.item.modified },
        { hid: 'og:image', property: 'og:image', content: this.item.img },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: this.item.img }
      ],
      link: [
        { rel: 'canonical', href: `${this.$store.state.host}${this.$store.state.routes.stores}/${this.item.slug}` }
      ]
    }
  },
  components: {
    OferContent,
    OferCommon
  }
}
</script>

<style lang="scss" scoped>
.promotion {
  .thumbnail {
    float:right;
    img {
      display: block;
    }
  }
  p.promotion__data {
    color: #888;
    font-size: 1rem;
    text-transform: uppercase
    :first-letter {
      text-transform: uppercase;
    }

    a {
      color: #888;
    }

    .promotion__store {
      display: inline;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
}
</style>
