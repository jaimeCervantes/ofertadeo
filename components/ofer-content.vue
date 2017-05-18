<template>
<v-content>
  <v-container fluid>
    <v-row>
      <div class="header">
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
        <slot name="info-section">
          <div v-if="infoSection" class="content__info-section">
            <v-icon x-large>{{infoSection.img || 'label'}}</v-icon>
            <h2 class="title content__title">{{infoSection.name}}</h2>
          </div>
        </slot>
      </div>
    </v-row>
    <v-divider class="section-divider"></v-divider>
    <v-row>
      <slot name="items">
        <v-col class="pa-3" xs6 sm3 md3 lg2 xl2 v-for="(item,i) in items" :key="i">
          <nuxt-link :to="$store.state.routes.stores + '/' + item.slug">
            <v-card hover raised>
              <v-card-row v-if="item.thumbnail" v-bind:img="item.thumbnail" height="162px"></v-card-row>
              <v-card-row v-if="item.name">
                <div class="pa-2">{{item.name}}</div>
              </v-card-row>
              <v-card-row class="actions">
                <v-btn primary>Ver</v-btn>
              </v-card-row>
            </v-card>
          </nuxt-link>
        </v-col>
      </slot>
    </v-row>
  </v-container>
</v-content>
</template>

<script>
export default {
  props: ['items', 'routes', 'breadcrumbs', 'infoSection']
}
</script>
<style lang="scss">
  .content__title {
    margin-bottom: 0;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  
  .content__info-section {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    padding-bottom: 0.5rem;
    img {
      margin-right: 1rem;
    }
  }

  .section-divider {
    padding: 0 1rem;
  }
  .content .breadcrumbs {
    justify-content:left;
  }
</style>
