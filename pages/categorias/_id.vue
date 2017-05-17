<template>
  <ofer-content :items="items" :breadcrumbs="breadcrumbs"/>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'

export default {
  mixins: [OferPaths],
  async asyncData (context) {
    let { data } = await axios.get('/api/categories/' + context.params.id)
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
    OferContent
  }
}
</script>
