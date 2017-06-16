<template>
  <v-content>
    <v-container fluid>
      <ofer-not-exists>
        <h1 class="headline" v-if="error.statusCode === 404">Lo que buscas no existe, verifica la url o alimenta al marranito con una moneda.</h1>
        <h1 class="headline" v-if="error.statusCode === 500">Nuestro marranito tiene problemas, alimentalo con alguna moneda.</h1>
        <nuxt-link class="button" to="/">Ir al inicio</nuxt-link>
      </ofer-not-exists>
    </v-container>
  </v-content>
</template>
<script>
import OferNotExists from '~components/ofer-not-exists.vue'

export default {
  props: ['error'],
  components: {
    OferNotExists
  },
  head () {
    return {
      meta: [
        { name: 'robots', content: 'noindex,follow' }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
  .content {
    text-align:center;
  }
</style>
