<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="items">
      <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in stores" :key="i">
        <nuxt-link :to="routes.storeList + '/' + item._id">
          <v-card hover raised>
            <v-card-row v-if="item.thumbnail" v-bind:img="item.thumbnail" height="162px"></v-card-row>
            <v-card-row v-if="item.name">
              <div class="pa-2">{{item.name}}</div>
            </v-card-row>
            <v-card-row class="actions">
              <v-btn primary>Ver</v-btn>
            </v-card-row>
          </v-card>
        </nuxt-link>
      </v-col>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get('/api/stores/' + params.id)
    return Object.assign({
      breadcrumbs: [{ text: data.routes.storeList.split('/')[1], disabled: true }]
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Tiendas'
    }
  },
  components: {
    OferContent
  }
}
</script>
