<template>
<div>
  <ofer-content :items="items" :breadcrumbs="breadcrumbs"/>
  {{JSON.stringify(breadcrumbs)}}
</div>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'

export default {
  mixins: [OferPaths],
  async asyncData (context) {
    console.log(context.route)
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
