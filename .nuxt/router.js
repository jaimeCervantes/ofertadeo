'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _4c59100f = () => import('/home/jaime/develop/ofertadeo-develop/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _3ecff290 = () => import('/home/jaime/develop/ofertadeo-develop/pages/tiendas/index.vue' /* webpackChunkName: "pages/tiendas" */)

const _7db5190b = () => import('/home/jaime/develop/ofertadeo-develop/pages/terminos/index.vue' /* webpackChunkName: "pages/terminos" */)

const _0cc8ee95 = () => import('/home/jaime/develop/ofertadeo-develop/pages/nosotros/index.vue' /* webpackChunkName: "pages/nosotros" */)

const _b7c1167c = () => import('/home/jaime/develop/ofertadeo-develop/pages/promociones/index.vue' /* webpackChunkName: "pages/promociones" */)

const _5b0dd5dc = () => import('/home/jaime/develop/ofertadeo-develop/pages/ofer-admin/index.vue' /* webpackChunkName: "pages/ofer-admin" */)

const _8d9e92b6 = () => import('/home/jaime/develop/ofertadeo-develop/pages/privacidad/index.vue' /* webpackChunkName: "pages/privacidad" */)

const _371b2df6 = () => import('/home/jaime/develop/ofertadeo-develop/pages/categorias/index.vue' /* webpackChunkName: "pages/categorias" */)

const _17c0ef0f = () => import('/home/jaime/develop/ofertadeo-develop/pages/ofer-admin/promociones/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones" */)

const _81840a40 = () => import('/home/jaime/develop/ofertadeo-develop/pages/ofer-admin/promociones/new/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones-new" */)

const _5921230a = () => import('/home/jaime/develop/ofertadeo-develop/pages/ofer-admin/promociones/_slug/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones-slug" */)

const _40c3567d = () => import('/home/jaime/develop/ofertadeo-develop/pages/promociones/_slug/index.vue' /* webpackChunkName: "pages/promociones-slug" */)

const _ff2f9444 = () => import('/home/jaime/develop/ofertadeo-develop/pages/categorias/_id.vue' /* webpackChunkName: "pages/categorias-id" */)

const _69685720 = () => import('/home/jaime/develop/ofertadeo-develop/pages/tiendas/_id.vue' /* webpackChunkName: "pages/tiendas-id" */)



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
			component: _4c59100f,
			name: "index"
		},
		{
			path: "/tiendas",
			component: _3ecff290,
			name: "tiendas"
		},
		{
			path: "/terminos",
			component: _7db5190b,
			name: "terminos"
		},
		{
			path: "/nosotros",
			component: _0cc8ee95,
			name: "nosotros"
		},
		{
			path: "/promociones",
			component: _b7c1167c,
			name: "promociones"
		},
		{
			path: "/ofer-admin",
			component: _5b0dd5dc,
			name: "ofer-admin"
		},
		{
			path: "/privacidad",
			component: _8d9e92b6,
			name: "privacidad"
		},
		{
			path: "/categorias",
			component: _371b2df6,
			name: "categorias"
		},
		{
			path: "/ofer-admin/promociones",
			component: _17c0ef0f,
			name: "ofer-admin-promociones"
		},
		{
			path: "/ofer-admin/promociones/new",
			component: _81840a40,
			name: "ofer-admin-promociones-new"
		},
		{
			path: "/ofer-admin/promociones/:slug",
			component: _5921230a,
			name: "ofer-admin-promociones-slug"
		},
		{
			path: "/promociones/:slug",
			component: _40c3567d,
			name: "promociones-slug"
		},
		{
			path: "/categorias/:id",
			component: _ff2f9444,
			name: "categorias-id"
		},
		{
			path: "/tiendas/:id",
			component: _69685720,
			name: "tiendas-id"
		}
  ]
})
