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
  .then(function() {
    if(crudInst) {
      save();
      get();
    }
  })
  .catch(function(err) {
    //some configuration to notify no database connection working
    console.log(err);
  });

  return router;
};

function get() {
  router.get('/seo/:id', function (req, res) {
    crudInst.getItem({
      collection: conf.db.collections.seo,
      query: { _id: req.params.id }
    })
    .then(function(dbRes){
      res.json(dbRes);
      return dbRes
    })    
    .catch(function(err) {
      console.log('Ocurrió un error al tratar de conseguir la configuracion seo de tiendas:');
      console.log(err);
      res.json(err);
    });
  });
}

function save() {
  router.post('/seo/:id', function(req, res) {
    let rightNow = new Date();
    let missingData = { modified: rightNow };
    
    if(!req.body.date) {
      missingData.date = rightNow;
    }

    crudInst.update({
      collection: conf.db.collections.seo,
      query: { _id: req.params.id },
      update: Object.assign(missingData, req.body),
      options: { upsert: true }
    })
    .then(function(dbRes) {
      res.json(dbRes);
      return dbRes;
    })
    .catch(function(err) {
      console.log('Ocurrió un error al tratar de Guardar la configuracion seo de tiendas:');
      console.log(err);
      res.json(err);
    });
  });
}