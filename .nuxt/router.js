'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _53896d7f = () => import('/home/jaime/develop/ofertadeo/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _720bf428 = () => import('/home/jaime/develop/ofertadeo/pages/tiendas/index.vue' /* webpackChunkName: "pages/tiendas" */)

const _1abed99b = () => import('/home/jaime/develop/ofertadeo/pages/terminos/index.vue' /* webpackChunkName: "pages/terminos" */)

const _ac5aa1b6 = () => import('/home/jaime/develop/ofertadeo/pages/nosotros/index.vue' /* webpackChunkName: "pages/nosotros" */)

const _55ff2a32 = () => import('/home/jaime/develop/ofertadeo/pages/promociones/index.vue' /* webpackChunkName: "pages/promociones" */)

const _46ac9b28 = () => import('/home/jaime/develop/ofertadeo/pages/ofer-admin/index.vue' /* webpackChunkName: "pages/ofer-admin" */)

const _3acc9335 = () => import('/home/jaime/develop/ofertadeo/pages/privacidad/index.vue' /* webpackChunkName: "pages/privacidad" */)

const _8e91eaf4 = () => import('/home/jaime/develop/ofertadeo/pages/categorias/index.vue' /* webpackChunkName: "pages/categorias" */)

const _67b318c2 = () => import('/home/jaime/develop/ofertadeo/pages/ofer-admin/promociones/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones" */)

const _052eb770 = () => import('/home/jaime/develop/ofertadeo/pages/ofer-admin/promociones/new/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones-new" */)

const _345608cc = () => import('/home/jaime/develop/ofertadeo/pages/ofer-admin/promociones/_slug/index.vue' /* webpackChunkName: "pages/ofer-admin-promociones-slug" */)

const _87fd9026 = () => import('/home/jaime/develop/ofertadeo/pages/promociones/_slug/index.vue' /* webpackChunkName: "pages/promociones-slug" */)

const _1d71f66e = () => import('/home/jaime/develop/ofertadeo/pages/categorias/_id.vue' /* webpackChunkName: "pages/categorias-id" */)

const _14d8e090 = () => import('/home/jaime/develop/ofertadeo/pages/tiendas/_id.vue' /* webpackChunkName: "pages/tiendas-id" */)



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
			component: _53896d7f,
			name: "index"
		},
		{
			path: "/tiendas",
			component: _720bf428,
			name: "tiendas"
		},
		{
			path: "/terminos",
			component: _1abed99b,
			name: "terminos"
		},
		{
			path: "/nosotros",
			component: _ac5aa1b6,
			name: "nosotros"
		},
		{
			path: "/promociones",
			component: _55ff2a32,
			name: "promociones"
		},
		{
			path: "/ofer-admin",
			component: _46ac9b28,
			name: "ofer-admin"
		},
		{
			path: "/privacidad",
			component: _3acc9335,
			name: "privacidad"
		},
		{
			path: "/categorias",
			component: _8e91eaf4,
			name: "categorias"
		},
		{
			path: "/ofer-admin/promociones",
			component: _67b318c2,
			name: "ofer-admin-promociones"
		},
		{
			path: "/ofer-admin/promociones/new",
			component: _052eb770,
			name: "ofer-admin-promociones-new"
		},
		{
			path: "/ofer-admin/promociones/:slug",
			component: _345608cc,
			name: "ofer-admin-promociones-slug"
		},
		{
			path: "/promociones/:slug",
			component: _87fd9026,
			name: "promociones-slug"
		},
		{
			path: "/categorias/:id",
			component: _1d71f66e,
			name: "categorias-id"
		},
		{
			path: "/tiendas/:id",
			component: _14d8e090,
			name: "tiendas-id"
		}
  ]
})
