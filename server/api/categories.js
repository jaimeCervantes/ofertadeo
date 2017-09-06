'use strict';

let express = require('express');
let router = express.Router();
let crud = require('../db/crud.js');

module.exports = function(wagner, params) {
  let conf;
  wagner.invoke(function(conn, config) {
    conf = config;
    return conn;
  })
  .then(function(db){
    return {
      crud: crud({ db: db }),
      config: conf
    };
  })
  .then(function(resp){
    if(resp && resp.crud && resp.config) {
      resp.router = router;
      _id(resp);
      index(resp);
    } else {
      console.log('There is not database instance')
    }
  })
  .catch(function(error) {
    console.log(error);
  });

  return router;
};

// We can define functions after use them because of function hoisting
function _id(params) {
  let conf = params.config;
  let crudInst = params.crud;
  params.router.get('/categories/:_id', function(req, res) {
    let page = req.query.page ? Number(req.query.page) : 0;

    let iterable = [
      crudInst.getItems({
        collection: conf.db.collections.main,
        query: { 'categories._id': req.params._id },
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
        query: { _id: req.params._id },
        projection: {
          name:1,
          thumbnail: 1,
          slug: 1,
          content: 1,
          img: 1,
          img_alt: 1,
          img_title: 1,
          img_data: 1
        }
      }),
      crudInst.getPagination({
        query: { 'categories._id': req.params._id },
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

function index(params) {
  let conf = params.config;
  let crudInst = params.crud;
  params.router.get('/categories', function(req, res) {
    let page = req.query.page ? Number(req.query.page) : 0;
    let iterable = [
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