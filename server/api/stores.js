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
  router.get('/stores/:_id', function(req, res) {
    var iterable = [
      crudInst.getItems({ collection: 'categories', items_per_page: 20}),
      crudInst.getItems({ collection: 'stores', items_per_page: 20, projection: {name: 1, slug: 1 } }),
      crudInst.getItems({
        collection: 'catalogs',
        query: { store_id: req.params._id },
        items_per_page: 6, 
        projection: {title: 1, thumbnail: 1, store_id: 1 } })
    ];

    Promise.all(iterable)
    .then(function(results) {
      res.json({
          categories: results[0],
          stores: results[1],
          catalogs: results[2],
          routes: conf.routes
        });
    })
    .catch(function(error) {
      console.log(error)
      res.json(error);
    });
  });
}