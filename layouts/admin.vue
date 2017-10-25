<template>
<main>
  <v-app id="ofertadeo">
    <header>
      <ofer-toolbar class="ofer"></ofer-toolbar>
    </header>
    <ofer-sidebar>
      <nav role="navigation">
        <v-list dense>
          <v-subheader class="white--text">
            <h3>{{config.txt.offers}}</h3>
          </v-subheader>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.main + '/nueva'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>Nueva</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.main + '/editar'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>Editar</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </nav>
      <nav role="navigation">
        <v-list dense>
          <v-subheader class="white--text">
            <h3>{{config.txt.stores}}</h3>
          </v-subheader>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.storeList + '/nueva'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>Nueva</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.storeList + '/editar'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>Editar</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.seo + '/tiendas'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>SEO</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </nav>
      <nav role="navigation">
        <v-list dense>
          <v-subheader class="white--text">
            <h3>{{config.txt.categories}}</h3>
          </v-subheader>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.categories + '/nueva'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>Nueva</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.categories + '/editar'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>Editar</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.seo + '/categorias'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>SEO</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </nav>
      <nav role="navigation">
        <v-list dense>
          <v-subheader class="white--text">
            <h3>{{config.txt.elBuenFin}}</h3>
          </v-subheader>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.elBuenFin + config.routes.storeList +'/nueva'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>Nueva</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.elBuenFin + config.routes.storeList +'/editar'" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>Editar</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple tag="a" :href="adminRoute + config.routes.elBuenFin + config.routes.storeList  + config.routes.seo" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>SEO</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </nav>
      
    </ofer-sidebar>
    <nuxt/>
  </v-app>
  <ofer-footer></ofer-footer>
</main>
</template>

<script>
import '~/assets/stylus/main-admin.styl'
import OferToolbar from '~/components/ofer-toolbar.vue'
import OferSidebar from '~/components/ofer-sidebar.vue'
import OferFooter from '~/components/ofer-footer.vue'

import OferCommon from '~/components/mixins/ofer-common.vue'

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default {
  mixins: [OferCommon],
  computed: {
    adminRoute () {
      return this.config.host + this.config.routes.admin
    }
  },
  components: {
    OferToolbar,
    OferSidebar,
    OferFooter
  }
}
</script>

<style scoped lang="stylus">
  .list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    hr, .subheader {
      flex-basis: 100%;
    }
    hr {
      margin-bottom: 5px;
    }
    
    .subheader {
      padding-left: 12px;
      padding-right: 12px;
      h3 {
        margin-bottom: 0;
        color: #fff;
      }
    }
  }
  
  .list__item {
    flex-basis: 50%;
    .list__tile {
      padding: 0 12px 0 12px;
    }
  }
</style>
