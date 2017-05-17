<template>
  <ofer-content :routes="routes" :items="catalogs" />
</template>

<script>
import axios from '~plugins/axios'
import OferToolbar from '~components/ofer-toolbar.vue'
import OferSidebar from '~components/ofer-sidebar.vue'
import OferContent from '~components/ofer-content.vue'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/home')
    return Object.assign({ categoriesOpened: false, storesOpened: false }, data)
  },
  head () {
    return {
      title: 'Ofertadeo'
    }
  },
  computed: {
    openedCats () { return this.$store.state.openedCats },
    openedStores () { return this.$store.state.openedStores }
  },
  components: {
    OferContent
  }
}
</script>
