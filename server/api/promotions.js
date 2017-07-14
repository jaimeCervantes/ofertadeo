'use strict';

var express = require('express');
var router = express.Router();
var utils = require('./utils');
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
  .catch(function(err) {
    //some configuration to notify no database connection working
    console.log(err);
  })
  .then(function(){
    if(crudInst) {
      slug();
      getFormDataPromotions();
      createPromotion();
    }    
  });

  return router;
};

function slug() {
  router.get('/promotions/:slug', function(req, res) {
    var iterable = [
      crudInst.getItem({
        collection: conf.db.mainCollection,
        query: { slug: req.params.slug },
        items_per_page: 1,
        sort: { _id: -1}
      })
    ];

    return Promise.all(iterable)
          .then(function(results) {
            res.json({
                item: results[0]
              });
          })
          .catch(function(error) {
            res.json(error);
          });
        });
}


function getFormDataPromotions() {
  router.get('/formdata/promotions', function(req, res) {
    var iterable = [
      crudInst.getItems({
        collection: 'stores',
        items_per_page: 100,
        projection: { name: 1 },
        sort: { name: 1}
      }),
      crudInst.getItems({
        collection: 'categories',
        items_per_page: 100,
        projection: { name: 1 },
        sort: { name: 1}
      })
    ];

    Promise.all(iterable)
      .then(function(results) {
        res.json({
            stores: results[0],
            categories: results[1]
          });
      })
      .catch(function(error) {
        res.json(error);
      });

  });
}

function createPromotion () {
  router.post('/promotions/new', function(req, res) {
    var data = Object.assign({ modified: utils.getDate() }, req.body);
    crudInst.setItem({
      collection: conf.db.mainCollection,
      document: data
    })
    .then(function(result){
      res.json(result);
      if(result.insertedId) {
        // @TODO, when we use more than one category and more than one store, the updateOne 
        // operation should be execute for each element in the arrary categories and stores
        return Promise.all([
            crudInst.updateOne({
              collection: conf.db.collections.main,
              query: { _id: result.insertedId },
              update: { $set: { modified: utils.getDate() } }
            }),
            crudInst.updateOne({
              collection: conf.db.collections.secundary,
              query: { _id: data.stores[0] },
              update: { $set: { modified: utils.getDate() } }
            }),
            crudInst.updateOne({
              collection: conf.db.collections.categories,
              query: { _id: data.categories[0] },
              update: { $set: { modified: utils.getDate() } }
            })
          ])
      }
    })
    .then(function(results) {
      if(results && results.length > 0) {
        csm.pages()
        csm.offers()
        csm.index()
      }
    })
    .catch(function(err){
      res.json(err);
    });
  });
}