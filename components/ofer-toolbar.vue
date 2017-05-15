<template>
  <v-toolbar>
    <slot name="left-icons">
      <v-toolbar-side-icon @click.native.stop="$store.commit('toggleCategoriesNav')"></v-toolbar-side-icon>
      <v-btn icon @click.native.stop="$store.commit('toggleStoresNav')">
        <v-icon>store</v-icon>
      </v-btn>
    </slot>
    <slot name="left-items">
      <v-toolbar-items>
        <v-toolbar-item>{{title.split('-').join(' ')}}</v-toolbar-item>
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
