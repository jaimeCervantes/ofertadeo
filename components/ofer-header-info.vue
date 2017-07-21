<template>
  <div class="header-info">
    <div v-if="info.name" class="content__info-section">
      <div class="img-container">
        <img :src="info.thumbnail" :alt="info.img_alt" :title="info.img_title" />  
      </div>
      <div>
        <h1 class="title content__title">Ofertas {{info.name}}</h1>
        <v-btn tag="a" v-if="rel" :rel="rel" v-tooltip:top="{ html: 'Ir a la tienda' }" :href="info.url_site" target="_blank" primary>Ir a {{info.name}}</v-btn>
      </div>
    </div>
    <slot name="info"></slot>
    <v-expansion-panel v-if="info.content" class="content-panel">
      <v-expansion-panel-content>
        <div slot="header" v-text="headerDescription"></div>
        <div v-text="bodyDescription"></div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import OferCommon from '~components/mixins/ofer-common.vue'

export default {
  mixins: [OferCommon],
  props: {
    info: {
      type: Object
    },
    rel: String
  },
  data () {
    return { indexDescription: 65, description: this.getTextFromHtml(this.info.content) }
  },
  computed: {
    headerDescription () {
      var nextString = this.description.slice(this.indexDescription)
      var index = nextString.indexOf(' ')
      this.indexDescription += index
      return this.description ? this.description.slice(0, this.indexDescription) + '...' : ''
    },
    bodyDescription () {
      return '...' + this.description.slice(this.indexDescription)
    }
  }
}
</script>

<style lang="scss" scoped>
.content__title {
  margin-bottom: 0;
  word-break: break-word;
  &::first-letter {
    text-transform: uppercase;
  }
}

.header-info {
  .btn {
    margin-left:0;
    float:left;
  }
}

.content__info-section {
  display: flex;
  align-items: center;
  padding: 0;
  
  .info-section__icon {
    justify-content: left;
  }

  .img-container {
    display: flex;
    width:200px;
    align-items: center;
    justify-content:left;
    margin-right: 0.5rem;
    overflow:hidden;
  }

  img {
    margin-right: 1rem;
    width: 100%;
  }
}
</style>
