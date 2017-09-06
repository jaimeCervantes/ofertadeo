'use strict';

var router = require('express').Router();
var crud = require('../db/crud.js');
var csm = require('../utils/sitemaps/create-sitemap.js');
var feed = require('../utils/feed/');
var pn = require('../utils/pn/');

module.exports = function(wagner, params) {
  let conf;
  wagner.invoke(function(conn, config) {
    conf = config;
    return conn;
  })
  .then(function(db){
    return {
      crud: crud({ db:db }),
      config: conf
    };
  })
  .then(function(resp){
    if(resp && resp.crud && resp.config) {
      resp.router = router;
      slug(resp);
      getFormDataPromotions(resp);
      savePromotion(Object.assign({ path: '/promotions/new' }, resp));
      savePromotion(Object.assign({ path: '/promotions/edit/:slug' }, resp));
    }    
  })
  .catch(function(err) {
    //some configuration to notify no database connection working
    console.log(err);
  });

  return router;
};

// We can define functions after use them because of function hoisting
function slug(params) {
  params.router.get('/promotions/:slug', function(req, res) {
    var iterable = [
      params.crudInst.getItem({
        collection: params.conf.db.collections.main,
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


function getFormDataPromotions(params) {
  let conf = params.config;
  let crudInst = params.crud;
  let router = params.router;

  // formdata for create and edit promotions
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

  // get an specific promotions, query by slug property
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

function updateStoresAndCategories (data, params) {
  let iterable = data.categories.map(function(currCat) {
        return params.crud.updateOne({
          collection: params.config.db.collections.categories,
          query: { _id: currCat._id },
          update: { $set: { modified: params.date } } 
        });
      });

  //We are not using map because then we have to merge with concat and left two arrays of promises running
  data.stores.forEach(function(currStore){
    iterable.push(crud.updateOne({
      collection: params.config.db.collections.secundary,
      query: { _id: currStore._id },
      update: { $set: { modified: params.date } } 
    }));
  });

  return Promise.all(iterable);
}

function updateSitemaps() {
  
  //Update sitemaps
  return new Promise(function(resolve, reject) {
    return Promise.all([
      csm.pages(),
      csm.offers(),
      csm.stores(),
      csm.categories()
    ])
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

function savePromotion(params) {
  let conf = params.config;
  let crudInst = params.crud;

  router.post(params.path, function(req, res) {
    let rightNow = new Date(), missingData = { modified: rightNow };
    let data = Object.assign(missingData, req.body);

    if(!data.pusblished) {
      data.pusblished = rightNow;
    }

    crudInst.update({
      collection: conf.db.collections.main,
      query: { slug: req.params.slug },
      update: { $set: data },
      options: {
        upsert: true
      }
    })
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
        
        return updateStoresAndCategories(
          {
            stores: data.stores,
            categories: data.categories
          },
          {
            crud: crudInst,
            config: conf,
            date: rightNow
          }
        );
        
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
