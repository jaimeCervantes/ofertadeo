'use strict';

module.exports = CRUD;

function CRUD(params) {
  this.COLLECTION = params.collection;
  this.DATABASE = params.db;
  this.ITEMS_PER_PAGE = params.items_per_page || 6;
};

CRUD.prototype.getItems = function (params) {
  var db = this.DATABASE || params.db;
  var items_per_page = params.items_per_page || this.ITEMS_PER_PAGE;
  return db.collection(this.COLLECTION || params.collection)
    .find(params.query || {}, params.projection || {} )
    .sort(params.sort || { _id: 1})
    .skip(params.skip || 0)
    .limit(items_per_page)
    .toArray()
    .then(function(docs) {
      if (items_per_page > 1) {
        return docs;
      } else {
        return docs[0];
      }
    })
    .catch(function(err) {
      return err;
    });
};

CRUD.prototype.getItem = function (params) {
  params.items_per_page = 1;
  return this.getItems(params);
};

CRUD.prototype.setItem = function (params) {
  var db = this.DATABASE || params.db;
  return db.collection(params.collection || this.COLLECTION)
    .insertOne(params.document)
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      return err;
    });
}

CRUD.prototype.searchItems = function (params) {
  var db = this.DATABASE || params.db;
  return db.collection(this.COLLECTION || params.collection)
    //we project the textScore meta data and then we sort the results by the best matches first
    .find(params.query, params.projection || { score: { $meta: 'textScore'} })
    .sort(params.sort || { score: { $meta: 'textScore'} })
    .skip(params.skip || 0)
    .limit(params.items_per_page || this.ITEMS_PER_PAGE)
    .toArray()
    .then(function(docs) {
      return docs;
    })
    .catch(function(err) {
      return err;
    });
};

CRUD.prototype.getPagination = function (params) {
  var that = this;
  var db = that.DATABASE || params.db;
  return db.collection(this.COLLECTION || params.collection)
    .find(params.query || {})
    .count()
    .then(function(numItems){
      var items_per_page = params.items_per_page || that.ITEMS_PER_PAGE;
      var numPages = 0;
      if (numItems > items_per_page ) {
        numPages = Math.ceil(numItems/items_per_page);
      }
      return {
        pages: numPages,
        total: numItems
      };
    })
    .catch(function(err){
      return err;
    });
};

CRUD.prototype.aggregation = function (params) {
  var db = this.DATABASE || params.db;
  return db.collection(this.COLLECTION || params.collection)
    .aggregate(params.aggregation)
    .toArray()
    .then(function(data){
      return data
    })
    .catch(function(err){
      return err
    });
};