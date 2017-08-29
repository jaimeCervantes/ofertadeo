<template>
  <ofer-content :breadcrumbs="exists(info) ? breadcrumbs : null">
    <template slot="info-section" v-if="exists(info)">
      <ofer-header-info :info="info" rel="nofollow">
        <template slot="social-network">
          <share-buttons
            :url="`${config.host}${config.routes.storeList}/${id}`"
            :media="info.thumbnail" twitter-user="ofertadeo" :title="info.name"
          ></share-buttons>
        </template>
      </ofer-header-info>
    </template> 
    <template slot="content">
      <h2 v-if="exists(info)">Lista de ofertas y promociones {{info.name}}</h2>
      <v-row v-if="exists(info)" id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <v-col class="mt-3 mb-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" type="store" :to-link="config.routes.main + '/' + item.slug" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
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
      <ofer-not-exists v-if="!exists(info)" v-bind:title="notExistTitle"></ofer-not-exists>
    </template>
    <template slot="more-content" v-if="exists(info)">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
    </template>
    <template slot="content-footer" v-if="exists(info)">
      <v-divider class="section-divider"></v-divider>
      <section class="after-items">
        <h2 v-text="`Promociones y descuentos ${info.name}`"></h2>
        <div v-html="info.content"></div>
      </section>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferHeaderInfo from '~components/ofer-header-info.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'
import OferNotExists from '~components/ofer-not-exists.vue'
import ShareButtons from '~components/share-buttons.vue'

// asyncData does not have acces to 'this' reference
var urlReq = '/api/stores/'

export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return {
      urlReq: urlReq,
      info: {},
      notExistTitle: 'La tienda no existe. Te recomendamos verificar la url.'
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq + params.id)
    if (data && data.info) {
      data.info.description = `Descubre las mejores ofertas y promociones de ${data.info.name} en Ofertadeo. Descuentos, promociones y ofertas en ${data.info.name} ${OferCommon.methods.getDate('YYYY')}. ❤ ¡Ahorra ya!`
      data.info.title_front = `${data.info.name} - Ofertas, promociones y descuentos`
    }

    return Object.assign({ path: route.path, id: params.id }, data)
  },
  components: {
    OferContent,
    OferItem,
    OferMoreItems,
    OferHeaderInfo,
    OferNotExists,
    OferCommon,
    ShareButtons
  },
  head () {
    return {
      title: `${this.info.name} | Ofertadeo`
    }
  }
}
</script>
