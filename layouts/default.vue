<template>
  <div>
    <nuxt/>
    <ofer-footer/>
  </div>
</template>

<script>
import OferFooter from '~components/Footer.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default {
  components: {
    OferFooter
  }
}
</script>

<style lang="stylus">
  @import '`~assets/stylus/main'
</style>
