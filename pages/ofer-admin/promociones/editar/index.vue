<template>
  <div>
    <header>
      <h1>Ofertas, promociones y descuentos en México</h1>
      <p>Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad como Walmart, Chedraui, Sams Club, Liverpool, Soriana, Cinepolis, Cinemex y muchas tiendas mas.  ✓ ¡Ahorra con ofertadeo!</p>
    </header>
    <section>
     <h2>Lista de ofertas y promociones en México</h2>
    </section>

      <v-layout row wrap id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <link itemprop="url" :href="config.host" />
        <v-flex xs6 sm4 md3 lg2 xl2 v-for="(item,i) in items" :key="i" >
          <ofer-item :item="item" :to-link="`${config.routes.main}/${item.slug}`" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
            <template slot="content">
              <div class="pl-2 pr-2">
                <v-btn small primary dark :href="`${config.host}${config.routes.admin}${config.routes.main}/editar/${item.slug}`">Editar</v-btn>
              </div>
            </template>
          </ofer-item>
        </v-flex>
      </v-layout>
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq" txt="Cargar más ofertas"></ofer-more-items>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'
import OferMoreItems from '~/components/ofer-more-items.vue'

var urlReq = OferCommon.props.config.default().host + '/api/home'

export default {
  layout: 'admin',
  mixins: [OferCommon],
  data () {
    return { urlReq: urlReq }
  },
  async asyncData () {
    let { data } = await axios.get(urlReq)
    return data
  },
  components: {
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
