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
  router.get('/home', function(req, res) {
    var iterable = [
      crudInst.getItems({ collection: 'catalogs',
        items_per_page: 6,
        projection: {title: 1, thumbnail: 1, store_id: 1, slug: 1 }
      })
    ];

    Promise.all(iterable)
    .then(function(results) {
      res.json({
          items: results[0]
        });
    })
    .catch(function(error) {
      res.json(error);
    });
  });
}