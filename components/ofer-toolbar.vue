<template>
  <v-toolbar app color="primary" dark fixed>
    <slot>
      <v-btn class="menu-mobile" flat @click.stop="$store.commit('toggleSidebar')">
        <v-icon>menu</v-icon> Menu
      </v-btn>
      <v-btn itemprop="url" :href="config.host" flat class="logo">
        <img src="/logo.png" alt="Logo" width="40"> Ofertadeo
      </v-btn>
      <v-btn :href="config.host + config.routes.elBuenFin" flat>{{config.txt.elBuenFin}}</v-btn>
      <v-btn class="before-activator hidden-xs-only" :href="config.host + config.routes.storeList" flat>Tiendas</v-btn>
      <v-btn class="before-activator hidden-xs-only" :href="config.host + config.routes.categories" flat>Categorías</v-btn>
      </slot>
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
      flex-basis: 20%;
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
