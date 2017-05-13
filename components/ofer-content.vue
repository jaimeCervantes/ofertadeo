<template>
<v-content>
  <v-container fluid>
    <v-row>
      <v-breadcrumbs divider="/">
      <v-breadcrumbs-item 
        v-for="item in breadcrumbs" :key="item"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    </v-row>
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
</template>

<script>
export default {
  props: ['catalogs', 'routes', 'breadcrumbs']
}
</script>
