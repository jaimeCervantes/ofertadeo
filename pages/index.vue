<template>
  <ofer-content :items="items" />
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/home')
    return data
  },
  head () {
    return {
      title: 'Ofertadeo'
    }
  },
  components: {
    OferContent
  }
}
</script>
