<template>
  <ofer-content :items="catalogs" :breadcrumbs="breadcrumbs"/>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get('/api/categories/' + params.id)
    return Object.assign({
      breadcrumbs: [
        { text: data.routes.categories.split('/')[1], href: data.routes.categories, disabled: false, target: '_self' },
        { text: params.id.split('-').join(' '), disabled: true }
      ],
      current: params.id
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
