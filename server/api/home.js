'use strict';

var express = require('express');
var router = express.Router();
var CRUD = require('../db/crud.js');
var COLLECTION = 'offers';

var crudInst;
var conf;
module.exports = function(wagner, params) {
  wagner.invoke(function(conn, config) {
    conf = config;
    return conn;
  })
  .then(function(db){
    crudInst = new CRUD({
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
        items_per_page: conf.db.itemsPerPage, 
        skip: conf.db.itemsPerPage*page,
        sort: { _id: -1},
        projection: { name: 1, thumbnail: 1, store_id: 1, stores: 1, slug: 1, img_alt:1, img_title: 1, title: 1 }
      }),
      crudInst.getPagination({
        collection: COLLECTION,
      })
    ];

    Promise.all(iterable)
    .then(function(results) {
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