<template>
  <social-sharing :url="url" inline-template :media="media" twitter-user="ofertadeo" :title="title">
    <div id="social-sharing" :twitter-user="twitterUser">
      <network network="facebook">
        <v-btn>
          <img src="/icons/facebook.svg" alt="Compartir en facebook" title="Compartir" width="30" height="30">
        </v-btn>
      </network>
      <network network="twitter">
        <v-btn>
          <img src="/icons/twitter.svg" alt="Compartir en Twitter+" title="Compartir" width="30" height="30">
        </v-btn>
      </network>
      <network network="googleplus">
        <v-btn>
          <img src="/icons/google-plus.svg" alt="Compartir en Google+" title="Compartir" width="30" height="30">
        </v-btn>
      </network>
      <network network="pinterest">
        <v-btn>
          <img src="/icons/pinterest.svg" alt="Compartir en Pinterest+" title="Compartir" width="30" height="30">
        </v-btn>
      </network>
    </div>
  </social-sharing>
</template>

<script>
import Vue from 'vue'
import SocialSharing from 'vue-social-sharing'

Vue.use(SocialSharing)

export default {
  props: {
    url: String,
    media: String,
    title: String,
    buttons: {
      type: Object,
      default: function () {
        return { width: 30, height: 30 }
      }
    },
    twitterUser: String
  }
}
</script>
<style lang="scss">
  #social-sharing {
    display: flex;
    align-items: center;
    .btn {
      width:30px !important;
      min-width:30px !important;
      min-height:30px !important;
      padding:0 !important;
      background-color: #fff !important;
      border-radius: 0 !important;
      margin-left: 0 !important;
      img {
        width: 30px !important;
      }
    }
  }
</style>
