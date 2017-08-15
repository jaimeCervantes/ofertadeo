'use strict';

var express = require('express');
var router = express.Router();
var CRUD = require('../db/crud.js');
var csm = require('../utils/sitemaps/create-sitemap.js');
var feed = require('../utils/feed/');
var pn = require('../utils/pn/');

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
        items_per_page: 1
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
        collection: conf.db.collections.secundary,
        items_per_page: 100,
        projection: { name: 1 },
        sort: { name: 1}
      }),
      crudInst.getItems({
        collection: conf.db.collections.categories,
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
    var rightNow = new Date();
    var data = Object.assign({ modified: rightNow, published: rightNow }, req.body);
    crudInst.setItem({
      collection: conf.db.collections.main,
      document: data
    })
    .then(function(result){
      res.json(result);
      if(result.insertedId) {
        // @TODO, when we use more than one category and more than one store, the updateOne 
        // operation should be execute for each element in the arrary categories and stores
        return Promise.all([
          crudInst.updateOne({
            collection: conf.db.collections.secundary,
            query: { _id: data.stores[0] },
            update: { $set: { modified: rightNow } }
          }),
          crudInst.updateOne({
            collection: conf.db.collections.categories,
            query: { _id: data.categories[0] },
            update: { $set: { modified: rightNow } }
          })
        ])
      }
    })
    .then(function(results) {
      if(results && results.length > 0) {
        csm.pages();
        csm.offers();
        csm.index();
        feed.create();
        pn.all({
          title: data.title,
          url: conf.host + conf.routes.main + '/' + data.slug,
          message: data.meta_description
          //,image_url: data.thumbnail
        });
      }
    })
    .catch(function(err){
      res.json(err);
    });
  });
}