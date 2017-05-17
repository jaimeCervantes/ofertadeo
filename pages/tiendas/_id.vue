<template>
  <ofer-content :items="catalogs" :breadcrumbs="breadcrumbs"/>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get('/api/stores/' + params.id)
    return Object.assign({
      breadcrumbs: [{ text: data.routes.storeList.split('/')[1], disabled: false, href: data.routes.storeList }, { text: params.id, disabled: true }],
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
