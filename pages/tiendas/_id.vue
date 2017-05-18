<template>
  <ofer-content :items="items" :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <div v-if="info" class="content__info-section">
        <img height="56" width="56":src="info.img" :alt="info.img_alt" :title="info.img_title" />
        <h2 class="title content__title">{{info.name}}</h2>
      </div>
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
