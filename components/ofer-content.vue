<template>
<v-content>
  <v-container fluid>
    <v-row>
      <div class="header">
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
  .header {
    padding: 0 0.5rem;
  }
  .section-divider {
    padding: 0;
  }
</style>
