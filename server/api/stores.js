'use strict';

var express = require('express');
var router = express.Router();
var crudFn = require('../db/crud.js');
var ITEMS_PER_PAGE = 6;
var COLLECTION = 'stores';

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
      _id();
      index();
    }
  });

  return router;
};

function _id() {
  router.get('/stores/:_id', function(req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [
      crudInst.getItems({
        collection: conf.db.mainCollection,
        query: { store_id: req.params._id },
        items_per_page: ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE*page,
        projection: {name: 1, thumbnail: 1, store_id: 1, slug: 1, img: 1, img_alt:1, img_title:1 }
      }),
      crudInst.getItem({
        collection:  COLLECTION,
        query: {_id: req.params._id},
        projection: {name:1, thumbnail: 1, slug: 1, url_site: 1, content: 1, img: 1, img_alt:1, img_title: 1}
      }),
      crudInst.getPagination({
        query: { store_id: req.params._id },
        collection: conf.db.mainCollection
      })
    ];

    Promise.all(iterable)
    .then(function(results) {
      res.json({
          items: results[0],
          info: results[1],
          pagination: results[2]
        });
    })
    .catch(function(error) {
      res.json(error);
    });
  });
}

function index() {
  router.get('/stores', function(req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [
      crudInst.getItems({
        collection: COLLECTION,
        items_per_page: ITEMS_PER_PAGE, 
        skip: ITEMS_PER_PAGE*page,
        projection: { name: 1, slug: 1, thumbnail: 1, img_alt:1, img_title:1 }
      }),
      crudInst.getPagination({
        collection: COLLECTION
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
      console.log(error);
      res.json(error);
    });
  });
}