<template>
  <v-sidebar v-model="$store.state[opened]" drawer height="100%" fixed>
    <v-subheader v-if="title" v-text="title" />
    <v-divider v-if="title"/>
    <v-list dense>
      <v-list-item v-for="(item,i) in items" :key="i">
        <v-list-tile is="nuxt-link" :to="path + '/' + item._id" class="list__tile">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </v-list>
  </v-sidebar>
</template>

<script>
export default {
  props: ['opened', 'items', 'path', 'title']
}
</script>
