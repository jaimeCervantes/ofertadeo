'use strict';

var wagner = require('wagner-core');
var path = require('path');

var config = {
  db: {
    user: "ofertadeo",
    password: "Cdo_2017*",
    name: 'ofertadeo',
    host: 'ds161471.mlab.com:61471',
    shard1: 'pensemosweb-shard-00-00-147ev.mongodb.net:27017',
    shard2: 'pensemosweb-shard-00-01-147ev.mongodb.net:27017',
    shard3: 'pensemosweb-shard-00-02-147ev.mongodb.net:27017',
    queryString: '?ssl=true&replicaSet=pensemosweb-shard-0&authSource=admin',
    mainCollection: 'offers',
    itemsPerPage: 12,
    collections: {
      main: 'offers',
      secundary: 'stores',
      categories: 'categories',
      pages: 'pages'
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
    static:  path.resolve(__dirname, '../static')
  }
};

module.exports = function (wagner) {
  if (wagner) {
    wagner.factory('config', function (){
      return config;
    });
  }
  return config;
};

module.exports.config = config;