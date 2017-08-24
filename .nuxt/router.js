'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _882722d6 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _6c810184 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/tiendas/index.vue' /* webpackChunkName: "pages/tiendas" */)

const _489086cf = () => import('/home/jaime/develop/ofertadeo-deploy/pages/nosotros/index.vue' /* webpackChunkName: "pages/nosotros" */)

const _8d069d76 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/terminos/index.vue' /* webpackChunkName: "pages/terminos" */)

const _c144c0a0 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/categorias/index.vue' /* webpackChunkName: "pages/categorias" */)

const _442b3a48 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/promociones/index.vue' /* webpackChunkName: "pages/promociones" */)

const _795f70d4 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/index.vue' /* webpackChunkName: "pages/ofer-admin" */)

const _2173285f = () => import('/home/jaime/develop/ofertadeo-deploy/pages/privacidad/index.vue' /* webpackChunkName: "pages/privacidad" */)

const _4e1499c9 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/promociones/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones" */)

const _547ec73f = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/tiendas/index.vue' /* webpackChunkName: "pages/ofer-admin-tiendas" */)

const _0c2c8ecc = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/promociones/new/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones-new" */)

const _1d4d28d7 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/promociones/editar/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones-editar" */)

const _e4c1a8ce = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/tiendas/nueva/index.vue' /* webpackChunkName: "pages/ofer-admin-tiendas-nueva" */)

const _c686325c = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/promociones/editar/_slug/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones-editar-slug" */)

const _3178e532 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/tiendas/_id.vue' /* webpackChunkName: "pages/ofer-admin-tiendas-id" */)

const _d0574b78 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/ofer-admin/promociones/_slug/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones-slug" */)

const _48aa5f83 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/promociones/_slug/index.vue' /* webpackChunkName: "pages/promociones-slug" */)

const _87a063d0 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/categorias/_id.vue' /* webpackChunkName: "pages/categorias-id" */)

const _4dff8db4 = () => import('/home/jaime/develop/ofertadeo-deploy/pages/tiendas/_id.vue' /* webpackChunkName: "pages/tiendas-id" */)



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
			component: _882722d6,
			name: "index"
		},
		{
			path: "/tiendas",
			component: _6c810184,
			name: "tiendas"
		},
		{
			path: "/nosotros",
			component: _489086cf,
			name: "nosotros"
		},
		{
			path: "/terminos",
			component: _8d069d76,
			name: "terminos"
		},
		{
			path: "/categorias",
			component: _c144c0a0,
			name: "categorias"
		},
		{
			path: "/promociones",
			component: _442b3a48,
			name: "promociones"
		},
		{
			path: "/ofer-admin",
			component: _795f70d4,
			name: "ofer-admin"
		},
		{
			path: "/privacidad",
			component: _2173285f,
			name: "privacidad"
		},
		{
			path: "/ofer-admin/promociones",
			component: _4e1499c9,
			name: "ofer-admin-promociones"
		},
		{
			path: "/ofer-admin/tiendas",
			component: _547ec73f,
			name: "ofer-admin-tiendas"
		},
		{
			path: "/ofer-admin/promociones/new",
			component: _0c2c8ecc,
			name: "ofer-admin-promociones-new"
		},
		{
			path: "/ofer-admin/promociones/editar",
			component: _1d4d28d7,
			name: "ofer-admin-promociones-editar"
		},
		{
			path: "/ofer-admin/tiendas/nueva",
			component: _e4c1a8ce,
			name: "ofer-admin-tiendas-nueva"
		},
		{
			path: "/ofer-admin/promociones/editar/:slug",
			component: _c686325c,
			name: "ofer-admin-promociones-editar-slug"
		},
		{
			path: "/ofer-admin/tiendas/:id",
			component: _3178e532,
			name: "ofer-admin-tiendas-id"
		},
		{
			path: "/ofer-admin/promociones/:slug",
			component: _d0574b78,
			name: "ofer-admin-promociones-slug"
		},
		{
			path: "/promociones/:slug",
			component: _48aa5f83,
			name: "promociones-slug"
		},
		{
			path: "/categorias/:id",
			component: _87a063d0,
			name: "categorias-id"
		},
		{
			path: "/tiendas/:id",
			component: _4dff8db4,
			name: "tiendas-id"
		}
  ]
})
