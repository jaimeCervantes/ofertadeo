<template>
  <section class="no-exists">
    <v-row>
      <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
        <div class="not-exists">
          <img src="/logo.png" alt="Logo" title="Logo">
          <h1 class="headline" v-if="title">{{title}}</h1>
        </div>
        <slot></slot>
      </v-col>
    </v-row>
    <slot name="more-content"></slot>    
  </section>
</template>

<script>
export default {
  props: ['title']
}
</script>
<style lang="stylus" scoped>
.not-exists {
  text-align: center;
}
</style>
