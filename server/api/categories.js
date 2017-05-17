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
      _id();
      index()
    } else {
      indexNoDB();
    }
    
  });

  return router;
};

function _id() {
  router.get('/categories/:_id', function(req, res) {
    var iterable = [
      crudInst.getItems({
        collection: 'catalogs',
        query: { categories: req.params._id },
        items_per_page: 6, 
        projection: {title: 1, thumbnail: 1, store_id: 1, slug: 1 } })
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

function index() {
  router.get('/categories', function(req, res) {
    var iterable = [
      crudInst.getItems({ collection: 'categories', items_per_page: 20}),
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