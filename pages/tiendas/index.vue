<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="items">
      <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
        <nuxt-link :to="$store.state.routes.storeList + '/' + item._id">
          <v-card hover raised class="store">
            <v-card-row v-if="item.img" class="store__img">
              <img :src="item.img" alt="">
            </v-card-row>
            <v-card-row class="name" v-if="item.name">
              <div class="pl-2 pr-2">{{item.name}}</div>
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
import OferPaths from '~components/mixins/ofer-paths.vue'

export default {
  mixins: [OferPaths],
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/stores')
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
    OferContent
  }
}
</script>

<style lang="scss">
  .store {
    .store__img {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      display: flex;
      justify-content: center;
    }

    .name {
      justify-content: center;
    }
  }  
</style>
