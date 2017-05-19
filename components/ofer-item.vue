<template>
  <nuxt-link :to="toLink">
    <v-card hover raised class="item">
      <v-card-row v-if="item.thumbnail" class="item__img">
        <img :src="item.thumbnail" alt="">
      </v-card-row>
      <v-card-row class="item__name" v-if="item.name">
        <div class="pl-2 pr-2">{{item.name}}</div>
      </v-card-row>
    </v-card>
  </nuxt-link>
</template>
<script>
export default {
  props: ['item', 'toLink']
}
</script>
<style lang="scss" scoped>
  .card__row {
    justify-content: center;
  }
</style>
