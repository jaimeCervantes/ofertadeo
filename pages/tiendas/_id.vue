<template>
  <ofer-content :breadcrumbs="breadcrumbs">
    <template slot="info-section">
      <div v-if="info" class="content__info-section">
        <div class="img-container">
          <img :src="info.img" :alt="info.img_alt" :title="info.img_title" />  
        </div>
        <div>
          <h1 class="title content__title">{{info.name}}</h1>
          <v-btn tag="a" v-tooltip:top="{ html: 'Ir a la tienda' }" :href="info.url_site" target="_blank" primary>Visitar</v-btn>
        </div>
      </div>
      <v-expansion-panel v-if="info.description" class="store-content-panel">
        <v-expansion-panel-content>
          <div slot="header" v-text="headerDescription"></div>
          <div v-text="bodyDescription"></div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <h2 class="title">Lista de ofertas, promociones y descuentos en {{info.name}}</h2>
    </template>
    <template slot="content">
      <v-row>
        <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <ofer-item :item="item" :to-link="$store.state.routes.stores + '/' + item.slug"></ofer-item>
        </v-col>
      </v-row>
    </template>
    <template slot="more-content">
      <ofer-more-items @more-items="concatItems" :pagination="pagination" :url="urlReq+id" txt="Cargar más ofertas"></ofer-more-items>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferItem from '~components/ofer-item.vue'
import OferMoreItems from '~components/ofer-more-items.vue'

// asyncData does not have acces to 'this' reference
var urlReq = '/api/stores/'

export default {
  mixins: [OferPaths],
  data () {
    return { indexDescription: 65, urlReq: urlReq }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq + params.id)
    return Object.assign({
      path: route.path,
      id: params.id
    },
    data)
  },
  head () {
    return {
      title: 'Ofertadeo Tienda'
    }
  },
  components: {
    OferContent,
    OferItem,
    OferMoreItems
  },
  computed: {
    headerDescription () {
      var nextString = this.info.description.slice(this.indexDescription)
      var index = nextString.indexOf(' ')
      this.indexDescription += index
      return this.info.description ? this.info.description.slice(0, this.indexDescription) + '...' : ''
    },
    bodyDescription () {
      return '...' + this.info.description.slice(this.indexDescription)
    }
  },
  methods: {
    concatItems (items) {
      this.items = this.items.concat(items)
    }
  }
}
</script>

<style lang="scss">
.store-content-panel.expansion-panel {
  box-shadow: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
  li {
    border: none;
    position: relative;
    .expansion-panel__header {
      &:after {
        font-size: 2rem;
      }
    }
    .expansion-panel__header,
    .expansion-panel__header--active {
      padding-left:0 !important;
    }

    .expansion-panel__body {
      background-color: #fff;
      border: none;
    }
  }
}
</style>
