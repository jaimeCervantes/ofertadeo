<template>
  <ofer-content :items="items" :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <div v-if="info" class="content__info-section">
        <div class="img-container">
          <img :src="info.img" :alt="info.img_alt" :title="info.img_title" />  
        </div>
        <div>
          <h1 class="title content__title">{{info.name}}</h1>
          <v-btn tag="a" :href="info.url_site" target="_blank" light primary>Visitar</v-btn>
        </div>
      </div>
      <h2 class="title">Lista de ofertas, promociones y descuentos en {{info.name}}</h2>
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
    let { data } = await axios.get('/api/stores/' + params.id)
    return Object.assign({
      path: route.path
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
