<template>
  <v-navigation-drawer
      temporary
      v-model="$store.state.sidebar"
      app
       role="complementary"
       dark
    >
      <slot>
        <v-btn flat dark class="close" @click.stop="$store.commit('toggleSidebar')"><v-icon>close</v-icon></v-btn>
        <v-list dense>
          <v-subheader class="white--text">
            <h3><a :href="config.host + config.routes.elBuenFin">{{config.txt.elBuenFin}}</a></h3>
          </v-subheader>
        </v-list>
        <v-list dense>
          <v-divider/>
          <v-subheader class="white--text">
            <h3>{{config.txt.stores}}</h3>
            <v-btn flat :href="config.host + config.routes.storeList" light>
            <v-icon>store</v-icon>Ver todas</v-btn>
          </v-subheader>
          <v-list-tile v-for="(item,i) in stores" :key="i" ripple :href="config.host + config.routes.storeList + '/' + item._id" class="list__tile">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list dense>
          <v-divider/>
          <v-subheader class="white--text">
            <h3>{{config.txt.categories}}</h3>
            <v-btn flat :href="config.host + config.routes.categories" light>
              <v-icon>sort</v-icon>Ver todas</v-btn>
          </v-subheader>
          <v-list-tile v-for="(item,i) in config.categories" :key="i" ripple :href="config.host + config.routes.categories + '/' + item._id" class="list__tile">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </slot>
  </v-navigation-drawer>

</template>

<script>
import OferCommon from '~/components/mixins/ofer-common.vue'
export default {
  mixins: [OferCommon],
  props: ['opened'],
  created () {
    this.stores = this.config.stores.slice(0, this.config.stores.length / 2)
  }
}
</script>

<style scoped lang="stylus">
aside {
  background-color:#2196f3!important;
  .close {
    position: absolute;
    right:5px;
    cursor:pointer;
    padding: 5px;
    min-width: 35px;
    width: 35px;
  }
}

.list {
  .subheader {
    h3 {
      margin-bottom: 0;
      color: #fff;
    }
  }
  
  .list__tile--link {
    width:100%;
    padding: 0 12px;
  }
  
  .list__tile__title {
    font-weight:normal; 
  }
}
</style>
