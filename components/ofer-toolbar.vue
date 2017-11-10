<template>
  <v-toolbar app color="primary" dark fixed>
    <slot>
      <v-toolbar-items>
        <input type="checkbox" class="drawer-toggle" id="drawer-toggle" name="drawer-toggle"/>
        <label 
          class="drawer-toggle-label btn btn--flat btn--raised menu-mobile hidden-sm-and-up" 
          for="drawer-toggle">
          <div class="btn__content">
            <v-icon>menu</v-icon> Menu
          </div>
        </label>
        <div id="drawer-menu">
          <input type="checkbox" class="drawer-toggle" name="drawer-toggle"/>
          <label 
          class="close drawer-toggle-label btn btn--flat btn--raised menu-mobile hidden-sm-and-up" 
          for="drawer-toggle">
            <div class="btn__content">
              <v-icon>close</v-icon>
            </div>
          </label>
          <v-list dark dense>
            <v-list-tile :href="config.host + config.routes.elBuenFin" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title>{{config.txt.elBuenFin}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list dark dense>
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
          <v-list dark dense>
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
        </div>
        <v-btn itemprop="url" :href="config.host" flat class="logo">
          <img src="/logo.png" alt="Logo" width="40"> Ofertadeo
        </v-btn>
        <v-btn class="el-buen-fin hidden-xs-only" :href="config.host + config.routes.elBuenFin" flat>{{config.txt.elBuenFin}}</v-btn>
        <v-btn class="before-activator hidden-xs-only" :href="config.host + config.routes.storeList" flat>Tiendas</v-btn>
      </v-toolbar-items>

      
      <label for="menu-stores" @click="closeCategoriesMenu()" class="toggle-menu btn btn--flat btn--raised btn--icon hidden-xs-only">
        <div class="btn__content">
          <v-icon>arrow_drop_down</v-icon>
        </div>
      </label>
      <input type="checkbox" class="toggle-menu-hidden hidden-xs-only" id="menu-stores" name="menu-stores"/>
      <div class="hidden-menu">
        <v-card class="toolbar__dropdown-menu">
          <v-list>
            <v-list-tile avatar :href="config.host + config.routes.elBuenFin">
              <v-list-tile-avatar>
                <img src="https://www.ofertadeo.com/uploads/2017/10/26/logo-buen-fin-1_thumb.png" alt="El 
                Buen fin" width="55">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{config.txt.elBuenFin}}</v-list-tile-title>
                <v-list-tile-sub-title>Tiendas participantes</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  icon
                >
                  <v-icon>loyalty</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile v-for="(item,i) in config.stores" :key="i" ripple tag="a" :href="config.host + config.routes.storeList + '/' + item._id" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :href="config.host + config.routes.storeList" flat color="primary" dark><v-icon>store</v-icon>Ver todas</v-btn>
            <label for="menu-stores" class="toggle-menu btn btn--flat btn--raised error--text">
              <div class="btn__content">
                <v-icon>close</v-icon> Cerrar
              </div>
            </label>
          </v-card-actions>
        </v-card>
      </div>

      <v-toolbar-items>
        <v-btn class="before-activator hidden-xs-only" :href="config.host + config.routes.categories" flat>Categorías</v-btn>
      </v-toolbar-items>
      
      <label for="menu-categories" @click="closeStoresMenu()" class="toggle-menu btn btn--flat btn--raised btn--icon hidden-xs-only">
        <div class="btn__content">
          <v-icon>arrow_drop_down</v-icon>
        </div>
      </label>
      <input type="checkbox" class="toggle-menu-hidden hidden-xs-only" id="menu-categories" name="menu-categories"/>
      <div class="hidden-menu">
        <v-card class="toolbar__dropdown-menu">
          <v-list dense>
            <v-list-tile v-for="(item,i) in config.categories" :key="i" ripple tag="a" :href="config.host + config.routes.categories + '/' + item._id" class="list__tile">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :href="config.host + config.routes.categories" flat color="primary" dark><v-icon>sort</v-icon>Ver todas</v-btn>
            <label for="menu-categories" class="toggle-menu btn btn--flat btn--raised error--text">
              <div class="btn__content">
                <v-icon>close</v-icon> Cerrar
              </div>
            </label>
          </v-card-actions>
        </v-card>
      </div>
    </slot>
  </v-toolbar>
</template>

<script>
import OferCommon from '~/components/mixins/ofer-common.vue'
export default {
  mixins: [OferCommon],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      menu: false,
      menuCat: false
    }
  },
  created () {
    this.stores = this.config.stores.slice(0, this.config.stores.length / 2)
  },
  methods: {
    closeStoresMenu () {
      document.querySelector('#menu-stores').checked = false
    },
    closeCategoriesMenu () {
      document.querySelector('#menu-categories').checked = false
    }
  }
}
</script>
<style lang="scss">


.toolbar {
  
  .toolbar__content>:not(.btn):not(.menu):first-child,
  .toolbar .toolbar__extension>:not(.btn):not(.menu):first-child {
    @media only screen and (max-width: 599px) {
      margin-left: 0;
    }
  }

  .toolbar__items {
    margin-left: 0 !important;
  }

  .drawer-toggle {
    position: absolute;
    opacity: 0;
    &:checked ~ .drawer-toggle-label, { 
      height: 100%; 
      background-color: rgba(255,255,255,0.3) !important; 
    }
    &:checked ~ #drawer-menu { 
      left: 0; 
    } 
  }

  .toggle-menu-hidden {
    position: absolute;
    opacity: 0;
     &:checked + .hidden-menu {
      top: 50px;
      opacity: 1;
    }
  }

  #drawer-toggle-label, .toggle-menu { 
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
    cursor:pointer;
  }

  #drawer-menu, .hidden-menu {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
    /* adds animation for all transitions */ 
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: none;
  }

   .hidden-menu {
    -webkit-transition: 0.35s ease-in-out;
    -moz-transition: 0.35s ease-in-out;
    -o-transition: 0.35s ease-in-out;
    transition: 0.35s ease-in-out;
   }

  #drawer-menu {
    position: fixed;
    top: 0;
    left:-320px;
    height: 100%; 
    width: 320px;
    overflow-x: hidden;
    overflow-y: scroll; 
    -webkit-overflow-scrolling: touch;
    z-index: 200;
    background-color:#2196f3;
    color: white;
    .list {
      background-color:#2196f3;
      color: white;
    }

    .close {
      position: absolute;
      right:5px;
      cursor:pointer;
      padding: 5px;
      min-width: 35px;
      width: 35px;
    }
  }

  .btn.logo,
  .btn.menu-mobile {
    min-width: 30px;
    margin-left: 0.5rem !important;
    margin-right: 0 !important;
    .btn__content {
      padding-left: 2px;
      padding-right: 3px;
    }
  }

  .btn.logo .btn__content {
    font-weight: bold;
    font-size: 1.3rem;
  }

  .btn {
    margin-left: 0px;
    margin-right: 5px;
    max-width: 200px;
    .btn__content {
      padding-left: 2px;
      padding-right: 2px;
      font-weight: normal;
    }
  }

  .hidden-menu {
    // display:none;
    width: 98%;
    position: absolute;
    left: 1%;
    top: -600px;
    z-index: 10;
    opacity: 0;
  }

  .before-activator {
    margin-left: 0;
    margin-right: 0;
    min-width: 20px;
    cursor:pointer;
  }

  .menu__activator .btn {
    margin-left: 0;
    .btn__content {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .el-buen-fin {
    margin-left: 10px;
    margin-right: 10px;
  }
}

.toolbar__dropdown-menu {
  .list--dense {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    font-weight:normal;
    li.list__tile {
      flex-basis: 20%;
      padding-left: 0;
      padding-right: 0;
      color: #fff;
      font-weight:normal;
    }
    
    .list__tile--link {
      width:100%;
      padding: 0 12px;
      font-weight:normal;
    }
  }
}
</style>
