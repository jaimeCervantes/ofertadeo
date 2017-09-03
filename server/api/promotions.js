'use strict';

var express = require('express');
var router = express.Router();
var crud = require('../db/crud.js');
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
    crudInst = crud({ db:db });
  })
  .then(function(){
    if(crudInst) {
      slug();
      getFormDataPromotions();
      savePromotion('create', function (data, req){
        return crudInst.setItem({ collection: conf.db.collections.main, document: data });
      });
      savePromotion('update', function (data, req){
        return crudInst.updateOne({ collection: conf.db.collections.main, query: { slug: req.params.slug }, update: { $set: data } });
      });
    }    
  })
  .catch(function(err) {
    //some configuration to notify no database connection working
    console.log(err);
  });

  return router;
};

function slug() {
  router.get('/promotions/:slug', function(req, res) {
    var iterable = [
      crudInst.getItem({
        collection: conf.db.collections.main,
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

  router.get('/formdata/promotions/:slug', function(req, res) {
    var iterable = [
      crudInst.getItem({
        collection: conf.db.collections.main,
        query: { slug: req.params.slug },
        items_per_page: 1
      }),
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
            item: results[0],
            allStores: results[1],
            allCategories: results[2]
          });
      })
      .catch(function(error) {
        res.json(error);
      });
  });
}

function updateStoresAndCategories (data, date) {
  let iterable = data.categories.map(function(currCat) {
        return crudInst.updateOne({ collection: conf.db.collections.categories, query: { _id: currCat._id }, update: { $set: { modified: date } } });
      });
  //We are not using map because then we have to merge with concat and left two arrays of promises running
  data.stores.forEach(function(currStore){
    iterable.push(crudInst.updateOne({ collection: conf.db.collections.secundary, query: { _id: currStore._id }, update: { $set: { modified: date } } }));
  });

  return Promise.all(iterable);
}
function updateSitemaps() {
  //Update sitemaps
  return new Promise(function(resolve, reject) {
    return Promise.all([csm.pages(), csm.offers(), csm.stores(), csm.categories()])
    .then(function(results) {
      if(results && results.length > 0) {
        csm.index().then(function(res){
          resolve(res);
        });
      }
    })
    .catch(function(err){
      reject(Error(err));
    });
  });  
}
function sendPushNotification(data) {
  //Push notifications
  pn.all({
    title: data.title,
    url: conf.host + conf.routes.main + '/' + data.slug,
    message: data.meta_description
    //@TODO: To set an image to the notifications using pushcrew, we need to create an PNG imgage 192X192
    //,image_url: data.thumbnail
  });
}
function savePromotion(operation, cb) {
  var urls = { create: '/promotions/new', update: '/promotions/edit/:slug' };
  router.post(urls[operation], function(req, res) {
    var rightNow = new Date(), missingData = { modified: rightNow };
    if( operation === 'create') {
      missingData.published = rightNow;
    }
    var data = Object.assign(missingData, req.body);
    cb(data, req)
    .then(function(dbResponse){
      res.json(dbResponse);
      return dbResponse;
    })
    .catch(function(err){
      console.log('Ocurrió un error al tratar de Guardar una promoción:');
      console.log(err);
      res.json(err);
    })
    .then(function(dbResponse){
      if (dbResponse.result && dbResponse.result.ok ) {
        sendPushNotification(data);
        return crudInst.update({
          collection: conf.db.collections.pages,
          query: {},
          update: { $set: { modified: rightNow } },
          options: { multi: true }
        })
      }
    })
    .catch(function(err) {
      console.log('Ocurrió un error al tratar de actualizar las paginas despues de guardar una promoción:')
      console.log(err);
    })
    .then(function(dbResponse) {
      if (dbResponse && dbResponse.result && dbResponse.result.ok ) {
        return updateStoresAndCategories({ stores: data.stores, categories: data.categories }, rightNow);
      } else {
        return Error(dbResponse);
      }
    })
    .catch(function(err) {
      console.log('Ocurrió un error al tratar de actualizar tiendas y categorias despues de guardar una promoción:')
      console.log(err);
    })
    .then(function(results) {
      if(results && results.length > 0) {
          //Update feed
        feed.create();
        return updateSitemaps();
      }
    })
    .catch(function(err) {
      console.log('Ocurrió un error al tratar de actualizar los sitemas y el feed despues de guardar una promoción:')
      console.log(err);
    });  
  });
}
