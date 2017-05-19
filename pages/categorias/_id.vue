<template>
  <ofer-content :breadcrumbs="breadcrumbs" :info-section="info">
    <template slot="content">
      <v-row>
        <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <nuxt-link :to="$store.state.routes.stores + '/' + item.slug">
            <v-card hover raised>
              <v-card-row v-if="item.thumbnail">
                <img :src="item.thumbnail" alt="">
              </v-card-row>
              <v-card-row v-if="item.name">
                <div class="pa-2">{{item.name}}</div>
              </v-card-row>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-row>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'

export default {
  mixins: [OferPaths],
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/categories/' + params.id)
    return Object.assign({
      path: route.path
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Categorías'
    }
  },
  components: {
    OferContent
  }
}
</script>
