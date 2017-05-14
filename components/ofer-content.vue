<template>
<v-content>
  <v-container fluid>
    <v-row>
      <v-breadcrumbs divider="/">
      <v-breadcrumbs-item 
        v-for="item in breadcrumbs" :key="item"
        :disabled="item.disabled"
        :href="item.href"
        :target="item.target || '_self'"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    </v-row>
    <v-row>
      <slot name="items">
        <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <v-card hover raised>
            <v-card-row v-if="item.thumbnail" v-bind:img="item.thumbnail" height="162px"></v-card-row>
            <v-card-row v-if="item.name">
              <div class="pa-2">{{item.name}}</div>
            </v-card-row>
            <v-card-row class="actions">
                <a :href="routes.stores + '/' + item.store_id + '/' + item._id"><v-btn primary>Ver</v-btn></a>  
            </v-card-row>
          </v-card>
        </v-col>
      </slot>
    </v-row>
  </v-container>
</v-content>
</template>

<script>
export default {
  props: ['items', 'routes', 'breadcrumbs']
}
</script>
