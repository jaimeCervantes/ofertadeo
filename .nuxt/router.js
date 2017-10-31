import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _882722d6 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _6c810184 = () => import('../pages/tiendas/index.vue' /* webpackChunkName: "pages/tiendas/index" */).then(m => m.default || m)
const _2173285f = () => import('../pages/privacidad/index.vue' /* webpackChunkName: "pages/privacidad/index" */).then(m => m.default || m)
const _8d069d76 = () => import('../pages/terminos/index.vue' /* webpackChunkName: "pages/terminos/index" */).then(m => m.default || m)
const _442b3a48 = () => import('../pages/promociones/index.vue' /* webpackChunkName: "pages/promociones/index" */).then(m => m.default || m)
const _795f70d4 = () => import('../pages/ofer-admin/index.vue' /* webpackChunkName: "pages/ofer-admin/index" */).then(m => m.default || m)
const _489086cf = () => import('../pages/nosotros/index.vue' /* webpackChunkName: "pages/nosotros/index" */).then(m => m.default || m)
const _c144c0a0 = () => import('../pages/categorias/index.vue' /* webpackChunkName: "pages/categorias/index" */).then(m => m.default || m)
const _79e6afb4 = () => import('../pages/el-buen-fin/index.vue' /* webpackChunkName: "pages/el-buen-fin/index" */).then(m => m.default || m)
const _547ec73f = () => import('../pages/ofer-admin/tiendas/index.vue' /* webpackChunkName: "pages/ofer-admin/tiendas/index" */).then(m => m.default || m)
const _2f4cd062 = () => import('../pages/el-buen-fin/tiendas/index.vue' /* webpackChunkName: "pages/el-buen-fin/tiendas/index" */).then(m => m.default || m)
const _057a0920 = () => import('../pages/ofer-admin/login/index.vue' /* webpackChunkName: "pages/ofer-admin/login/index" */).then(m => m.default || m)
const _4e1499c9 = () => import('../pages/ofer-admin/promociones/index.vue' /* webpackChunkName: "pages/ofer-admin/promociones/index" */).then(m => m.default || m)
const _62510aa1 = () => import('../pages/ofer-admin/tiendas/editar/index.vue' /* webpackChunkName: "pages/ofer-admin/tiendas/editar/index" */).then(m => m.default || m)
const _b7a922ba = () => import('../pages/ofer-admin/promociones/nueva/index.vue' /* webpackChunkName: "pages/ofer-admin/promociones/nueva/index" */).then(m => m.default || m)
const _38df140d = () => import('../pages/ofer-admin/seo/tiendas/index.vue' /* webpackChunkName: "pages/ofer-admin/seo/tiendas/index" */).then(m => m.default || m)
const _0dd75469 = () => import('../pages/ofer-admin/categorias/nueva/index.vue' /* webpackChunkName: "pages/ofer-admin/categorias/nueva/index" */).then(m => m.default || m)
const _e4c1a8ce = () => import('../pages/ofer-admin/tiendas/nueva/index.vue' /* webpackChunkName: "pages/ofer-admin/tiendas/nueva/index" */).then(m => m.default || m)
const _1d4d28d7 = () => import('../pages/ofer-admin/promociones/editar/index.vue' /* webpackChunkName: "pages/ofer-admin/promociones/editar/index" */).then(m => m.default || m)
const _2b83a481 = () => import('../pages/ofer-admin/seo/categorias/index.vue' /* webpackChunkName: "pages/ofer-admin/seo/categorias/index" */).then(m => m.default || m)
const _2dc4085e = () => import('../pages/ofer-admin/categorias/editar/index.vue' /* webpackChunkName: "pages/ofer-admin/categorias/editar/index" */).then(m => m.default || m)
const _4c720c2c = () => import('../pages/ofer-admin/el-buen-fin/tiendas/nueva/index.vue' /* webpackChunkName: "pages/ofer-admin/el-buen-fin/tiendas/nueva/index" */).then(m => m.default || m)
const _1316f41e = () => import('../pages/ofer-admin/el-buen-fin/tiendas/seo/index.vue' /* webpackChunkName: "pages/ofer-admin/el-buen-fin/tiendas/seo/index" */).then(m => m.default || m)
const _c9b9f320 = () => import('../pages/ofer-admin/el-buen-fin/tiendas/editar/index.vue' /* webpackChunkName: "pages/ofer-admin/el-buen-fin/tiendas/editar/index" */).then(m => m.default || m)
const _2333695b = () => import('../pages/ofer-admin/el-buen-fin/tiendas/editar/_id/index.vue' /* webpackChunkName: "pages/ofer-admin/el-buen-fin/tiendas/editar/_id/index" */).then(m => m.default || m)
const _6602c63c = () => import('../pages/ofer-admin/categorias/editar/_id/index.vue' /* webpackChunkName: "pages/ofer-admin/categorias/editar/_id/index" */).then(m => m.default || m)
const _c686325c = () => import('../pages/ofer-admin/promociones/editar/_slug/index.vue' /* webpackChunkName: "pages/ofer-admin/promociones/editar/_slug/index" */).then(m => m.default || m)
const _431c25e8 = () => import('../pages/ofer-admin/tiendas/editar/_id/index.vue' /* webpackChunkName: "pages/ofer-admin/tiendas/editar/_id/index" */).then(m => m.default || m)
const _3178e532 = () => import('../pages/ofer-admin/tiendas/_id.vue' /* webpackChunkName: "pages/ofer-admin/tiendas/_id" */).then(m => m.default || m)
const _d0574b78 = () => import('../pages/ofer-admin/promociones/_slug/index.vue' /* webpackChunkName: "pages/ofer-admin/promociones/_slug/index" */).then(m => m.default || m)
const _48aa5f83 = () => import('../pages/promociones/_slug/index.vue' /* webpackChunkName: "pages/promociones/_slug/index" */).then(m => m.default || m)
const _87a063d0 = () => import('../pages/categorias/_id.vue' /* webpackChunkName: "pages/categorias/_id" */).then(m => m.default || m)
const _845b07e4 = () => import('../pages/el-buen-fin/_id.vue' /* webpackChunkName: "pages/el-buen-fin/_id" */).then(m => m.default || m)
const _4dff8db4 = () => import('../pages/tiendas/_id.vue' /* webpackChunkName: "pages/tiendas/_id" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
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
			path: "/privacidad",
			component: _2173285f,
			name: "privacidad"
		},
		{
			path: "/terminos",
			component: _8d069d76,
			name: "terminos"
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
			path: "/nosotros",
			component: _489086cf,
			name: "nosotros"
		},
		{
			path: "/categorias",
			component: _c144c0a0,
			name: "categorias"
		},
		{
			path: "/el-buen-fin",
			component: _79e6afb4,
			name: "el-buen-fin"
		},
		{
			path: "/ofer-admin/tiendas",
			component: _547ec73f,
			name: "ofer-admin-tiendas"
		},
		{
			path: "/el-buen-fin/tiendas",
			component: _2f4cd062,
			name: "el-buen-fin-tiendas"
		},
		{
			path: "/ofer-admin/login",
			component: _057a0920,
			name: "ofer-admin-login"
		},
		{
			path: "/ofer-admin/promociones",
			component: _4e1499c9,
			name: "ofer-admin-promociones"
		},
		{
			path: "/ofer-admin/tiendas/editar",
			component: _62510aa1,
			name: "ofer-admin-tiendas-editar"
		},
		{
			path: "/ofer-admin/promociones/nueva",
			component: _b7a922ba,
			name: "ofer-admin-promociones-nueva"
		},
		{
			path: "/ofer-admin/seo/tiendas",
			component: _38df140d,
			name: "ofer-admin-seo-tiendas"
		},
		{
			path: "/ofer-admin/categorias/nueva",
			component: _0dd75469,
			name: "ofer-admin-categorias-nueva"
		},
		{
			path: "/ofer-admin/tiendas/nueva",
			component: _e4c1a8ce,
			name: "ofer-admin-tiendas-nueva"
		},
		{
			path: "/ofer-admin/promociones/editar",
			component: _1d4d28d7,
			name: "ofer-admin-promociones-editar"
		},
		{
			path: "/ofer-admin/seo/categorias",
			component: _2b83a481,
			name: "ofer-admin-seo-categorias"
		},
		{
			path: "/ofer-admin/categorias/editar",
			component: _2dc4085e,
			name: "ofer-admin-categorias-editar"
		},
		{
			path: "/ofer-admin/el-buen-fin/tiendas/nueva",
			component: _4c720c2c,
			name: "ofer-admin-el-buen-fin-tiendas-nueva"
		},
		{
			path: "/ofer-admin/el-buen-fin/tiendas/seo",
			component: _1316f41e,
			name: "ofer-admin-el-buen-fin-tiendas-seo"
		},
		{
			path: "/ofer-admin/el-buen-fin/tiendas/editar",
			component: _c9b9f320,
			name: "ofer-admin-el-buen-fin-tiendas-editar"
		},
		{
			path: "/ofer-admin/el-buen-fin/tiendas/editar/:id?",
			component: _2333695b,
			name: "ofer-admin-el-buen-fin-tiendas-editar-id"
		},
		{
			path: "/ofer-admin/categorias/editar/:id?",
			component: _6602c63c,
			name: "ofer-admin-categorias-editar-id"
		},
		{
			path: "/ofer-admin/promociones/editar/:slug",
			component: _c686325c,
			name: "ofer-admin-promociones-editar-slug"
		},
		{
			path: "/ofer-admin/tiendas/editar/:id",
			component: _431c25e8,
			name: "ofer-admin-tiendas-editar-id"
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
			path: "/el-buen-fin/:id?",
			component: _845b07e4,
			name: "el-buen-fin-id"
		},
		{
			path: "/tiendas/:id",
			component: _4dff8db4,
			name: "tiendas-id"
		}
    ],
    fallback: false
  })
}
