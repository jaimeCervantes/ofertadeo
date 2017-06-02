import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    sidebar: false,
    categories: [
      { _id: 'frutas-y-verduras', name: 'Frutas y Verduras', slug: 'frutas-y-verduras' },
      { _id: 'ventas-nocturnas', name: 'Ventas Nocturnas', slug: 'ventas-nocturnas' },
      { _id: 'abarrotes-y-alimentos', name: 'Abarrotes y alimentos', slug: 'abarrotes-y-alimentos' },
      { _id: 'celulares', name: 'Celulares', slug: 'celulares' },
      { _id: 'restaurantes', name: 'Restaurantes', slug: 'restaurantes' }
    ],
    stores: [
      { _id: '7-eleven', 'name': '7-Eleven', 'slug': '7-eleven' },
      { '_id': 'bodega-aurrera', 'name': 'Bodega Aurrera', 'slug': 'bodega-aurrera' },
      { '_id': 'bodegas-alianza', 'name': 'Bodegas Alianza', 'slug': 'bodegas-alianza' },
      { '_id': 'chedraui', 'name': 'Chedraui', 'slug': 'chedraui' },
      { _id: 'comercial-mexicana', 'name': 'Comercial Mexicana', 'slug': 'comercial-mexicana' }
    ],
    routes: {
      categories: '/categorias',
      categoriesList: '/categorias',
      stores: '/promociones',
      main: '/promociones',
      storeList: '/tiendas'
    },
    host: 'https://www.ofertadeo.com',
    txt: {
      categories: 'Categorías',
      stores: 'Tiendas'
    },
    publisher: {
      fb: 'https://www.facebook.com/ofertadeo',
      google: 'https://plus.google.com/110009950298317863923'
    }
  },
  mutations: {
    toggleSidebar (state) {
      state.sidebar = !state.sidebar
    }
  }
})

export default store
