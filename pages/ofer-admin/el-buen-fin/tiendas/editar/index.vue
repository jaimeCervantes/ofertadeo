<template>
  <div>
    <header>
      <v-breadcrumbs divider="/" v-if="breadcrumbs">
        <v-breadcrumbs-item
            v-for="item in breadcrumbs" :key="item.href"
            :disabled="item.disabled"
            :href="item.href"
            :target="item.target || '_self'"
          >
            {{ item.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </header>
    <section>
      <div id="main-list" itemscope itemtype="http://schema.org/ItemList">
        <div v-for="(letter,l) in items" :key="l">
          <h3 v-text="letter._id.toUpperCase()"></h3>
          <v-layout row wrap>
            <v-flex xs6 sm3 md3 lg2 xl2 v-for="(item,i) in letter.stores" :key="i">
              <ofer-item class="mini" :item="item" :to-link="config.routes.elBuenFin + '/' + item._id" itemprop="itemListElement" itemscope itemtype="http://schema.org/Article" :position="i">
                <template slot="content">
                  <div class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
                    <div class="pl-2 pr-2" itemprop="headline">
                      <a itemprop="name" :href="getItemLink(item._id)">
                        {{sliceTextFromHtml(item.name, 45)}}
                      </a>
                    </div>
                    <div class="pl-2 pr-2">
                      <v-btn small primary dark :href="`${config.host}${config.routes.admin}${config.routes.elBuenFin}${config.routes.storeList}/editar/${item.slug}`">Editar</v-btn>
                    </div>
                  </div> 
                </template>
              </ofer-item>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferItem from '~/components/ofer-item.vue'

var urlReq = OferCommon.props.config.default().host + '/api/el-buen-fin/stores'

export default {
  layout: 'admin',
  mixins: [OferPaths, OferCommon],
  data () {
    return { urlReq: urlReq }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(urlReq)
    return Object.assign({
      path: route.path
    },
    data)
  },
  components: {
    OferItem,
    OferCommon
  },
  methods: {
    getItemLink (path) {
      return `${this.config.host}${this.config.routes.elBuenFin}/${path}`
    }
  },
  head () {
    return {
      title: 'Tiendas | Ofertadeo',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>
