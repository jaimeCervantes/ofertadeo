<template>
  <v-sidebar v-model="$store.state.sidebar" drawer height="100%" fixed
  role="complementary" id="sidebar-nav" itemscope="itemscope" itemtype="https://schema.org/WPSideBar">
  <h3 class="visually-hidden">Menús de navegación laterales</h3>
    <nav role="navigation" id="nav-tiendas" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
      <v-list dense>
        <v-subheader class="white--text">
          <h3>{{config.txt.stores}}</h3>
          <v-btn tag="a" :to="config.host + config.routes.storeList" primary light>Ver todas</v-btn>
        </v-subheader>
        <v-list-item  v-for="(item,i) in config.stores" :key="i">
          <v-list-tile ripple tag="a" :href="config.host + config.routes.storeList + '/' + item._id" class="list__tile">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </nav>
    <nav role="navigation" id="nav-categorias" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
      <v-list dense>
        <v-divider/>
        <v-subheader class="white--text">
          <h3>{{config.txt.categories}}</h3>
          <v-btn tag="a" :to="config.host + config.routes.categories" primary light>Ver todas</v-btn>
        </v-subheader>
        <v-list-item v-for="(item,i) in config.categories" :key="i">
          <v-list-tile ripple :href="config.host + config.routes.categories + '/' + item._id" class="list__tile">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </nav>
  </v-sidebar>
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
    }
    hr {
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
  
  .list__item {
    flex-basis: 50%;
    .list__tile {
      padding: 0 12px 0 12px;
    }
  }
</style>
