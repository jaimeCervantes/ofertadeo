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
  .catch(function(err) {
    //some configuration to notify no database connection working
    console.log(err);
  })
  .then(function(){
    if(crudInst) {
      slug();  
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