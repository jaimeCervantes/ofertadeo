<template>
  <v-toolbar app color="primary" dark fixed>
      <v-toolbar-side-icon @click.stop="$store.commit('toggleSidebar')"></v-toolbar-side-icon>
      <v-btn icon :href="config.host">
        <v-icon>home</v-icon>
      </v-btn>
      <v-menu
        offset-y
        :close-on-content-click="false"
        max-width="500"
        transition="slide-y-transition"
        v-model="menu"
      >
        <v-btn flat slot="activator">Tiendas <v-icon>arrow_drop_down</v-icon></v-btn>
        <v-card class="toolbar__dropdown-menu">
          <v-list>
            <v-list-tile avatar :href="config.host + config.routes.elBuenFin">
              <v-list-tile-avatar>
                <img src="https://www.ofertadeo.com/uploads/2017/10/26/logo-buen-fin-1_thumb.png" alt="John" width="55">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>El buen fin {{new Date().getFullYear()}}</v-list-tile-title>
                <v-list-tile-sub-title>Tiendas participantes</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  icon
                >
                  <v-icon>loyalty</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile v-for="(item,i) in config.stores" :key="i" ripple tag="a" :href="config.host + config.routes.storeList + '/' + item._id" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :href="config.host + config.routes.storeList" color="primary" dark><v-icon>store</v-icon>Ver todas</v-btn>
            <v-btn flat @click="menu = false"><v-icon>close</v-icon>Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-menu
        offset-y
        :close-on-content-click="false"
        max-width="500"
        transition="slide-y-transition"
        v-model="menuCat"
      >
        <v-btn flat slot="activator">Categorías <v-icon>arrow_drop_down</v-icon></v-btn>
        <v-card class="toolbar__dropdown-menu">
          <v-list dense>
            <v-list-tile v-for="(item,i) in config.categories" :key="i" ripple tag="a" :href="config.host + config.routes.categories + '/' + item._id" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :href="config.host + config.routes.categories" color="primary" dark><v-icon>sort</v-icon>Ver todas</v-btn>
            <v-btn flat @click="menuCat = false"><v-icon>close</v-icon>Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar>
</template>

<script>
import OferCommon from '~/components/mixins/ofer-common.vue'
export default {
  mixins: [OferCommon],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      menu: false,
      menuCat: false
    }
  }
}
</script>
