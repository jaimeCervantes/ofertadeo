'use strict';

var express = require('express');
var router = express.Router();
var crudFn = require('../db/crud.js');

var crudInst;
var conf;
module.exports = function(wagner, params) {
  wagner.invoke(function(conn, config) {
    conf = config;
    return conn;
  })
  .then(function(db){
    crudInst = crudFn({
      db:db
    });
  })
  .catch(function(err) {
    //some configuration to notify no database connection working
    console.log(err);
  })
  .then(function(){
    if(crudInst) {
      index();  
    } else {
      indexNoDB();
    }
    
  });

  return router;
};

function index() {
  router.get('/', function(req, res) {
    var iterable = [
      crudInst.getItems({ collection: 'categories', items_per_page: 20}),
      crudInst.getItems({ collection: 'stores', items_per_page: 20, projection: {name: 1, slug: 1} })
    ];

    Promise.all(iterable)
    .then(function(results){
      res.render('index', { title: 'Ofertadeo titulo', 
          categories: results[0],
          stores: results[1],
          routes: conf.routes
        });
    });
  });
}

function indexNoDB() {
  router.get('/', function(req, res) {
    res.render('index', { message: 'Lo sentimos, no tenemos datos, estamos trabajando duro para arreglar este problema.'});  
  });
}