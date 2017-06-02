<template>
  <ofer-content>
    <template slot="info-section">
      <h1 class="title">Ofertas, promociones y descuentos en México</h1>
    </template>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="$store.state.routes.stores + '/' + item.slug"></ofer-item>
        </v-col>
      </v-row>
    </template>
    <template slot="more-content">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq" txt="Cargar más ofertas"></ofer-more-items>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'

var urlReq = '/api/home'

export default {
  data () {
    return { urlReq: urlReq }
  },
  async asyncData () {
    let { data } = await axios.get(urlReq)
    return data
  },
  components: {
    OferContent,
    OferItem,
    OferMoreItems
  },
  methods: {
    concatItems (items) {
      this.items = this.items.concat(items)
    }
  },
  head () {
    return {
      link: [
        { rel: 'canonical', href: `${this.$store.state.host}` }
      ]
    }
  }
}
</script>

<style scoped>
  .title { margin-top: 0.5rem; }
</style>
