<template>
  <div class="header-info">
    <slot name="content">
      <h1 class="hidden-md-and-up">{{info.name}}</h1>
      <div v-if="info.name" class="content__info-section">
        <div class="img-container">
          <img :src="info.thumbnail" :alt="info.img_alt" :title="info.img_title" />
        </div>
        <div>
          <h1 class="title content__title hidden-sm-and-down" v-html="info.h1" v-if="info.h1"></h1>
          <v-btn tag="a" flat v-if="rel" :rel="rel" :href="info.url_site" target="_blank">Ir a {{info.name}}</v-btn>
          <slot name="social-network"></slot>
        </div>
      </div>
    </slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import OferCommon from '~/components/mixins/ofer-common.vue'

export default {
  mixins: [OferCommon],
  props: {
    info: {
      type: Object
    },
    rel: String
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
  }
  
  .btn .btn--raised {
    @media (max-width:500px) {
      padding:1px;
    }
  }

  .info-description {
    margin-top: 0.8rem;
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
    max-width:300px;
    @media (min-width:500px) {
      max-width:200px;
    }
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
