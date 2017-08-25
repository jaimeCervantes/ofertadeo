'use strict';

var express = require('express');
var router = express.Router();
var CRUD = require('../db/crud.js');
var csm = require('../utils/sitemaps/create-sitemap.js');
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
      index();
      createStore();
    }
  })
  .catch(function(err) {
    //some configuration to notify no database connection working
    console.log(err);
  });

  return router;
};

function _id() {
  router.get('/stores/:_id', function(req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [
      crudInst.getItems({
        collection: conf.db.collections.main,
        query: { 'stores._id': req.params._id },
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
          img_alt:1,
          img_title:1,
          categories: 1,
          published: 1,
          modified: 1
        }
      }),
      crudInst.getItem({
        collection:  conf.db.collections.secundary,
        query: {_id: req.params._id},
        projection: {name:1, thumbnail: 1, slug: 1, content: 1, url_site: 1, img: 1, img_alt:1, img_title: 1, img_data: 1}
      }),
      crudInst.getPagination({
        query: { 'stores._id': req.params._id },
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
  router.get('/stores', function(req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [
      crudInst.getItems({
        collection: conf.db.collections.secundary,
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
          img_title:1,
          published: 1,
          modified: 1
        }
      }),
      crudInst.getPagination({
        collection: conf.db.collections.secundary
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

function createStore () {
  router.post('/stores/new', function(req, res) {
    var rightNow = new Date();
    var data = Object.assign({ modified: rightNow, published: rightNow, _id: req.body.slug }, req.body);
    crudInst.setItem({
      collection: conf.db.collections.secundary,
      document: data
    })
    .then(function(dbResponse){
      res.json(dbResponse);
      return dbResponse;
    })
    .catch(function(err){
      console.log('Ocurrió un error al tratar de Guardar una Tienda:');
      console.log(err);
      res.json(err);
    })
    .then(function(dbResponse){
      if (dbResponse.result && dbResponse.result.ok ) {
        return crudInst.updateOne({
          collection: conf.db.collections.pages,
          query: { $set: { slug: '/tiendas' } },
          update: { modified: rightNow }
        });
      }
    })
    .catch(function(err) {
      console.log('Ocurrió un error al tratar de actualizar las paginas despues de guardar una promoción:')
      console.log(err);
    })
    .then(function(dbResponse) {
      if (dbResponse.result && dbResponse.result.ok ) {
        return true
      }
    })
    .then(function(result) {
      if(result) {
        csm.stores();
        csm.pages();
        csm.index();
      }
    })
    .catch(function(err){
      console.log(err);
    });
  });
}