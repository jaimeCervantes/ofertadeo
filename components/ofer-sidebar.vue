<template>
  <v-sidebar v-model="$store.state.sidebar" drawer height="100%" fixed
  role="complementary" id="sidebar-nav" itemscope="itemscope" itemtype="https://schema.org/WPSideBar">
  <h3 class="visually-hidden">Menús de navegación laterales</h3>
    <nav role="navigation" id="nav-tiendas" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
      <v-list dense>
        <v-subheader class="white--text">
          <h3>{{$store.state.txt.stores}}</h3>
          <nuxt-link :to="$store.state.routes.storeList"><v-btn primary light>Ver todas</v-btn></nuxt-link>
        </v-subheader>
        <v-list-item  v-for="(item,i) in $store.state.stores" :key="i">
          <v-list-tile ripple router nuxt :href="$store.state.routes.storeList + '/' + item._id" class="list__tile">
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
          <h3>{{$store.state.txt.categories}}</h3>
          <nuxt-link :to="$store.state.routes.categories"><v-btn primary light>Ver todas</v-btn></nuxt-link>
        </v-subheader>
        <v-list-item v-for="(item,i) in $store.state.categories" :key="i">
          <v-list-tile ripple router nuxt :href="$store.state.routes.categories + '/' + item._id" class="list__tile">
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
export default {
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
