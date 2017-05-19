<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="content">
      <v-row>
        <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <nuxt-link :to="$store.state.routes.storeList + '/' + item._id">
            <v-card hover raised class="item">
              <v-card-row v-if="item.img" class="item__img">
                <img :src="item.img" alt="">
              </v-card-row>
              <v-card-row class="item__name" v-if="item.name">
                <div class="pl-2 pr-2">{{item.name}}</div>
              </v-card-row>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-row>
    </template>
    <template slot="more-content">
      <ofer-more-items @more-items="concatItems" :url="urlReq" ></ofer-more-items>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferMoreItems from '~components/ofer-more-items.vue'

var urlReq = '/api/stores'

export default {
  mixins: [OferPaths],
  data () {
    return { urlReq: urlReq }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq)
    return Object.assign({
      path: route.path
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Tiendas'
    }
  },
  components: {
    OferContent,
    OferMoreItems
  },
  methods: {
    concatItems (items) {
      this.items = this.items.concat(items)
    }
  }
}
</script>
