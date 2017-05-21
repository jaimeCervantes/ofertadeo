'use strict';

var express = require('express');
var router = express.Router();
var crudFn = require('../db/crud.js');
var ITEMS_PER_PAGE = 6;
var COLLECTION = 'catalogs';

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
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [
      crudInst.getItems({
        collection: COLLECTION,
        items_per_page: ITEMS_PER_PAGE, 
        skip: ITEMS_PER_PAGE*page,
        projection: { name: 1, thumbnail: 1, store_id: 1, slug: 1 }
      }),
      crudInst.getPagination({
        collection: COLLECTION,
      })
    ];

    Promise.all(iterable)
    .then(function(results) {
      console.log(results[1]);
      res.json({
          items: results[0],
          pagination: results[1]
        });
    })
    .catch(function(error) {
      res.json(error);
    });
  });
}