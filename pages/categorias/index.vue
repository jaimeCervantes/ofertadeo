<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="content">
      <v-row>
        <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="$store.state.routes.categories + '/' + item._id"></ofer-item>
        </v-col>
      </v-row>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferItem from '~components/ofer-item.vue'

export default {
  mixins: [OferPaths],
  async asyncData (context) {
    let { data } = await axios.get('/api/categories')
    return Object.assign({
      path: context.route.path
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Categorías'
    }
  },
  components: {
    OferContent,
    OferItem
  }
}
</script>
