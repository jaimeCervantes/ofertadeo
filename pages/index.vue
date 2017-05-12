<template>
<v-app top-toolbar>
  <v-toolbar>
    <v-toolbar-side-icon @click.native.stop="toggleCategoriesNav"></v-toolbar-side-icon>
    <v-btn icon @click.native.stop="toggleStoresNav">
      <v-icon>store</v-icon>
    </v-btn>
    <v-toolbar-title>Inicio</v-toolbar-title>
  </v-toolbar>
  <main>
    <v-sidebar v-model="categoriesOpened" drawer height="100%" fixed>
      <v-list dense>
        <v-list-item v-for="(item,i) in categories" :key="i">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-sidebar>
    <v-sidebar v-model="storesOpened" drawer height="100%" fixed>
      <v-list dense>
        <v-list-item v-for="(item,i) in stores" :key="i">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-sidebar>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in catalogs" :key="i">
            <v-card hover raised>
              <v-card-row v-bind:img="item.thumbnail" height="162px"></v-card-row>
              <v-card-row>
                <v-btn primary>Ver</v-btn>
              </v-card-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </main>
</v-app>
</template>

<script>
import axios from '~plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/home')
    return Object.assign({ categoriesOpened: false, storesOpened: false }, data)
  },
  head () {
    return {
      title: 'Ofertadeo'
    }
  },
  methods: {
    toggleCategoriesNav () {
      this.categoriesOpened = !this.categoriesOpened
      this.storesOpened = false
    },
    toggleStoresNav () {
      this.storesOpened = !this.storesOpened
      this.categoriesOpened = false
    }
  }
}
</script>

<style>
  .content {
    padding: 1rem;
  }

  .card__row--actions {
    background-color: rgba(0,0,0,0.5);
  }
</style>
