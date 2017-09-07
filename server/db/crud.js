'use strict';
module.exports = function crud(spec, shared) {
  let that = {};
  spec = spec || {};
  shared = shared || {}

  spec.DATABASE = spec.db || spec.config.db.name;
  spec.COLLECTION = spec.collection || spec.config.db.collections.main;
  spec.ITEMS_PER_PAGE = spec.items_per_page || spec.config.db.itemsPerPage;

  let getItems = function (params) {
    let db = params.db || spec.DATABASE;
    let items_per_page = params.items_per_page || spec.ITEMS_PER_PAGE;
    let cursor = db.collection(params.collection || spec.COLLECTION )
      .find(params.query || {}, params.projection || {} );

    if (params.sort) {
      cursor.sort(params.sort);
    }

    if (params.skip) {
      cursor.skip(params.skip);
    }
    
    return cursor.limit(items_per_page)
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

  let getItem = function (params) {
    params.items_per_page = 1;
    return getItems(params);
  };

  let setItem = function (params) {
    let db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION)
      .insertOne(params.document)
      .then(function(res) {
        return res;
      })
      .catch(function(err) {
        return err;
      });
  }

  let updateOne = function (params) {
    let db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION)
    .updateOne(params.query, params.update)
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      return err;
    });
  }

  let update = function (params) {
    let db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION)
    .update(params.query, params.update, params.options)
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      return err;
    });
  }

  let searchItems = function (params) {
    let db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION)
      //we project the textScore meta data and then we sort the results by the best matches first
      .find(params.query, params.projection || { score: { $meta: 'textScore'} })
      .sort(params.sort || { score: { $meta: 'textScore'} })
      .skip(params.skip || 0)
      .limit(params.items_per_page || spec.ITEMS_PER_PAGE)
      .toArray()
      .then(function(docs) {
        return docs;
      })
      .catch(function(err) {
        return err;
      });
  };

  let getPagination = function (params) {
    let db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION)
      .count(params.query || {})
      .then(function(numItems){
        let items_per_page = params.items_per_page || spec.ITEMS_PER_PAGE;
        let numPages = 0;
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

  let aggregation = function (params) {
    let db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION )
      .aggregate(params.aggregation)
      .toArray()
      .then(function(data){
        return data
      })
      .catch(function(err){
        return err
      });
  };

  that.getItems = getItems;
  that.getItem = getItem;
  that.setItem = setItem;
  that.updateOne = updateOne;
  that.update = update;
  that.searchItems = searchItems;
  that.getPagination = getPagination;
  that.aggregation = aggregation;

  return that;

};

