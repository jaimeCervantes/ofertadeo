<template>
  <ofer-content>
    <template slot="info-section">
      <h1 class="title">Ofertas, promociones y descuentos en México</h1>
      <p>Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad como Walmart, Chedraui, Sams Club, Liverpool, Soriana, Cinepolis, Cinemex y muchas tiendas mas.  ✓ ¡Ahorra con ofertadeo!</p>
      <h2 class="title">Lista de ofertas y promociones en México</h2>
    </template>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="config.routes.main + '/' + item.slug">
            <template slot="item-content">
              <v-card-row>
                <div class="pl-2 pr-2">
                  <v-btn small primary dark tag="a" :to="`${config.host}${config.routes.admin}${config.routes.main}/editar/${item.slug}`">Editar</v-btn>
                </div>
              </v-card-row>
            </template>
          </ofer-item>
        </v-col>
      </v-row>
    </template>
    <template slot="more-content">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq" txt="Cargar más ofertas"></ofer-more-items>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~/plugins/axios'
import OferContent from '~/components/ofer-content.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'
import OferMoreItems from '~/components/ofer-more-items.vue'

var urlReq = OferCommon.props.config.default().host + '/api/home'

export default {
  mixins: [OferCommon],
  data () {
    return { urlReq: urlReq }
  },
  async asyncData () {
    let { data } = await axios.get(urlReq)
    return data
  },
  components: {
    OferContent,
    OferItem,
    OferMoreItems,
    OferCommon
  },
  head () {
    return {
      title: 'Admin panel | Promociones',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>

<style scoped>
  .title { margin-top: 0.5rem; }
</style>
