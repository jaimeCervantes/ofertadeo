export default {
  categories: [
    { _id: 'frutas-y-verduras', name: 'Frutas y Verduras', slug: 'frutas-y-verduras' },
    { _id: 'ropa-y-zapatos', name: 'Ropa y zapatos', slug: 'ropa-y-zapatos' },
    { _id: 'abarrotes-y-alimentos', name: 'Abarrotes y alimentos', slug: 'abarrotes-y-alimentos' },
    { _id: 'folletos-y-catalogos', name: 'Folletos y catálogos', slug: 'folletos-y-catalogos' }
  ],
  stores: [
    { _id: 'bodega-aurrera', 'name': 'Bodega Aurrera', 'slug': 'bodega-aurrera' },
    { _id: 'soriana', 'name': 'Soriana', 'slug': 'soriana' },
    { _id: 'chedraui', 'name': 'Chedraui', 'slug': 'chedraui' },
    { _id: 'walmart', 'name': 'Walmart', 'slug': 'walmart' },
    { _id: 'comercial-mexicana', 'name': 'Comercial Mexicana', 'slug': 'comercial-mexicana' },
    { _id: 'la-comer', 'name': 'La Comer', 'slug': 'la-comer' },
    { _id: 'heb', 'name': 'HEB', 'slug': 'heb' },
    { _id: 'liverpool', 'name': 'Liverpool', 'slug': 'liverpool' },
    { _id: 'fabricas-de-francia', 'name': 'Fábricas de Francia', 'slug': 'fabricas-de-francia' },
    { _id: 'sams-club', 'name': 'Sam\'s Club', 'slug': 'sams-club' }
  ],
  routes: {
    categories: '/categorias',
    categoriesList: '/categorias',
    stores: '/promociones',
    main: '/promociones',
    storeList: '/tiendas'
  },
  host: 'http://localhost:3000',
  urlLogo: 'http://localhost:3000/logo.png',
  txt: {
    categories: 'Categorías',
    stores: 'Tiendas'
  },
  publisher: {
    fb: 'https://www.facebook.com/ofertadeo',
    google: 'https://plus.google.com/110009950298317863923',
    twitter: 'https://twitter.com/ofertadeo',
    youtube: 'https://www.youtube.com/channel/UCG8yl6wupq3kHem9SE4qa0g',
    pinterest: 'https://es.pinterest.com/ofertadeo/'
  },
  feed: {
    rss: 'http://feeds.feedburner.com/ofertadeo-develop'
  }
}
