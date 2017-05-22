<template>
  <div class="header-info">
    <div v-if="info" class="content__info-section">
      <div class="img-container">
        <img :src="info.thumbnail" :alt="info.img_alt" :title="info.img_title" />  
      </div>
      <div>
        <h1 class="title content__title">{{info.name}}</h1>
        <v-btn tag="a" v-if="rel" :rel="rel" v-tooltip:top="{ html: 'Ir a la tienda' }" :href="info.url_site" target="_blank" primary>Visitar</v-btn>
      </div>
    </div>
    <v-expansion-panel v-if="info.description" class="content-panel">
      <v-expansion-panel-content>
        <div slot="header" v-text="headerDescription"></div>
        <div v-text="bodyDescription"></div>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <h2 class="title">Lista de ofertas, promociones y descuentos en {{info.name}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    },
    rel: String
  },
  data () {
    return { indexDescription: 65 }
  },
  computed: {
    headerDescription () {
      var nextString = this.info.description.slice(this.indexDescription)
      var index = nextString.indexOf(' ')
      this.indexDescription += index
      return this.info.description ? this.info.description.slice(0, this.indexDescription) + '...' : ''
    },
    bodyDescription () {
      return '...' + this.info.description.slice(this.indexDescription)
    }
  }
}
</script>

<style lang="scss">
.content__title {
  margin-bottom: 0;
  &::first-letter {
    text-transform: uppercase;
  }
}

.header-info {
  h2 {
    font-weight:400;
    font-size: 1.2rem;
    margin-top: 1rem;
    line-height: 1.3;
  }
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
    width:56px;
    height:56px;
    align-items: center;
    justify-content:left;
    margin-right: 0.5rem;
  }

  img {
    margin-right: 1rem;
  }
}

.content-panel.expansion-panel {
  box-shadow: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
  li {
    border: none;
    position: relative;
    .expansion-panel__header {
      &:after {
        font-size: 2rem;
      }
    }
    .expansion-panel__header,
    .expansion-panel__header--active {
      padding-left:0 !important;
    }

    .expansion-panel__body {
      background-color: #fff;
      border: none;
    }
  }
}
</style>
