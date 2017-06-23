<template>
  <ofer-content>
    <template slot="content">
      <v-row v-if="exists(item)">
        <v-col class="mt-3 mb-3" xs12 sm12 md9 lg9 xl9>
          <div class="promotion">
            <p class="promotion__data">
              <nuxt-link :to="createLinkToCategories()">
                <span class="promotion__category" v-text="arrayToString(item.categories)"></span>
              </nuxt-link>
               | 
              <nuxt-link :to="$store.state.routes.storeList + '/' + item.store_id || item.stores[0]">
                Ofertas y descuentos de
                <span class="promotion__store">{{arrayToString(item.stores || [item.store_id])}}</span>
              </nuxt-link>
            </p>
            <h1 class="title">{{item.name}}</h1>
            <div class="thumbnail ml-3">
              <img :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title">
              <v-btn tag="a" :href="item.url" rel="nofollow" target="_blank" light primary class="btn--light-flat-pressed z-depth-2">Ver</v-btn>
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
  head () {
    return {
      title: `${this.item.name} | Ofertadeo`
    }
  },
  components: {
    OferContent,
    OferCommon,
    OferNotExists
  }
}
</script>

<style lang="stylus" scoped>
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
