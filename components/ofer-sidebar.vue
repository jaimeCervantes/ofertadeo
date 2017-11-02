<template>
  <v-navigation-drawer
      temporary
      v-model="$store.state.sidebar"
      app
       role="complementary" id="sidebar-nav" itemscope="itemscope" itemtype="https://schema.org/WPSideBar"
       class="blue"
       dark
    >
      <v-btn flat dark class="close" @click.stop="$store.commit('toggleSidebar')"><v-icon>close</v-icon></v-btn>
      <v-list dense>
        <v-subheader class="white--text">
          <h3>{{config.txt.stores}}</h3>
          <v-btn tag="a" :href="config.host + config.routes.storeList" color="primary" light>Ver todas</v-btn>
        </v-subheader>
        <v-list-tile v-for="(item,i) in config.stores" :key="i" ripple tag="a" :href="config.host + config.routes.storeList + '/' + item._id" class="list__tile">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <v-divider/>
        <v-subheader class="white--text">
          <h3>{{config.txt.categories}}</h3>
          <v-btn tag="a" :href="config.host + config.routes.categories" color="primary" light>Ver todas</v-btn>
        </v-subheader>
        <v-list-tile v-for="(item,i) in config.categories" :key="i" ripple :href="config.host + config.routes.categories + '/' + item._id" class="list__tile">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-navigation-drawer>
</template>

<script>
import OferCommon from '~/components/mixins/ofer-common.vue'
export default {
  mixins: [OferCommon],
  props: ['opened']
}
</script>

<style scoped lang="stylus">
  .list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    hr, .subheader {
      flex-basis: 100%;
      margin-bottom: 5px;
    }
    
    .subheader {
      padding-left: 12px;
      padding-right: 12px;
      h3 {
        margin-bottom: 0;
        color: #fff;
      }
    }
  }
</style>
