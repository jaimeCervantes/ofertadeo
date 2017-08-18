'use strict';

var express = require('express');
var router = express.Router();
var CRUD = require('../db/crud.js');

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
  .then(function(){
    if(crudInst) {
      _id();
      index()
    } else {
      indexNoDB();
    }
  })
  .catch(function(err) {
    console.log(error);
  });

  return router;
};

function _id() {
  router.get('/categories/:_id', function(req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;

    var iterable = [
      crudInst.getItems({
        collection: conf.db.collections.main,
        query: { categories: req.params._id },
        items_per_page: conf.db.itemsPerPage,
        skip: conf.db.itemsPerPage*page,
        sort: { published: -1},
        projection: {
          name: 1,
          thumbnail: 1,
          stores: 1,
          slug: 1,
          img: 1,
          img_data: 1,
          img_alt: 1,
          img_title: 1,
          published: 1,
          modified: 1
        }
      }),
      crudInst.getItem({
        collection:  conf.db.collections.categories,
        query: {_id: req.params._id},
        projection: {name:1, thumbnail: 1, slug: 1, content: 1, img: 1, img_alt: 1, img_title: 1, img_data: 1}
      }),
      crudInst.getPagination({
        query: { categories: req.params._id },
        collection: conf.db.collections.main
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
  router.get('/categories', function(req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [
      crudInst.getItems({
        collection: conf.db.collections.categories,
        items_per_page: conf.db.itemsPerPage, 
        skip: conf.db.itemsPerPage*page,
        sort: { name: 1},
        projection: {
          name: 1,
          slug: 1,
          thumbnail: 1,
          img: 1,
          img_data: 1,
          img_alt:1,
          img_title: 1,
          published: 1,
          modified: 1
        }
      }),
      crudInst.getPagination({
        collection: conf.db.collections.categories
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