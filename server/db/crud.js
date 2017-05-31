'use strict';

var DATABASE;
var COLLECTION;
var ITEMS_PER_PAGE;

module.exports = function(params) {
  COLLECTION = params.collection;
  DATABASE = params.db;
  ITEMS_PER_PAGE = params.items_per_page || 6;

  return {
    getPagination: getPagination,
    getItems: getItems,
    getItem: getItem,
    searchItems: searchItems,
    aggregation: aggregation
  };
};

function getItems(params) {
  var db = DATABASE || params.db;
  var items_per_page = params.items_per_page || ITEMS_PER_PAGE;
  return db.collection(COLLECTION || params.collection)
    .find(params.query || {}, params.projection || {} )
    .sort(params.sort || { _id: 1})
    .skip(params.skip || 0)
    .limit(items_per_page)
    .toArray()
    .then(function(docs) {
      if (items_per_page > 1) {
        return docs;
      } else {
        console.log(docs[0]);
        return docs[0];
      }
    })
    .catch(function(err) {
      return err;
    });
}

function getItem(params) {
  params.items_per_page = 1;
  return getItems(params);
}

function searchItems(params) {
  var db = DATABASE || params.db;
  return db.collection(COLLECTION || params.collection)
    //we project the textScore meta data and then we sort the results by the best matches first
    .find(params.query, params.projection || { score: { $meta: 'textScore'} })
    .sort(params.sort || { score: { $meta: 'textScore'} })
    .skip(params.skip || 0)
    .limit(params.items_per_page || ITEMS_PER_PAGE)
    .toArray()
    .then(function(docs) {
      return docs;
    })
    .catch(function(err) {
      return err;
    });
}

function getPagination(params) {
  var db = DATABASE || params.db;
  return db.collection(COLLECTION || params.collection)
    .find(params.query || {})
    .count()
    .then(function(numItems){
      var items_per_page = params.items_per_page || ITEMS_PER_PAGE;
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
}

function aggregation(params) {
  var db = DATABASE || params.db;
  return db.collection(COLLECTION || params.collection)
    .aggregate(params.aggregation)
    .toArray()
    .then(function(data){
      return data
    })
    .catch(function(err){
      return err
    });
}