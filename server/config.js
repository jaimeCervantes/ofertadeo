var path = require('path')

var config = {
  db: {
   user: 'ofertadeo',
   password: 'Cdo_2017*',
   name: 'ofertadeo',
   host: 'ds161471.mlab.com:61471',
   shard1: 'pensemosweb-shard-00-00-147ev.mongodb.net:27017',
   shard2: 'pensemosweb-shard-00-01-147ev.mongodb.net:27017',
   shard3: 'pensemosweb-shard-00-02-147ev.mongodb.net:27017',
   queryString: '?ssl=true&replicaSet=pensemosweb-shard-0&authSource=admin',
   mainCollection: 'offers',
   itemsPerPage: 18,
    collections: {
      main: 'offers',
      secundary: 'stores',
      categories: 'categories',
      pages: 'pages',
      seo: 'seo'
    }
  },
  routes: {
    categories: '/categorias',
    categoriesList: '/categorias',
    stores: '/promociones',
    main: '/promociones',
    storeList: '/tiendas'
  },
  host: 'http://localhost:3000',
  paths: {
    root: path.resolve(__dirname, '../'),
    server: __dirname,
    static: '/home/jaime/static',
    xml: '/home/jaime/xml',
    feed: '/home/jaime/static/feed'
  },
  txt: {
    categories: 'Categorías',
    stores: 'Tiendas',
    feed: {
      title: 'Ofertadeo-develop',
      description: 'Encuentra las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad. ✓ ¡Ahorra con ofertadeo!'
    }
  },
  app_status: 'develop'
}

module.exports = config
