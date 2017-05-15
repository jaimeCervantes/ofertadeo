'use strict';

module.exports = {
  db: {
    user: "ofertadeo_user",
    password: "Cdo_2017*",
    name: 'ofertadeo',
    host: 'ds131621.mlab.com:31621',
    shard1: 'pensemosweb-shard-00-00-147ev.mongodb.net:27017',
    shard2: 'pensemosweb-shard-00-01-147ev.mongodb.net:27017',
    shard3: 'pensemosweb-shard-00-02-147ev.mongodb.net:27017',
    queryString: '?ssl=true&replicaSet=pensemosweb-shard-0&authSource=admin'
  },
  routes: {
    categories: '/categorias',
    categoriesList: '/categorias',
    stores: '/folletos-catalogos',
    storeList: '/tiendas'
  }
};