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
            <v-icon x-large class="info-section__icon">{{infoSection.img || 'label'}}</v-icon>
            <h1 class="title content__title">{{infoSection.name}}</h1>
          </div>
          <h2 class="title" v-if="infoSection">Lista de ofertas, promociones y descuentos en {{infoSection.name}}</h2>
        </slot>
      </div>
    </v-row>
    <v-divider class="section-divider"></v-divider>
    <slot name="content"></slot>
    <slot name="more-content"></slot>
  </v-container>
</v-content>
</template>

<script>
export default {
  props: ['items', 'routes', 'breadcrumbs', 'infoSection']
}
</script>
<style lang="scss" scoped>
  .content__title {
    margin-bottom: 0;
    &::first-letter {
      text-transform: uppercase;
    }
  }

  .header {
    padding: 0 1rem;
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

  .section-divider {
    padding: 0;
  }
  .content .breadcrumbs {
    justify-content:left;
    li:first-child a {
      padding-left:0;
    }
  }
</style>
