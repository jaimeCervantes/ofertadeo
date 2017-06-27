'use strict';

var express = require('express');
var router = express.Router();
var CRUD = require('../db/crud.js');
var mkdirp = require('mkdirp');
var path = require('path');
import multer from 'multer'
var jimp = require('jimp')

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
      upload();
    }    
  });

  return router;
};

function getPath(file) {
  var date = new Date();
  var finalPath = path.join(__dirname, `../../static/uploads/${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}`);
  if(file) {
    finalPath = `${finalPath}/{file.originalname}`;
  }
  return finalPath;
}

function upload() {
  router.post('/upload', function(req, res) {
    return multerUpload(req, res, function (err) {
      if (err) {
        res.json(error);
      }

      var path = getPath();
      var file = req.files[0];
      var originalName = file.originalname
      var name = originalName.split('.')[0];
      var extension = originalName.split('.')[1];
      var filePath = `${path}/${originalName}`;

      jimp.read(filePath)
      .then(function (img) {
          img.resize(200, jimp.AUTO)         // resize
               .quality(60)                 // set JPEG quality
               .write(`${path}/${name}_thumb.${extension}`); // save
      }).catch(function (err) {
          res.json(err);
      });

      res.json({ success: true, img: filePath.split('static')[1], thumbnail: `${path.split('static')[1]}/${name}_thumb.${extension}`});
    });
  });
}

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var pathFile = getPath();
        mkdirPromise(pathFile)
        .then(function(success){
          var date = new Date();
          callback(null, pathFile);
        })
        .catch(function(err){
          console.log(err);
        })
        
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var multerUpload = multer({ storage: storage }).array("offerFile", 3); //Field name and max count

function mkdirPromise (pathFile) {
  return new Promise(function(resolve, reject){
    mkdirp(pathFile, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(`Directorio creado: ${pathFile}`);
      }
    });
  });
}