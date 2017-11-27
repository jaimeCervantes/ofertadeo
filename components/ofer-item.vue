<template>
  <article>
    <v-card hover raised class="item">
      
      <slot name="header"></slot>
      
      <slot name="thumbnail">
        <a :href="`${config.host}${toLink}`" :title="item.name">
          <div v-if="item.thumbnail" class="item__img">
            <img :class="type" :src="item.thumbnail" :alt="item.img_alt" :title="item.img_title">
          </div>
        </a>
      </slot>
            
      <slot name="content">
        <div class="item__name pl-2 pr-2 pt-1" v-if="item.name">
          <div >
            <a  :href="`${config.host}${toLink}`" :title="item.name">{{item.name}}</a>
          </div>
        </div>
        <div class="item__extract pl-2 pr-2 pt-1">
          <div v-html="sliceTextFromHtml(item.meta_description, config.seo.extract.charsLimit) + '...'"></div>
        </div>
      </slot>

      <slot name="footer">
        <div class="item__store pl-2 pr-2 pt-1" v-if="item.stores || item.categories">
          <a v-if="type!=='store'" :href="getAdditionalLinks(type)" :title="item.stores[0].name">Ofertas {{item.stores[0].name}}</a>
          <a v-if="type==='store'" :href="getAdditionalLinks(type)" :title="item.categories[0].name">{{item.categories[0].name}}</a>
        </div>
      </slot>

    </v-card>
  </article>
</template>

<script>
import OferCommon from '~/components/mixins/ofer-common.vue'
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
.item__img {
  align-items: center;
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

.item__store a, .item__extract  {
  color:#555;
}

.item__extract {
  justify-content: left;
}

.mini  {
  .item {
    min-height:120px;  
  }

  .item__img {
    height:inherit !important;
    img {
      max-height: 100px;
    }
  }  
}
</style>
