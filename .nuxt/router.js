'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _0e9c5070 = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _0ced53ce = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/tiendas/index.vue' /* webpackChunkName: "pages/tiendas" */)

const _fa24946c = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/terminos/index.vue' /* webpackChunkName: "pages/terminos" */)

const _12018b54 = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/nosotros/index.vue' /* webpackChunkName: "pages/nosotros" */)

const _5ec0d216 = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/categorias/index.vue' /* webpackChunkName: "pages/categorias" */)

const _52b51fa4 = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/privacidad/index.vue' /* webpackChunkName: "pages/privacidad" */)

const _3b282ba3 = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/promociones/index.vue' /* webpackChunkName: "pages/promociones" */)

const _4102bacb = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/promociones/_id.vue' /* webpackChunkName: "pages/promociones-id" */)

const _f4be5ac6 = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/categorias/_id.vue' /* webpackChunkName: "pages/categorias-id" */)

const _710fea7e = () => import('/mnt/c/jaime/develop/ofertadeoV1/pages/tiendas/_id.vue' /* webpackChunkName: "pages/tiendas-id" */)



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
			component: _0e9c5070,
			name: "index"
		},
		{
			path: "/tiendas",
			component: _0ced53ce,
			name: "tiendas"
		},
		{
			path: "/terminos",
			component: _fa24946c,
			name: "terminos"
		},
		{
			path: "/nosotros",
			component: _12018b54,
			name: "nosotros"
		},
		{
			path: "/categorias",
			component: _5ec0d216,
			name: "categorias"
		},
		{
			path: "/privacidad",
			component: _52b51fa4,
			name: "privacidad"
		},
		{
			path: "/promociones",
			component: _3b282ba3,
			name: "promociones"
		},
		{
			path: "/promociones/:id",
			component: _4102bacb,
			name: "promociones-id"
		},
		{
			path: "/categorias/:id",
			component: _f4be5ac6,
			name: "categorias-id"
		},
		{
			path: "/tiendas/:id",
			component: _710fea7e,
			name: "tiendas-id"
		}
  ]
})
