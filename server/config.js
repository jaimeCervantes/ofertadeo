var path = require('path')

var config = {
  db: {
    user: 'ofertadeo_publisher',
    password: 'Cdop_2017*',
    name: 'ofertadeo',
    host: 'localhost:27017',
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
  host: 'https://www.ofertadeo.com',
  paths: {
    root: path.resolve(__dirname, '../'),
    server: __dirname,
    static: '/home/jaime/static',
    xml: '/home/jaime/xml',
    feed: '/home/jaime/static/feed'
  },
  app_status: 'deploy'
}

module.exports = config
