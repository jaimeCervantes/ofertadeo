<template>
  <v-sidebar v-model="$store.state.sidebar" drawer height="100%" fixed>
    <v-list dense>
      <v-subheader class="white--text" v-text="$store.state.txt.categories" />
      <v-list-item v-for="(item,i) in $store.state.categories" :key="i">
        <v-list-tile ripple is="nuxt-link" :to="$store.state.routes.categories + '/' + item._id" class="list__tile">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </v-list>
    <v-list dense>
      <v-divider/>
      <v-subheader class="white--text" v-text="$store.state.txt.stores" />
      <v-list-item ripple v-for="(item,i) in $store.state.stores" :key="i">
        <v-list-tile  is="nuxt-link" :to="$store.state.routes.storeList + '/' + item._id" class="list__tile">
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
  props: ['opened']
}
</script>
