'use strict';

var wagner = require('wagner-core');
var path = require('path');

var config = {
  db: {
    user: "ofertadeo_user",
    password: "Cdo_2017*",
    name: 'ofertadeo',
    host: 'ds131621.mlab.com:31621',
    shard1: 'pensemosweb-shard-00-00-147ev.mongodb.net:27017',
    shard2: 'pensemosweb-shard-00-01-147ev.mongodb.net:27017',
    shard3: 'pensemosweb-shard-00-02-147ev.mongodb.net:27017',
    queryString: '?ssl=true&replicaSet=pensemosweb-shard-0&authSource=admin',
    mainCollection: 'offers'
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