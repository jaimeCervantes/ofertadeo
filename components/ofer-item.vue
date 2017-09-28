<template>
  <article>
    <v-card hover raised class="item">
      
      <slot name="header"></slot>
      
      <slot name="thumbnail">
        <a itemprop="url" :href="`${config.host}${toLink}`" :title="item.name">
          <v-card-row v-if="item.thumbnail" class="item__img">
            <img :class="type" :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title">
          </v-card-row>
        </a>
      </slot>
      <span itemprop="position" :content="position+1"></span>
      <span class="visually-hidden" itemscope itemprop="image" itemtype="http://schema.org/ImageObject">
        <img :src="item.thumbnail" itemprop="url">
        <span itemprop="width"  :content="item.img_data && item.img_data.width ? item.img_data.width: 200"></span>
        <span itemprop="height" :content="item.img_data && item.img_data.height ? item.img_data.height: 200"></span>
      </span>
      <span itemprop="author" content="Ofertadeo"></span>
      <span class="visually-hidden" itemscope itemprop="publisher" itemtype="http://schema.org/Organization">
        <span itemprop="name" content="Ofertadeo"></span>
        <span itemprop="logo" itemscope itemtype="http://schema.org/ImageObject">
        <img itemprop="url" :src="config.host + '/favicons/apple-touch-icon-60x60.png'" width="60" height="60">
        </span>
      </span>
      <span itemprop="datePublished" :content="getISODateStr(item.published)"></span>
      <span itemprop="dateModified" :content="getISODateStr(item.modified)"></span>
      
      <slot name="content">
        <v-card-row class="item__name" v-if="item.name" itemprop="mainEntityOfPage">
          <div class="pl-2 pr-2" itemprop="headline">
            <a itemprop="name" :href="`${config.host}${toLink}`" :title="item.name">{{sliceTextFromHtml(item.name, 45)}}</a>
          </div>
        </v-card-row>  
      </slot>

      <slot name="footer">
        <v-card-row class="item__store pl-2 pr-2" v-if="item.stores || item.categories">
          <a v-if="type!=='store'" :href="getAdditionalLinks(type)" :title="item.stores[0].name">Ofertas {{item.stores[0].name}}</a>
          <a v-if="type==='store'" :href="getAdditionalLinks(type)" :title="item.categories[0].name">{{item.categories[0].name}}</a>
        </v-card-row>
      </slot>

    </v-card>
  </article>
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
        return `${this.config.host}${this.config.routes.storeList}/${this.item.stores[0]._id}`
      }

      if (type === 'store') {
        return `${this.config.host}${this.config.routes.categoriesList}/${this.item.categories[0]._id}`
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
}
</style>
