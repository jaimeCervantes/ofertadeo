<template>
  <v-toolbar fixed>
    <h4 class="visually-hidden">Menú de navegación</h4>
    <slot name="left-icons">
      <button type="button" id="menu" class="btn btn--icon" v-on:click.stop="$store.commit('toggleSidebar')">
        <span class="btn__content"><i class="material-icons icon">menu</i></span>
      </button>
    </slot>
    <slot name="left-items">
      <v-toolbar-items>
        <v-toolbar-item itemprop="url" :href="config.host" ripple>Ofertadeo</v-toolbar-item>
        <v-toolbar-item :href="config.host + config.routes.storeList" ripple>Tiendas</v-toolbar-item>
        <v-toolbar-item :href="config.host + config.routes.categories" ripple>Categorías</v-toolbar-item>
      </v-toolbar-items>
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
  }
}
</script>

<style lang="scss" scoped>
  #menu {
    margin-left: 0rem;
  }
  .toolbar {
    padding:1rem;
    .toolbar__side-icon {
      padding-left:0;
      margin-left:0
    }
  }

  .toolbar__items a {
    padding-left:0.5rem;
    padding-right:0.5rem;
  }

  #img-rss {
    border:0;
    margin-right: 5px;
  }
</style>
