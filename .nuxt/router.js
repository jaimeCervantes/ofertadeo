'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _5a8955e8 = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _429538de = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/tiendas/index.vue' /* webpackChunkName: "pages/tiendas" */)

const _43435752 = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/terminos/index.vue' /* webpackChunkName: "pages/terminos" */)

const _5b51a648 = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/nosotros/index.vue' /* webpackChunkName: "pages/nosotros" */)

const _5bda1306 = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/categorias/index.vue' /* webpackChunkName: "pages/categorias" */)

const _54287f2c = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/privacidad/index.vue' /* webpackChunkName: "pages/privacidad" */)

const _6820bd1b = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/promociones/index.vue' /* webpackChunkName: "pages/promociones" */)

const _e93d6b7a = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/promociones/_id.vue' /* webpackChunkName: "pages/promociones-id" */)

const _45f67425 = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/categorias/_id.vue' /* webpackChunkName: "pages/categorias-id" */)

const _0e8dd38e = () => import('/mnt/c/jaime/develop/ofertadeo_ssr/pages/tiendas/_id.vue' /* webpackChunkName: "pages/tiendas-id" */)



const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      // scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // if one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  scrollBehavior,
  routes: [
		{
			path: "/",
			component: _5a8955e8,
			name: "index"
		},
		{
			path: "/tiendas",
			component: _429538de,
			name: "tiendas"
		},
		{
			path: "/terminos",
			component: _43435752,
			name: "terminos"
		},
		{
			path: "/nosotros",
			component: _5b51a648,
			name: "nosotros"
		},
		{
			path: "/categorias",
			component: _5bda1306,
			name: "categorias"
		},
		{
			path: "/privacidad",
			component: _54287f2c,
			name: "privacidad"
		},
		{
			path: "/promociones",
			component: _6820bd1b,
			name: "promociones"
		},
		{
			path: "/promociones/:id",
			component: _e93d6b7a,
			name: "promociones-id"
		},
		{
			path: "/categorias/:id",
			component: _45f67425,
			name: "categorias-id"
		},
		{
			path: "/tiendas/:id",
			component: _0e8dd38e,
			name: "tiendas-id"
		}
  ]
})
