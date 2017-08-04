<template>
<div class="content">
  <article class="container container--fluid">
    <header class="row">
      <div class="breadcrumbs-info-section">
        <v-breadcrumbs divider="">
          <v-breadcrumbs-item 
            v-for="item in breadcrumbs" :key="item"
            :disabled="item.disabled"
            :href="item.href"
            :target="item.target || '_self'"
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
        <slot name="info-section"></slot>
      </div>
    </header>
    <v-divider class="section-divider"></v-divider>
    <section class="middle-content">
      <slot name="content"></slot>
      <slot name="more-content"></slot>
    </section>
    <slot name="content-footer"></slot>
  </article>
</div>
</template>

<script>
export default {
  props: ['items', 'routes', 'breadcrumbs', 'infoSection']
}
</script>
<style lang="scss" scoped>
  .breadcrumbs-info-section {
    padding: 0 0.5rem;
  }
  .section-divider {
    padding: 0;
  }

  header {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .middle-content {
    padding-top:0.5rem;
    padding-bottom:0.5rem;
    h2 {
      margin-bottom:0;
    }
  }

  footer {
    padding-top:0.5rem;
    margin-bottom: 1.3rem;
    h2 {
      margin-bottom:0.5rem;
    }
  }
</style>
