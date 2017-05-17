<template>
<ofer-content :breadcrumbs="breadcrumbs">
  <template slot="items">
    <v-col class="pa-3" xs12 sm12 md9 lg9 xl9 v-for="(item,i) in items" :key="i">
      <div class="promotion">
        <h1 class="display-1">{{item.title}}</h1>
        <div class="thumbnail">
          <img :src="item.thumbnail" class="mr-3" alt="">
        </div>
        <div class="promotion-content" v-html="item.content"></div>
      </div>
    </v-col>
  </template>
</ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get('/api/promotions/' + params.id)
    return Object.assign({
      breadcrumbs: [
        { text: data.routes.stores.split('/')[1], disabled: false, href: data.routes.stores },
        { text: params.id, disabled: true }
      ],
      current: params.id
    },
    data)
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
