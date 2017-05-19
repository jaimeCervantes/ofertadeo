<template>
  <v-toolbar fixed>
    <slot name="left-icons">
      <v-toolbar-side-icon @click.native.stop="$store.commit('toggleSidebar')"></v-toolbar-side-icon>
    </slot>
    <slot name="left-items">
      <v-toolbar-items>
        <v-toolbar-item href="/" ripple>Ofertadeo</v-toolbar-item>
      </v-toolbar-items>
    </slot>

  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
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
</style>
