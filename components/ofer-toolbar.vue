<template>
  <v-toolbar>
    <slot name="left-icons">
      <v-toolbar-side-icon @click.native.stop="$store.commit('toggleSidebar')"></v-toolbar-side-icon>
    </slot>
    <slot name="left-items">
      <v-toolbar-items>
        <v-toolbar-item>Ofertadeo</v-toolbar-item>
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
