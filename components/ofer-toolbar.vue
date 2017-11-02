<template>
  <v-toolbar app color="primary" dark fixed>
      <v-btn class="menu-mobile hidden-sm-and-up" flat @click.stop="$store.commit('toggleSidebar')">
        <v-icon>menu</v-icon> Menu
      </v-btn>
      <v-btn :href="config.host" flat class="logo">
        <img src="/logo.png" alt="Logo" width="40"> Ofertadeo
      </v-btn>
      <v-btn class="hidden-xs-only" :href="config.host + config.routes.elBuenFin" flat>El Buen Fin</v-btn>
      <v-btn class="before-activator hidden-xs-only" :href="config.host + config.routes.storeList" flat>Tiendas</v-btn>
      <v-menu
        offset-y
        open-on-hover
        :close-on-content-click="false"
        max-width="500"
        transition="slide-x-transition"
        v-model="menu"
      >
        <v-btn class="hidden-xs-only" icon flat slot="activator"><v-icon>arrow_drop_down</v-icon></v-btn>
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
            <v-btn :href="config.host + config.routes.storeList" flat color="primary" dark><v-icon>store</v-icon>Ver todas</v-btn>
            <v-btn flat @click="menu = false"><v-icon>close</v-icon>Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-btn class="before-activator hidden-xs-only" :href="config.host + config.routes.categories" flat>Categorías</v-btn>
      <v-menu
        offset-y
        open-on-hover
        :close-on-content-click="false"
        max-width="500"
        transition="slide-x-transition"
        v-model="menuCat"
      >
        <v-btn class="hidden-xs-only" icon flat slot="activator"><v-icon>arrow_drop_down</v-icon></v-btn>
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
            <v-btn :href="config.host + config.routes.categories" flat color="primary" dark><v-icon>sort</v-icon>Ver todas</v-btn>
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
<style lang="scss">
.toolbar {
  .btn.logo,
  .btn.menu-mobile {
    min-width: 30px;
    margin-left: 0.5rem !important;
    margin-right: 0 !important;
    .btn__content {
      padding-left: 2px;
      padding-right: 3px;
    }
  }

  .btn.logo .btn__content {
    font-weight: bold;
    font-size: 1.3rem;
  }

  .btn {
    margin-left: 0px;
    margin-right: 5px;
    max-width: 200px;
    .btn__content {
      padding-left: 2px;
      padding-right: 2px;
      font-weight: normal;
    }
  }

  .btn.before-activator {
    margin-left: 0;
    margin-right: 0;
    min-width: 20px;
  }

  .menu__activator .btn {
    margin-left: 0;
    .btn__content {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

.toolbar__dropdown-menu {
  .list--dense {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    font-weight:normal;
    li.list__tile {
      flex-basis: 33.33%;
      padding-left: 0;
      padding-right: 0;
      color: #fff;
      font-weight:normal;
    }
    
    .list__tile--link {
      width:100%;
      padding: 0 12px;
      font-weight:normal;
    }
  }
}
</style>
