<template>
<v-app top-toolbar left-fixed-sidebar sidebar-under-toolbar>
  <v-toolbar>
    <v-toolbar-side-icon @click.native.stop="toggleCategoriesNav"></v-toolbar-side-icon>
    <v-btn icon @click.native.stop="toggleStoresNav">
      <v-icon>store</v-icon>
    </v-btn>
    <v-toolbar-title>Inicio</v-toolbar-title>
  </v-toolbar>
  <main>
    <v-sidebar v-model="categoriesOpened" drawer height="100%" >
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
    <v-sidebar v-model="storesOpened" drawer height="100%" >
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
      <v-container fluid></v-container>
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
