<template>
  <v-card hover raised class="item">
    <v-card-row v-if="item.thumbnail" class="item__img">
      <nuxt-link itemprop="url" :to="toLink" >
          <img :class="type" :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title">
        </span>
      </nuxt-link>
    </v-card-row>
    <span class="visually-hidden" itemscope itemprop="image" itemtype="http://schema.org/ImageObject">
      <img :src="item.thumbnail" itemprop="url">
      <span itemprop="width"  v-html="item.img_data && item.img_data.width ? item.img_data.width: 200"></span>
      <span itemprop="height" v-html="item.img_data && item.img_data.height ? item.img_data.height: 200"></span>
    </span>
    <span class="visually-hidden" itemprop="author">Ofertadeo</span>
    <span class="visually-hidden" itemscope itemprop="publisher" itemtype="http://schema.org/Organization">
      <span itemprop="name">Ofertadeo</span>
      <span itemprop="logo" itemscope itemtype="http://schema.org/ImageObject">
        <img itemprop="url" :src="$store.state.host + '/favicons/apple-touch-icon-60x60.png'" width="60" height="60">
      </span>
    </span>
    <span class="visually-hidden" itemprop="datePublished" v-html="item.published"></span>
    <span class="visually-hidden" itemprop="dateModified" v-html="item.modified"></span>
    <span itemprop="position" class="visually-hidden" v-html="position"></span>
    <v-card-row class="item__store" v-if="item.store_id || item.stores || item.categories">
      <div class="pl-2 pr-2">
        <nuxt-link v-if="type!=='store'" :to="getAdditionalLinks(type)">Ofertas {{arrayToString(item.stores || [item.store_id]).toUpperCase()}}</nuxt-link>
        <nuxt-link v-if="type==='store'" :to="getAdditionalLinks(type)">{{arrayToString(item.categories || false).toUpperCase()}}</nuxt-link>
      </div>
    </v-card-row>
    <v-card-row class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
      <div class="pl-2 pr-2" itemprop="headline"><nuxt-link itemprop="name" :to="toLink" :title="item.name">{{item.name.slice(0,45) + '...'}}</nuxt-link></div>
    </v-card-row>
    <slot name="item-content"></slot>
  </v-card>
</template>

<script>
import OferCommon from '~components/mixins/ofer-common.vue'
export default {
  mixins: [OferCommon],
  props: ['item', 'toLink', 'type', 'position'],
  components: {
    OferCommon
  },
  methods: {
    getAdditionalLinks (type) {
      if (type !== 'store') {
        let lastPart = this.item.store_id
        if (!this.item.store_id) {
          lastPart = (this.item.stores && this.item.stores[0]) ? this.item.stores[0] : ''
        }
        return `${this.$store.state.routes.storeList}/${lastPart}`
      }

      if (type === 'store') {
        let lastPart = (this.item.categories && this.item.categories[0]) ? this.item.categories[0] : ''
        return `${this.$store.state.routes.categoriesList}/${lastPart}`
      }
    }
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
