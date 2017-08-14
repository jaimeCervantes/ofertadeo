<template>
  <v-toolbar fixed>
    <h2 class="visually-hidden">Menú de navegación</h2>
    <slot name="left-icons">
      <button type="button" id="menu" class="btn btn--icon" v-on:click.stop="$store.commit('toggleSidebar')">
        <span class="btn__content">
          <i>—</i>
          <i>—</i>
          <i>—</i>
        </span>
      </button>
    </slot>
    <slot name="left-items">
      <v-toolbar-items>
        <v-toolbar-item itemprop="url" :href="$store.state.host" ripple>Ofertadeo</v-toolbar-item>
        <li>
          <a class="toolbar__item" :href="config.feed.rss" title="Suscribete a las últimas ofertas" rel="alternate" type="application/rss+xml" ripple target="_blank">
            <img id="img-rss" src="//feedburner.google.com/fb/images/pub/feed-icon32x32.png" alt="Ultimas ofertas" />Últimas ofertas
          </a>
        </li>
      </v-toolbar-items>
    </slot>

  </v-toolbar>
</template>

<script>
import OferCommon from '~components/mixins/ofer-common.vue'
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
    .btn__content {
      display: flex;
      flex-direction: column;
      i {
        height: 6px;
        line-height: 0;
        font-size: 20px;
      }
    }
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
