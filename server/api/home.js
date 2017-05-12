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
      index();  
    } else {
      indexNoDB();
    }
    
  });

  return router;
};

function index() {
  router.get('/home', function(req, res) {
    var iterable = [
      crudInst.getItems({ collection: 'categories', items_per_page: 20}),
      crudInst.getItems({ collection: 'stores', items_per_page: 20, projection: {name: 1, slug: 1 } }),
      crudInst.aggregation(
          { collection: 'stores', 
          aggregation: [
            { $match: { "catalogs.0": { $exists: true}} },
            { $sort: { name: 1} },
            { $limit: 5 },
            { $project: { _id: 0, catalogs: 1}},
            { $unwind: "$catalogs" },
            { $project: { "catalogs.title": 1, "catalogs.thumbnail": 1}}
          ]
      })
    ];

    Promise.all(iterable)
    .then(function(results) {
      res.json({
          categories: results[0],
          stores: results[1],
          catalogs: results[2],
          routes: conf.routes
        });
    })
    .catch(function(error) {
      console.log(error)
      res.json(error);
    });
  });
}