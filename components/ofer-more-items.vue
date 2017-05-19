<template>
  <div class="actions">
    <v-btn primary large v-bind:loading="loading" v-on:click.native="getMore">Cargar más tiendas</v-btn>
  </div>
</template>

<script>
import axios from '~plugins/axios'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return { reqCounter: 0, loading: false }
  },
  methods: {
    getMore () {
      var that = this
      this.loading = true
      this.reqCounter += 1
      axios.get(this.url + '?page=' + this.reqCounter).then(function (res) {
        that.$emit('more-items', res.data.items)
      }).catch(function (err) {
        alert(err)
      }).then(function () {
        that.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .actions {
    display: flex;
    justify-content: center;
  }
</style>
