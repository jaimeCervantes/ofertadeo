<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md9 lg9 xl9>
          <div class="promotion">
            <p class="promotion__data">
              <nuxt-link :to="$store.state.routes.categories + '/' + item.categories[0]">
                <span class="promotion__category" v-text="item.categories[0].split('-').join(' ')"></span>
              </nuxt-link>
              <nuxt-link :to="$store.state.routes.storeList + '/' + item.store_id">
                Ofertas, promociones y descuentos de
                <span class="promotion__store">{{item.store_id.split('-').join(' ')}}</span>
              </nuxt-link>
            </p>
            <h1 class="title">{{item.name}}</h1>
            <div class="thumbnail ml-3">
              <img :src="item.thumbnail" alt="">
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

export default {
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/promotions/' + params.id)
    return data
  },
  head () {
    return {
      title: 'Ofertadeo Tienda'
    }
  },
  components: {
    OferContent
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
