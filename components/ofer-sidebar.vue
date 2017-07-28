<template>
  <v-sidebar v-model="$store.state.sidebar" drawer height="100%" fixed>
  <h2 class="visually-hidden">Menús de navegación laterales</h2>
    <nav>
      <h2 class="visually-hidden">Menú de navegación</h2>
      <v-list dense>
        <v-subheader class="white--text">
          {{$store.state.txt.stores}} 
          <nuxt-link :to="$store.state.routes.storeList"><v-btn primary light>Ver todas</v-btn></nuxt-link>
        </v-subheader>
        <v-list-item  v-for="(item,i) in $store.state.stores" :key="i">
          <v-list-tile ripple router nuxt :href="$store.state.routes.storeList + '/' + item._id" class="list__tile">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </nav>
    <nav>
      <h2 class="visually-hidden">Menú de navegación</h2>
      <v-list dense>
        <v-divider/>
        <v-subheader class="white--text">
          {{$store.state.txt.categories}} 
          <nuxt-link :to="$store.state.routes.categories"><v-btn primary light>Ver todas</v-btn></nuxt-link>
        </v-subheader>
        <v-list-item v-for="(item,i) in $store.state.categories" :key="i">
          <v-list-tile ripple router nuxt :href="$store.state.routes.categories + '/' + item._id" class="list__tile">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </nav>
  </v-sidebar>
</template>

<script>
export default {
  props: ['opened']
}
</script>

<style scoped lang="stylus">
  .list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    hr, subheader {
      flex-basis: 100%;
    }
    hr {
      margin-bottom: 5px;
    }
  }

  .list__item {
    flex-basis: 50%;
    .list__tile {
      padding: 0 12px 0 12px;
    }
  }
</style>
