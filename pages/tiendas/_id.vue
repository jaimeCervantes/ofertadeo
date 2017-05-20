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
      <v-expansion-panel class="store-content-panel">
          <v-expansion-panel-content>
            <div slot="header" v-html="slicePanelHeader(info.content)"></div>
            <div v-html="slicePanelBody(info.content)"></div>
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
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferPaths from '~components/mixins/ofer-paths.vue'
import OferItem from '~components/ofer-item.vue'

export default {
  mixins: [OferPaths],
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/stores/' + params.id)
    return Object.assign({
      path: route.path
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
    OferItem
  },
  methods: {
    slicePanelHeader (content) {
      return content.slice(0, 65) + '...'
    },
    slicePanelBody (content) {
      return content.slice(60)
    }
  }
}
</script>

<style lang="scss">
.store-content-panel.expansion-panel {
  box-shadow: none;
  li {
    border: none;
    .expansion-panel__header,
    .expansion-panel__header--active {
      padding-left:0 !important;
    }

    .expansion-panel__body {
      border-bottom: none;
      background-color: #fff;
      padding-top:0.5rem;
    }
  }
}
</style>
