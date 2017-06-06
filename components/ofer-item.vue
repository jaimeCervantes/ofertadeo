<template>
  <v-card hover raised class="item">
    <v-card-row v-if="item.thumbnail" class="item__img">
      <nuxt-link :to="toLink"><img :class="type" :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title"></nuxt-link>
    </v-card-row>
    <v-card-row class="item__store" v-if="item.store_id">
      <div class="pl-2 pr-2">
        <nuxt-link :to="$store.state.routes.storeList + '/' + item.store_id">{{item.store_id.split('-').join(' ').toUpperCase()}}</nuxt-link>
      </div>
    </v-card-row>
    <v-card-row class="item__name" v-if="item.name">
      <div class="pl-2 pr-2"><nuxt-link :to="toLink">{{item.name}}</nuxt-link></div>
    </v-card-row>
  </v-card>
</template>

<script>
export default {
  props: ['item', 'toLink', 'type']
}
</script>

<style lang="scss" scoped>
.card__row {
  justify-content: center;
}

.item__img {
  overflow:hidden;
  img {
    width: 150px;
  }
  .categories {
    width: 125px;
  }
}

.item__name, .item__store {
  justify-content: left;
  color: #424242;
  min-height: 18px;
  font-weight:bold;
}

.item__store a {
  color:#888;
  font-size:0.8rem;
}
</style>
