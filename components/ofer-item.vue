<template>
  <v-card hover raised class="item">
    <v-card-row v-if="item.thumbnail" class="item__img">
      <nuxt-link :to="toLink">
        <img :class="type" :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title">
      </nuxt-link>
    </v-card-row>
    <v-card-row class="item__store" v-if="item.store_id || item.stores">
      <div class="pl-2 pr-2">
        <nuxt-link :to="$store.state.routes.storeList + '/' + (item.store_id || item.stores[0])">{{arrayToString(item.stores || [item.store_id]).toUpperCase()}}</nuxt-link>
      </div>
    </v-card-row>
    <v-card-row class="item__name" v-if="item.name">
      <div class="pl-2 pr-2"><nuxt-link :to="toLink" :title="item.name">{{item.name.slice(0,45) + '...'}}</nuxt-link></div>
    </v-card-row>
  </v-card>
</template>

<script>
import OferCommon from '~components/mixins/ofer-common.vue'
export default {
  mixins: [OferCommon],
  props: ['item', 'toLink', 'type'],
  components: {
    OferCommon
  }
}
</script>

<style lang="scss" scoped>
.card__row {
  justify-content: center;
}

.item__img {
  overflow:hidden;
  height: 200px!important;
  img {
    display: block;
    max-width:100%;
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
