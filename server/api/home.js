'use strict';

var express = require('express');
var router = express.Router();
var crud = require('../db/crud.js');
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
      index();  
    } else {
      console.log('There is not database instance');
    }
    
  })
  .catch(function(err) {
    //some configuration to notify no database connection working
    console.log(err);
  });

  return router;
};

function index() {
  router.get('/home', function(req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [
      crudInst.getItems({
        collection: conf.db.collections.main,
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
          title: 1,
          published: 1,
          modified: 1
        }
      }),
      crudInst.getPagination({
        collection: conf.db.collections.main
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