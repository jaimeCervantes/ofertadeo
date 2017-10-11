require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(3);

var config = {
  db: {
    user: 'ofertadeo_publisher',
    password: 'Cdop_2017*',
    name: 'ofertadeo',
    host: 'localhost:27017',
    shard1: 'pensemosweb-shard-00-00-147ev.mongodb.net:27017',
    shard2: 'pensemosweb-shard-00-01-147ev.mongodb.net:27017',
    shard3: 'pensemosweb-shard-00-02-147ev.mongodb.net:27017',
    queryString: '?ssl=true&replicaSet=pensemosweb-shard-0&authSource=admin',
    mainCollection: 'offers',
    itemsPerPage: 18,
    collections: {
      main: 'offers',
      secundary: 'stores',
      categories: 'categories',
      pages: 'pages',
      seo: 'seo'
    },
    collation: {
      locale: 'es'
    }
  },
  routes: {
    categories: '/categorias',
    categoriesList: '/categorias',
    stores: '/promociones',
    main: '/promociones',
    storeList: '/tiendas'
  },
  host: 'https://www.ofertadeo.com',
  paths: {
    root: path.resolve(__dirname, '../'),
    server: __dirname,
    static: '/home/jaime/static',
    xml: '/home/jaime/xml',
    feed: '/home/jaime/static/feed'
  },
  txt: {
    categories: 'Categorías',
    stores: 'Tiendas',
    feed: {
      title: 'Ofertas y Promociones en México - Ofertadeo',
      description: 'Encuentra las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad. ✓ ¡Ahorra con ofertadeo!'
    }
  },
  app_status: 'deploy'
};

module.exports = config;
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var crud = __webpack_require__(6);
var config = __webpack_require__(0);
var conn = __webpack_require__(5)(config);

function getCrud() {
  return conn.then(function (db) {
    return crud({ db: db, config: config });
  });
}

function formatDateStr(date, format) {
  var dateStr = new Date(date);
  if (format && format.toUpperCase() === 'GMT') {
    return dateStr.toGMTString().split('GMT')[0] + '-0500';
  }
  return dateStr.toISOString().split('.')[0] + '-05:00';
}

function getDate(dateObj, format) {
  var date;
  if (dateObj) {
    date = new Date(dateObj);
  } else {
    date = new Date();
  }

  var substract = date.getTime() - 300 * 60 * 1000; // minus 5 hrs

  return formatDateStr(substract, format);
}

function checkIfNewOffers() {
  return getCrud().then(function (crud) {
    return crud.getItem({
      collection: config.db.collections.main,
      query: {},
      sort: { published: -1 },
      projection: { published: 1 }
    });
  }).then(function (doc) {
    var lastOfferDate = new Date(doc.published);
    var lastOfferDateTime = new Date(doc.published).getTime();
    var hours = 12 * 60 * 60 * 1000;
    var minus12hrsDateTime = new Date().getTime() - hours;
    var minus12hrsDate = new Date(minus12hrsDateTime);
    var resp = {
      lastOffer: doc.published,
      lastOfferDate: getDate(lastOfferDate),
      lastOfferDateTime: lastOfferDateTime,
      minus12hrsDate: getDate(minus12hrsDate),
      minus12hrsDateTime: minus12hrsDateTime,
      news: false
    };

    if (lastOfferDateTime >= minus12hrsDateTime) {
      resp.news = true;
      return resp;
    }

    return resp;
  });
}

module.exports = {
  getDate: getDate,
  checkIfNewOffers: checkIfNewOffers,
  getCrud: getCrud
};

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var MongoClient = __webpack_require__(37).MongoClient;

module.exports = function (config) {
  // connPromise is pending when trying to connect to mongodb atlas
  // var shards = config.db.shard1 + ',' + config.db.shard2 + ',' + config.db.shard3;
  // var url = 'mongodb://' + config.db.user + ':' + config.db.password + '@' + shards + '/' + config.db.name + config.db.queryString;
  var url = 'mongodb://' + config.db.user + ':' + config.db.password + '@' + config.db.host + '/' + config.db.name;

  return MongoClient.connect(url).then(function (conn) {
    console.log('It is connected to db: ' + config.db.name + ' in ' + config.db.host);
    return conn;
  }).catch(function (err) {
    console.log(err);
    return err;
  });
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function crud(spec, shared) {
  var that = {};
  spec = spec || {};
  shared = shared || {};

  spec.DATABASE = spec.db || spec.config.db.name;
  spec.COLLECTION = spec.collection || spec.config.db.collections.main;
  spec.ITEMS_PER_PAGE = spec.items_per_page || spec.config.db.itemsPerPage;

  var getItems = function getItems(params) {
    var db = params.db || spec.DATABASE;
    var itemsPerPage = params.items_per_page || spec.ITEMS_PER_PAGE;
    var cursor = db.collection(params.collection || spec.COLLECTION).find(params.query || {}, params.projection || {});

    if (params.sort) {
      cursor.sort(params.sort);
    }

    if (params.skip) {
      cursor.skip(params.skip);
    }

    return cursor.limit(itemsPerPage).toArray().then(function (docs) {
      if (itemsPerPage > 1) {
        return docs;
      } else {
        return docs[0];
      }
    }).catch(function (err) {
      return err;
    });
  };

  var getItem = function getItem(params) {
    params.items_per_page = 1;
    return getItems(params);
  };

  var setItem = function setItem(params) {
    var db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION).insertOne(params.document).then(function (res) {
      return res;
    }).catch(function (err) {
      return err;
    });
  };

  var updateOne = function updateOne(params) {
    var db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION).updateOne(params.query, params.update).then(function (res) {
      return res;
    }).catch(function (err) {
      return err;
    });
  };

  var update = function update(params) {
    var db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION).update(params.query, params.update, params.options).then(function (res) {
      return res;
    }).catch(function (err) {
      return err;
    });
  };

  var searchItems = function searchItems(params) {
    var db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION)
    // we project the textScore meta data and then we sort the results by the best matches first
    .find(params.query, params.projection || { score: { $meta: 'textScore' } }).sort(params.sort || { score: { $meta: 'textScore' } }).skip(params.skip || 0).limit(params.items_per_page || spec.ITEMS_PER_PAGE).toArray().then(function (docs) {
      return docs;
    }).catch(function (err) {
      return err;
    });
  };

  var getPagination = function getPagination(params) {
    var db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION).count(params.query || {}).then(function (numItems) {
      var itemsPerPage = params.items_per_page || spec.ITEMS_PER_PAGE;
      var numPages = 0;
      if (numItems > itemsPerPage) {
        numPages = Math.ceil(numItems / itemsPerPage);
      }
      return {
        pages: numPages,
        total: numItems
      };
    }).catch(function (err) {
      return err;
    });
  };

  var aggregate = function aggregate(params) {
    var db = params.db || spec.DATABASE;
    return db.collection(params.collection || spec.COLLECTION).aggregate(params.pipeline, params.options).toArray().then(function (data) {
      return data;
    }).catch(function (err) {
      return err;
    });
  };

  that.getItems = getItems;
  that.getItem = getItem;
  that.setItem = setItem;
  that.updateOne = updateOne;
  that.update = update;
  that.searchItems = searchItems;
  that.getPagination = getPagination;
  that.aggregate = aggregate;

  return that;
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var utils = __webpack_require__(1);
var smUtils = __webpack_require__(34);
var config = __webpack_require__(0);
var fs = __webpack_require__(2);
var request = __webpack_require__(9);
var rootXml = config.paths.xml;
var offers = 'sitemap-offers.xml';
var pagesName = 'sitemap-pages.xml';
var storesName = 'sitemap-stores.xml';
var categoriesName = 'sitemap-categories.xml';

function getData(params) {
  return utils.getCrud().then(function (crud) {
    return crud.getItems({
      collection: params.collection || config.db.collections.main,
      query: params.query || {},
      projection: params.projection || { slug: 1, modified: 1, img: 1, img_title: 1, img_alt: 1 },
      items_per_page: params.items_per_page || 10000,
      sort: { published: -1 }
    }).catch(function (err) {
      return err;
    });
  }).catch(function (err) {
    return err;
  });
}

function smPages() {
  var modified = utils.getDate();
  var compoundSitemap = smUtils.createSitemap();

  compoundSitemap.add({ url: '/', changefreq: 'daily', priority: 1.0, lastmodISO: modified });

  return getData({ collection: config.db.collections.pages }).then(function (data) {
    return smUtils.addToSitemap(compoundSitemap, data, {
      route: '',
      changefreq: 'weekly',
      priority: 0.7
    });
  }).then(function (algo) {
    return smUtils.createSitemapFile(compoundSitemap, {
      sitemap_path: rootXml + '/' + pagesName,
      sitemapName: pagesName
    });
  }).catch(function (err) {
    return err;
  });
}

function smCategories() {
  var smCategories = smUtils.createSitemap();
  return getData({ collection: config.db.collections.categories }).then(function (data) {
    smUtils.addToSitemap(smCategories, data, {
      route: config.routes.categories,
      changefreq: 'daily',
      priority: 0.9
    });
  }).then(function () {
    return smUtils.createSitemapFile(smCategories, {
      sitemap_path: rootXml + '/' + categoriesName,
      sitemapName: categoriesName
    });
  }).catch(function (err) {
    return err;
  });
}

function smStores() {
  var smStores = smUtils.createSitemap();
  return getData({ collection: config.db.collections.secundary }).then(function (data) {
    return smUtils.addToSitemap(smStores, data, {
      route: config.routes.storeList,
      changefreq: 'daily',
      priority: 0.9
    });
  }).then(function () {
    return smUtils.createSitemapFile(smStores, {
      sitemap_path: rootXml + '/' + storesName,
      sitemapName: storesName
    });
  }).catch(function (err) {
    return err;
  });
}

function smOffers() {
  var offersSitemap = smUtils.createSitemap();

  return getData({ collection: config.db.collections.main }).then(function (data) {
    smUtils.addToSitemap(offersSitemap, data, {
      route: config.routes.main,
      changefreq: 'monthly',
      priority: 0.5
    });
  }).then(function () {
    return smUtils.createSitemapFile(offersSitemap, {
      sitemap_path: rootXml + '/' + offers,
      sitemapName: offers
    });
  }).catch(function (err) {
    return err;
  });
}

function smIndex() {
  var iterable = [new Promise(function (resolve, reject) {
    fs.stat(rootXml + '/' + pagesName + '.gz', function (err, stat) {
      if (err) {
        reject(err);
      }
      resolve(stat);
    });
  }), new Promise(function (resolve, reject) {
    fs.stat(rootXml + '/' + offers + '.gz', function (err, stat) {
      if (err) {
        reject(err);
      }
      resolve(stat);
    });
  }), new Promise(function (resolve, reject) {
    fs.stat(rootXml + '/' + storesName + '.gz', function (err, stat) {
      if (err) {
        reject(err);
      }
      resolve(stat);
    });
  }), new Promise(function (resolve, reject) {
    fs.stat(rootXml + '/' + categoriesName + '.gz', function (err, stat) {
      if (err) {
        reject(err);
      }
      resolve(stat);
    });
  })];

  return new Promise(function (resolve, reject) {
    Promise.all(iterable).then(function (results) {
      var content = '<?xml version="1.0" encoding="UTF-8"?>\n        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n        <sitemap>\n          <loc>' + config.host + '/' + pagesName + '.gz</loc>\n          <lastmod>' + utils.getDate(results[0].mtime) + '</lastmod>\n        </sitemap>\n        <sitemap>\n          <loc>' + config.host + '/' + offers + '.gz</loc>\n          <lastmod>' + utils.getDate(results[1].mtime) + '</lastmod>\n        </sitemap>\n        <sitemap>\n          <loc>' + config.host + '/' + storesName + '.gz</loc>\n          <lastmod>' + utils.getDate(results[2].mtime) + '</lastmod>\n        </sitemap><sitemap>\n          <loc>' + config.host + '/' + categoriesName + '.gz</loc>\n          <lastmod>' + utils.getDate(results[3].mtime) + '</lastmod>\n        </sitemap>\n        </sitemapindex>';

      fs.writeFile(rootXml + '/sitemap.xml', content, 'utf8', function (err) {
        if (err) {
          console.log(Error(err));
          reject(Error(err));
        }
        smUtils.compress(rootXml + '/sitemap.xml');
        console.log('Index sitemap is created :=)');
        resolve('Index sitemap is created :=)');
      });
    }).catch(function (err) {
      console.log(Error(err));
      reject(err);
    });
  });
}

function ping() {
  if (config.app_status === 'deploy') {
    request('https://www.google.com/webmasters/sitemaps/ping?sitemap=https://www.ofertadeo.com/sitemap.xml', function (error, response, body) {
      if (error) {
        console.log('------------------------------------------');
        console.log(utils.getDate());
        console.log('error: ', error);
        console.log('------------------------------------------');
        return;
      }
      console.log('------------------------------------------');
      console.log(utils.getDate());
      console.log('success ping to GOOGLE sitemap!!:');
      console.log('------------------------------------------');
      console.log(body);
    });

    request('https://www.bing.com/webmaster/ping.aspx?siteMap=https://www.ofertadeo.com/sitemap.xml', function (error, response, body) {
      if (error) {
        console.log('------------------------------------------');
        console.log(utils.getDate());
        console.log('error: ', error);
        console.log('------------------------------------------');
        return;
      }
      console.log('------------------------------------------');
      console.log(utils.getDate());
      console.log('success ping to BING sitemap!!:');
      console.log('------------------------------------------');
      console.log(body);
    });
  }
}

module.exports = {
  index: smIndex,
  pages: smPages,
  offers: smOffers,
  stores: smStores,
  categories: smCategories,
  ping: ping
};

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("node-cron");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("request");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = {
  loading: {
    color: '#ff80ab',
    height: '11px'
  },
  cache: true,
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'es-MX'
    },
    title: 'Ofertas, promociones y descuentos en México | Ofertadeo',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'theme-color', content: '#1976d2' }, { name: 'msapplication-TileColor', content: '#2d89ef' }, { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' }, { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }, { name: 'p:domain_verify', content: 'd22a77a044a4490ebd5019e778f4a37b' }, { name: 'google-site-verification', content: '-jN3QPeaXQTbgPBlyAXlXXh7qRSesWIpa3GC3ijTjJM' }, { name: 'msvalidate.01', content: '162D9E28E432D290B43E41702E108642' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' }, { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' }, { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }, { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }, { rel: 'manifest', href: '/favicons/manifest.json' }, { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#1976d2' }, { rel: 'shortcut icon', href: '/favicons/favicon.ico' }, { rel: 'dns-prefetch', href: '//www.google-analytics.com' }],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Global CSS
  */
  plugins: [{ src: '~plugins/ga.js', ssr: false }],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', '~plugins/striptags.js'],
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var router = __webpack_require__(4).Router();
var config = __webpack_require__(0);
var conn = __webpack_require__(5)(config);
var crud = __webpack_require__(6);
var commonDbParams = __webpack_require__(30);
var csm = __webpack_require__(7);
var feed = __webpack_require__(32);
var pn = __webpack_require__(33);

var home = __webpack_require__(25);
var categories = __webpack_require__(19);
var promotions = __webpack_require__(26);
var stores = __webpack_require__(28);
var upload = __webpack_require__(29);
var seo = __webpack_require__(27);

home({ router: router, crud: crud, conn: conn, config: config });

categories({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: __webpack_require__(20),
  csm: csm,
  commonDbParams: commonDbParams
});

promotions({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: __webpack_require__(21),
  csm: csm,
  feed: feed,
  pn: pn
});

stores({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: __webpack_require__(23),
  csm: csm,
  commonDbParams: commonDbParams
});

upload({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: __webpack_require__(24)
});

seo({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: __webpack_require__(22)
});

/* harmony default export */ exports["a"] = router;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

var cron = __webpack_require__(8);
var csm = __webpack_require__(7);
var utils = __webpack_require__(1);

var schedule = {
  ping: ping
};

function ping() {
  // cron.schedule('*/1 * * * *', function (){
  cron.schedule('1 12 * * *', function () {
    // run every day at 12:00 hrs
    utils.checkIfNewOffers().then(function (res) {
      console.log('sitemaps');
      if (res && res.news) {
        csm.ping();
      }
      console.log(res);
    }).catch(function (err) {
      console.log(err);
    });
  });

  // cron.schedule('*/1 * * * *', function (){
  cron.schedule('50 23 * * *', function () {
    // run every day at 23:50 hours
    utils.checkIfNewOffers().then(function (res) {
      console.log('sitemaps');
      if (res && res.news) {
        console.log(res);
        csm.ping();
      }
    }).catch(function (err) {
      console.log(err);
    });
  });
}

module.exports = schedule;

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("compression");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("helmet");

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = require("morgan");

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = require("rotating-file-stream");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (params) {
  params.conn.then(function (db) {
    return params.crud({ db: db, config: params.config });
  }).then(function (crud) {
    if (crud) {
      params.handler({
        crud: crud,
        config: params.config,
        router: params.router,
        csm: params.csm,
        commonDbParams: params.commonDbParams
      }).getById().getIndex().getFormData().save({ path: '/categories/new' }) // Create new category
      .save({ path: '/categories/edit/:id' }); // Edit a category
    } else {
      console.log('There is not database instance');
    }
  }).catch(function (error) {
    console.log(error);
  });
};

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = function (spec) {
  var that = {};
  spec = spec || {};

  function getById() {
    var conf = spec.config;
    var crudInst = spec.crud;

    spec.router.get('/categories/:_id', function (req, res) {
      var page = req.query.page ? Number(req.query.page) : 0;

      var iterable = [crudInst.getItems({
        collection: conf.db.collections.main,
        query: { 'categories._id': req.params._id },
        items_per_page: conf.db.itemsPerPage,
        skip: conf.db.itemsPerPage * page,
        sort: { published: -1 },
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
      }), crudInst.getItem({
        collection: conf.db.collections.categories,
        query: { _id: req.params._id },
        projection: {
          name: 1,
          thumbnail: 1,
          slug: 1,
          content: 1,
          title: 1,
          h1: 1,
          h2: 1,
          meta_title: 1,
          meta_description: 1,
          img: 1,
          img_alt: 1,
          img_title: 1,
          img_data: 1
        }
      }), crudInst.getPagination({
        query: { 'categories._id': req.params._id },
        collection: conf.db.collections.main
      }), crudInst.getItem({
        collection: conf.db.collections.seo,
        query: { _id: 'categories' }
      })];

      Promise.all(iterable).then(function (results) {
        res.json({
          items: results[0],
          info: results[1],
          pagination: results[2],
          seo: results[3]
        });
      }).catch(function (error) {
        res.json(error);
      });
    });

    return that;
  }

  function getIndex(params) {
    var conf = spec.config;
    var crudInst = spec.crud;

    spec.router.get('/categories', function (req, res) {

      var page = req.query.page ? Number(req.query.page) : 0;
      var iterable = [crudInst.aggregate({
        collection: conf.db.collections.categories,
        pipeline: [{ $limit: 100 }, // Primiero limitar la cantidad
        // Ordenarlo por nombre para obtener el arreglo stores en el sig, pipe ordenado alfabeticamente en orden ascendente
        { $sort: { name: 1 } }, { $project: {
            // A mayusculas, porque 'e' !== 'E'
            _id: 1,
            name: 1,
            slug: 1,
            thumbnail: 1,
            img: 1,
            img_data: 1,
            img_alt: 1,
            img_title: 1,
            published: 1,
            modified: 1
          }
        }, {
          $group: {
            _id: {
              $switch: spec.commonDbParams.groupAlphabeticallyInSwitch
            },
            categories: { $push: "$$CURRENT" }
          }
        }, { $sort: { _id: 1 } }], // pipeline
        options: {
          collation: {
            locale: conf.db.collation.locale,
            alternate: "shifted"
          } // options
        } }) // aggregate
      ]; // iterable

      Promise.all(iterable).then(function (results) {
        res.json({
          items: results[0]
        });
      }).catch(function (error) {
        console.log(error);
        res.json(error);
      });
    }); // router.get of express

    return that;
  }

  function getFormData() {
    var conf = spec.config;
    var crudInst = spec.crud;
    var router = spec.router;
    // get an specific promotion data, query by slug property
    router.get('/formdata/categories/:id', function (req, res) {
      var iterable = [crudInst.getItem({
        collection: conf.db.collections.categories,
        query: { _id: req.params.id },
        items_per_page: 1
      })];

      Promise.all(iterable).then(function (results) {
        res.json({
          item: results[0]
        });
      }).catch(function (error) {
        res.json(error);
      });
    }); // router.get

    return that;
  }

  /**
  * Creates or update a store
  * @param  {[type]} params Until now it contains the path of the request
  * @return {Object}        For cascade purpose
  */
  function save(params) {
    var conf = spec.config;
    var crudInst = spec.crud;

    spec.router.post(params.path, function (req, res) {
      var rightNow = new Date();
      var saveMethod = 'setItem';
      var saveParams = {
        collection: conf.db.collections.categories
      };
      var data = Object.assign({ modified: rightNow }, req.body);

      // Al crear nueva, la fecha de publicacion y modificacion son la misma
      if (!data.hasOwnProperty('published')) {
        data.published = rightNow;
      }

      if (data.hasOwnProperty('_id')) {
        saveMethod = 'update';
        delete data._id;
        delete saveParams.document;
        saveParams.query = { _id: req.params.id };
        saveParams.update = { $set: data };
        saveParams.options = { upsert: true };
      } else {
        data._id = data.slug;
        saveParams.document = data;
      }

      crudInst[saveMethod](saveParams).then(function (dbResponse) {
        //  return response to client with res object
        res.json(dbResponse);
        return dbResponse;
      }).catch(function (err) {
        console.log('Ocurrió un error al tratar de Guardar una Categoría:');
        console.log(err);
        res.json(err);
      }).then(function (dbResponse) {
        if (dbResponse.result && dbResponse.result.ok) {
          return true;
        } else {
          return Error(dbResponse);
        }
      }).then(function (result) {
        if (result === true) {
          Promise.all([spec.csm.categories(), spec.csm.pages()]).then(function (results) {
            if (results && results.length > 0) {
              return spec.csm.index();
            }
          }).catch(function (err) {
            console.log(err);
            return err;
          });
        } else {
          console.log(result);
        }
      }).catch(function (err) {
        console.log(err);
      });
    }); // router.post

    return that;
  }

  that.getIndex = getIndex;
  that.getById = getById;
  that.getFormData = getFormData;
  that.save = save;

  return that;
};

/***/ },
/* 21 */
/***/ function(module, exports) {

/**
 * Promotions routes and functionality for promotions requests
 * @param  {Object} spec Dependencies and more parameters for the correct behaviour
 * @return {Object}
 */
module.exports = function (spec) {
  var that = {};
  spec = spec || {};

  /**
   * Manage the Offer request, query by slug property
   * @return {Object} For cascade purposes
   */
  function getBySlug() {
    spec.router.get('/promotions/:slug', function (req, res) {
      var iterable = [spec.crud.getItem({
        collection: spec.config.db.collections.main,
        query: { slug: req.params.slug },
        items_per_page: 1
      })];

      return Promise.all(iterable).then(function (results) {
        res.json({
          item: results[0]
        });
      }).catch(function (error) {
        res.json(error);
      });
    });

    return that;
  }

  /**
   * Manage the request for creating and editing Offers(promotions)
   * @return {Object} For cascade purposes
   */
  function getFormData() {
    var conf = spec.config;
    var crudInst = spec.crud;
    var router = spec.router;

    // formdata for create and edit promotions
    router.get('/formdata/promotions', function (req, res) {
      var iterable = [crudInst.getItems({
        collection: conf.db.collections.secundary,
        items_per_page: 100,
        projection: { name: 1 },
        sort: { name: 1 }
      }), crudInst.getItems({
        collection: conf.db.collections.categories,
        items_per_page: 100,
        projection: { name: 1 },
        sort: { name: 1 }
      })];

      Promise.all(iterable).then(function (results) {
        res.json({
          stores: results[0],
          categories: results[1]
        });
      }).catch(function (error) {
        res.json(error);
      });
    });

    // get an specific promotion data, query by slug property
    router.get('/formdata/promotions/:slug', function (req, res) {
      var iterable = [crudInst.getItem({
        collection: conf.db.collections.main,
        query: { slug: req.params.slug },
        items_per_page: 1
      }), crudInst.getItems({
        collection: conf.db.collections.secundary,
        items_per_page: 100,
        projection: { name: 1 },
        sort: { name: 1 }
      }), crudInst.getItems({
        collection: conf.db.collections.categories,
        items_per_page: 100,
        projection: { name: 1 },
        sort: { name: 1 }
      })];

      Promise.all(iterable).then(function (results) {
        res.json({
          item: results[0],
          allStores: results[1],
          allCategories: results[2]
        });
      }).catch(function (error) {
        res.json(error);
      });
    });

    return that;
  }

  /**
   * Updates each category and store of a promotion, so the modified property is updated.
   * The modified property is useful for sitemaps, structure data and for users knowing the last update
   * of the promotion.
   * @param  {Object} data The object that contains an array of stores and an array of categories
   * @param  {Date}   date Date for "modified" property for each category and store
   * @return {Promise}     Promise to know when the task is done
   */
  function updateStoresAndCategories(data, date) {
    var iterable = data.categories.map(function (currCat) {
      return spec.crud.updateOne({
        collection: spec.config.db.collections.categories,
        query: { _id: currCat._id },
        update: { $set: { modified: date } }
      });
    });

    //  We are not using map because then we have to merge with concat and left two arrays of promises running
    data.stores.forEach(function (currStore) {
      iterable.push(spec.crud.updateOne({
        collection: spec.config.db.collections.secundary,
        query: { _id: currStore._id },
        update: { $set: { modified: date } }
      }));
    });

    return Promise.all(iterable);
  }

  function updateSitemaps() {
    var csm = spec.csm;

    //  Update sitemaps
    return new Promise(function (resolve, reject) {
      return Promise.all([csm.pages(), csm.offers(), csm.stores(), csm.categories()]).then(function (results) {
        if (results && results.length > 0) {
          csm.index().then(function (res) {
            resolve(res);
          });
        }
      }).catch(function (err) {
        reject(Error(err));
      });
    });
  }

  function sendPushNotification(data) {
    //  Push notifications
    spec.pn.all({
      title: data.title,
      url: spec.config.host + spec.config.routes.main + '/' + data.slug,
      message: data.meta_description

      //  @TODO: To set an image to the notifications using pushcrew, we need to create an PNG imgage 192X192
      //  ,image_url: data.thumbnail
    });
  }

  /**
   * Creates or update an Offer(promotion), when editing the query is by slug
   * @param  {[type]} params Until now it contains the path of the request
   * @return {Object}        For cascade purpose
   */
  function save(params) {
    var conf = spec.config;
    var crudInst = spec.crud;

    spec.router.post(params.path, function (req, res) {
      var rightNow = new Date();
      var missingData = { modified: rightNow };
      var data = Object.assign(missingData, req.body);

      if (!data.hasOwnProperty('published')) {
        data.published = rightNow;
      }

      crudInst.update({
        collection: conf.db.collections.main,
        query: { slug: req.params.slug },
        update: { $set: data },
        options: {
          upsert: true
        }
      }).then(function (dbResponse) {
        //  return response to client with res object
        res.json(dbResponse);
        return dbResponse;
      }).catch(function (err) {
        console.log('Ocurrió un error al tratar de Guardar una promoción:');
        console.log(err);
        res.json(err);
      }).then(function (dbResponse) {
        if (dbResponse.result && dbResponse.result.ok) {
          sendPushNotification(data);

          return crudInst.update({
            collection: conf.db.collections.pages,
            query: {},
            update: { $set: { modified: rightNow } },
            options: { multi: true }
          });
        }
      }).catch(function (err) {
        console.log('Ocurrió un error al tratar de actualizar las paginas despues de guardar una promoción:');
        console.log(err);
      }).then(function (dbResponse) {
        if (dbResponse && dbResponse.result && dbResponse.result.ok) {
          return updateStoresAndCategories({
            stores: data.stores,
            categories: data.categories
          }, rightNow);
        } else {
          return Error(dbResponse);
        }
      }).catch(function (err) {
        console.log('Ocurrió un error al tratar de actualizar tiendas y categorias despues de guardar una promoción:');
        console.log(err);
      }).then(function (results) {
        if (results && results.length > 0) {
          //  Update feed
          spec.feed.create();
          return updateSitemaps();
        }
      }).catch(function (err) {
        console.log('Ocurrió un error al tratar de actualizar los sitemas y el feed despues de guardar una promoción:');
        console.log(err);
      });
    });

    return that;
  };

  that.save = save;
  that.getFormData = getFormData;
  that.getBySlug = getBySlug;

  return that;
};

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = function (spec) {
  var that = {};
  spec = spec || {};

  function get() {
    spec.router.get('/seo/:id', function (req, res) {
      spec.crud.getItem({
        collection: spec.config.db.collections.seo,
        query: { _id: req.params.id }
      }).then(function (dbRes) {
        res.json(dbRes);
        return dbRes;
      }).catch(function (err) {
        console.log('Ocurrió un error al tratar de conseguir la configuracion seo de tiendas:');
        console.log(err);
        res.json(err);
      });
    });

    return that;
  }

  function save() {
    spec.router.post('/seo/:id', function (req, res) {
      var rightNow = new Date();
      var missingData = { modified: rightNow };

      if (!req.body.hasOwnProperty('date')) {
        missingData.date = rightNow;
      }

      spec.crud.update({
        collection: spec.config.db.collections.seo,
        query: { _id: req.params.id },
        update: { $set: Object.assign(missingData, req.body) },
        options: { upsert: true }
      }).then(function (dbRes) {
        res.json(dbRes);
        return dbRes;
      }).catch(function (err) {
        console.log('Ocurrió un error al tratar de Guardar la configuracion seo de tiendas:');
        console.log(err);
        res.json(err);
      });
    });

    return that;
  }

  that.get = get;
  that.save = save;

  return that;
};

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = function (spec) {
  var that = {};
  spec = spec || {};

  function getById(params) {
    var crudInst = spec.crud;
    var conf = spec.config;

    spec.router.get('/stores/:_id', function (req, res) {
      var page = req.query.page ? Number(req.query.page) : 0;
      var iterable = [crudInst.getItems({
        collection: conf.db.collections.main,
        query: { 'stores._id': req.params._id },
        items_per_page: conf.db.itemsPerPage,
        skip: conf.db.itemsPerPage * page,
        sort: { published: -1 },
        projection: {
          name: 1,
          thumbnail: 1,
          stores: 1,
          slug: 1,
          img: 1,
          img_data: 1,
          img_alt: 1,
          img_title: 1,
          categories: 1,
          published: 1,
          modified: 1
        }
      }), crudInst.getItem({
        collection: conf.db.collections.secundary,
        query: { _id: req.params._id },
        projection: {
          name: 1,
          thumbnail: 1,
          slug: 1,
          content: 1,
          title: 1,
          h1: 1,
          h2: 1,
          meta_title: 1,
          meta_description: 1,
          url_site: 1,
          img: 1,
          img_alt: 1,
          img_title: 1,
          img_data: 1
        }
      }), crudInst.getPagination({
        query: { 'stores._id': req.params._id },
        collection: conf.db.collections.main
      }), crudInst.getItem({
        collection: conf.db.collections.seo,
        query: { _id: 'stores' }
      })];

      Promise.all(iterable).then(function (results) {
        res.json({
          items: results[0],
          info: results[1],
          pagination: results[2],
          seo: results[3]
        });
      }).catch(function (error) {
        res.json(error);
      });
    });

    return that;
  }

  function getIndex(params) {
    var crudInst = spec.crud;
    var conf = spec.config;

    spec.router.get('/stores', function (req, res) {
      var page = req.query.page ? Number(req.query.page) : 0;
      var iterable = [crudInst.aggregate({
        collection: conf.db.collections.secundary,
        pipeline: [{ $limit: 100 }, // Primiero limitar la cantidad
        // Ordenarlo por nombre para obtener el arreglo stores en el sig, pipe ordenado alfabeticamente en orden ascendente
        { $sort: { name: 1 } }, { $project: {
            // A mayusculas, porque 'e' !== 'E'
            _id: 1,
            name: 1,
            slug: 1,
            thumbnail: 1,
            img: 1,
            img_data: 1,
            img_alt: 1,
            img_title: 1,
            published: 1,
            modified: 1
          }
        }, {
          $group: {
            _id: {
              $switch: spec.commonDbParams.groupAlphabeticallyInSwitch
            },
            stores: { $push: "$$CURRENT" }
          }
        }, { $sort: { _id: 1 } }], // pipeline
        options: {
          collation: {
            locale: conf.db.collation.locale,
            alternate: "shifted"
          } // options
        } }) // aggregate
      ]; // iterable

      Promise.all(iterable).then(function (results) {
        res.json({
          items: results[0]
        });
      }).catch(function (error) {
        console.log(error);
        res.json(error);
      });
    });

    return that;
  }

  function getFormData() {
    var conf = spec.config;
    var crudInst = spec.crud;
    var router = spec.router;
    // get an specific promotion data, query by slug property
    router.get('/formdata/stores/:id', function (req, res) {
      var iterable = [crudInst.getItem({
        collection: conf.db.collections.secundary,
        query: { _id: req.params.id },
        items_per_page: 1
      })];

      Promise.all(iterable).then(function (results) {
        res.json({
          item: results[0]
        });
      }).catch(function (error) {
        res.json(error);
      });
    }); // router.get

    return that;
  }

  /**
  * Creates or update a store
  * @param  {[type]} params Until now it contains the path of the request
  * @return {Object}        For cascade purpose
  */
  function save(params) {
    var conf = spec.config;
    var crudInst = spec.crud;
    var saveMethod = 'setItem';

    spec.router.post(params.path, function (req, res) {
      var rightNow = new Date();
      var saveParams = {
        collection: conf.db.collections.secundary
      };
      var data = Object.assign({ modified: rightNow }, req.body);

      // Al crear nueva, la fecha de publicacion y modificacion son la misma
      if (!data.hasOwnProperty('published')) {
        data.published = rightNow;
      }

      if (data.hasOwnProperty('_id')) {
        saveMethod = 'update';
        delete data._id;
        delete saveParams.document;
        saveParams.query = { _id: req.params.id };
        saveParams.update = { $set: data };
        saveParams.options = { upsert: true };
      } else {
        data._id = data.slug;
        saveParams.document = data;
      }

      crudInst[saveMethod](saveParams).then(function (dbResponse) {
        //  return response to client with res object
        res.json(dbResponse);
        return dbResponse;
      }).catch(function (err) {
        console.log('Ocurrió un error al tratar de Guardar una Tienda:');
        console.log(err);
        res.json(err);
      }).then(function (dbResponse) {
        if (dbResponse.result && dbResponse.result.ok) {
          return true;
        } else {
          return Error(dbResponse);
        }
      }).then(function (result) {
        if (result === true) {
          Promise.all([spec.csm.stores(), spec.csm.pages()]).then(function (results) {
            if (results && results.length > 0) {
              return spec.csm.index();
            }
          }).catch(function (err) {
            console.log(err);
            return err;
          });
        } else {
          console.log(result);
        }
      }).catch(function (err) {
        console.log(err);
      });
    }); // router.post

    return that;
  }

  that.save = save;
  that.getById = getById;
  that.getIndex = getIndex;
  that.getFormData = getFormData;

  return that;
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var mkdirp = __webpack_require__(36);
var path = __webpack_require__(3);
var multer = __webpack_require__(38);
var jimp = __webpack_require__(35);

module.exports = function (spec) {
  var that = {};
  spec = spec || {};

  function getPath(file) {
    var date = new Date();
    var finalPath = path.join(spec.config.paths.static + '/uploads/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
    if (file && file.hasOwnProperty('originalname')) {
      finalPath = finalPath + '/{file.originalname}';
    }
    return finalPath;
  }

  function mkdirPromise(pathFile) {
    return new Promise(function (resolve, reject) {
      mkdirp(pathFile, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve('Directorio creado: ' + pathFile);
        }
      });
    });
  }

  var storage = multer.diskStorage({
    destination: function destination(req, file, callback) {
      var pathFile = getPath();
      mkdirPromise(pathFile).then(function (success) {
        callback(null, pathFile);
      }).catch(function (err) {
        console.log(err);
      });
    },
    filename: function filename(req, file, callback) {
      callback(null, file.originalname);
    }
  });

  var multerUpload = multer({ storage: storage }).array('offerFile', 3); // Field name and max count

  function upload() {
    spec.router.post('/upload', function (req, res) {
      return multerUpload(req, res, function (error) {
        if (error) {
          res.json(error);
        }

        if (req.files && req.files[0] && req.files[0].hasOwnProperty('originalname')) {
          var _path = getPath();
          var file = req.files[0];
          var originalName = file.originalname;
          var name = originalName.split('.')[0];
          var extension = originalName.split('.')[1];
          var filePath = _path + '/' + originalName;
          var finalRootPath = _path.split(spec.config.paths.static)[1];

          jimp.read(filePath).then(function (img) {
            return img.scaleToFit(300, 300) // resize
            .quality(50) // set JPEG quality
            .write(_path + '/' + name + '_thumb.' + extension); // save
          }).then(function (result) {
            res.json({
              success: true,
              img: spec.config.host + filePath.split(spec.config.paths.static)[1],
              thumbnail: '' + spec.config.host + finalRootPath + '/' + name + '_thumb.' + extension
            });
          }).catch(function (err) {
            console.log('Error al tratar de Guardar o Leer la imagen');
            console.log(err);
            res.json({ success: false, msg: 'Ocurrio un error al guardar la imagen revisar con el desarrollador' });
          });
        } else {
          res.json({ success: false, msg: 'No obtuvimos ningun archivo de la peticón' });
        }
      });
    });
  }

  that.upload = upload;

  return that;
};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (params) {
  params.conn.then(function (db) {
    return params.crud({ db: db, config: params.config });
  }).then(function (crud) {
    if (crud) {
      index({ crud: crud, config: params.config, router: params.router });
    } else {
      console.log('There is not database instance');
    }
  }).catch(function (err) {
    // some configuration to notify no database connection working
    console.log(err);
  });
};

// We can define functions after use them because of function hoisting
function index(params) {
  var crudInst = params.crud;
  var conf = params.config;
  params.router.get('/home', function (req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [crudInst.getItems({
      collection: conf.db.collections.main,
      items_per_page: conf.db.itemsPerPage,
      skip: conf.db.itemsPerPage * page,
      sort: { published: -1 },
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
    }), crudInst.getPagination({
      collection: conf.db.collections.main
    })];

    Promise.all(iterable).then(function (results) {
      res.json({
        items: results[0],
        pagination: results[1]
      });
    }).catch(function (error) {
      res.json(error);
    });
  });
}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";



module.exports = function (params) {
  params.conn.then(function (db) {
    return params.crud({ db: db, config: params.config });
  }).then(function (crud) {
    if (crud) {
      params.handler({
        crud: crud,
        config: params.config,
        router: params.router,
        csm: params.csm,
        feed: params.feed,
        pn: params.pn
      }).getBySlug().getFormData().save({ path: '/promotions/new' }) // Create new Offer
      .save({ path: '/promotions/edit/:slug' }); // Edit an Offer
    }
  }).catch(function (err) {
    // some configuration to notify no database connection working
    console.log(err);
  });
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (params) {
  params.conn.then(function (db) {
    return params.crud({ db: db, config: params.config });
  }).then(function (crud) {
    if (crud) {
      params.handler({ crud: crud, config: params.config, router: params.router }).save().get();
    }
  }).catch(function (err) {
    // some configuration to notify no database connection working
    console.log(err);
  });
};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (params) {
  params.conn.then(function (db) {
    return params.crud({ db: db, config: params.config });
  }).then(function (crud) {
    if (crud) {
      params.handler({
        crud: crud,
        router: params.router,
        config: params.config,
        csm: params.csm,
        commonDbParams: params.commonDbParams
      }).getById().getIndex().getFormData().save({ path: '/stores/new' }) // Create new store
      .save({ path: '/stores/edit/:id' }); // Edit an store
    }
  }).catch(function (err) {
    // some configuration to notify no database connection working
    console.log(err);
  });
};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (params) {
  params.conn.then(function (db) {
    return params.crud({ db: db, config: params.config });
  }).then(function (crud) {
    if (crud) {
      params.handler({ crud: crud, config: params.config, router: params.router }).upload();
    } else {
      console.log('There is no crud instance');
    }
  }).catch(function (err) {
    // some configuration to notify no database connection working
    console.log(err);
  });
};

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = {
  groupAlphabeticallyInSwitch: {
    branches: [{
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "a"] },
      then: "0-F"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "b"] },
      then: "0-F"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "c"] },
      then: "0-F"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "d"] },
      then: "0-F"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "e"] },
      then: "0-F"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "f"] },
      then: "0-F"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "g"] },
      then: "G-L"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "h"] },
      then: "G-L"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "i"] },
      then: "G-L"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "j"] },
      then: "G-L"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "k"] },
      then: "G-L"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "l"] },
      then: "G-L"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "m"] },
      then: "M-Q"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "n"] },
      then: "M-Q"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "ñ"] },
      then: "M-Q"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "o"] },
      then: "M-Q"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "p"] },
      then: "M-Q"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "q"] },
      then: "M-Q"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "r"] },
      then: "R-V"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "s"] },
      then: "R-V"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "t"] },
      then: "R-V"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "u"] },
      then: "R-V"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "v"] },
      then: "R-V"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "w"] },
      then: "W-Z"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "x"] },
      then: "W-Z"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "y"] },
      then: "W-Z"
    }, {
      case: { $eq: [{ $substrCP: ["$_id", 0, 1] }, "z"] },
      then: "W-Z"
    }],
    default: "0-F"
  }
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var xml = __webpack_require__(41);
var utils = __webpack_require__(1);

var GENERATOR = 'Feed for Node.js';
var DOCTYPE = '<?xml version="1.0" encoding="utf-8"?>\n';

var Feed = function () {
  function Feed(options) {
    _classCallCheck(this, Feed);

    this.options = options;
    this.items = [];
    this.categories = [];
    this.contributors = [];
  }

  _createClass(Feed, [{
    key: 'addItem',
    value: function addItem(item) {
      this.items.push(item);
    }
  }, {
    key: 'addCategory',
    value: function addCategory(category) {
      this.categories.push(category);
    }
  }, {
    key: 'addContributor',
    value: function addContributor(contributor) {
      this.contributors.push(contributor);
    }
  }, {
    key: 'render',
    value: function render(format) {
      console.warn('DEPRECATED: use atom1() or rss2() instead of render()');
      if (format === 'atom-1.0') {
        return this.atom1();
      } else {
        return this.rss2();
      }
    }
  }, {
    key: 'atom1',
    value: function atom1() {
      var options = this.options;


      var feed = [{ _attr: { xmlns: 'http://www.w3.org/2005/Atom' } }, { id: options.id }, { title: options.title }, { updated: options.updated ? utils.getDate(options.updated) : utils.getDate(new Date()) }, { generator: options.generator || GENERATOR }];

      var root = [{ feed: feed }];

      if (options.author) {
        var _options$author = options.author,
            name = _options$author.name,
            email = _options$author.email,
            link = _options$author.link;

        var author = [];

        if (name) {
          author.push({ name: name });
        }

        if (email) {
          author.push({ email: email });
        }

        if (link) {
          author.push({ uri: link });
        }

        feed.push({ author: author });
      }

      // link (rel="alternate")
      if (options.link) {
        feed.push({ link: { _attr: { rel: 'alternate', href: options.link } } });
      }

      // link (rel="self")
      var atomLink = options.feed || options.feedLinks && options.feedLinks.atom;
      if (atomLink) {
        feed.push({ 'link': { _attr: { rel: 'self', href: atomLink } } });
      }

      // link (rel="hub")
      if (options.hub) {
        feed.push({ link: { _attr: { rel: 'hub', href: options.hub } } });
      }

      /**************************************************************************
       * "feed" node: optional elements
       *************************************************************************/

      if (options.description) {
        feed.push({ subtitle: options.description });
      }

      if (options.image) {
        feed.push({ logo: options.image });
      }

      if (options.favicon) {
        feed.push({ icon: options.favicon });
      }

      if (options.copyright) {
        feed.push({ rights: options.copyright });
      }

      this.categories.forEach(function (category) {
        feed.push({ category: [{ _attr: { term: category } }] });
      });

      this.contributors.forEach(function (item) {
        var name = item.name,
            email = item.email,
            link = item.link;

        var contributor = [];

        if (name) {
          contributor.push({ name: name });
        }

        if (email) {
          contributor.push({ email: email });
        }

        if (link) {
          contributor.push({ uri: link });
        }

        feed.push({ contributor: contributor });
      });

      // icon

      /**************************************************************************
       * "entry" nodes
       *************************************************************************/
      this.items.forEach(function (item) {
        //
        // entry: required elements
        //

        var entry = [{ title: { _attr: { type: 'html' }, _cdata: item.title } }, { id: item.id || item.link }, { link: [{ _attr: { href: item.link } }] }, { updated: utils.getDate(item.date) }];

        //
        // entry: recommended elements
        //
        if (item.description) {
          entry.push({ summary: { _attr: { type: 'html' }, _cdata: item.description } });
        }

        if (item.content) {
          entry.push({ content: { _attr: { type: 'html' }, _cdata: item.content } });
        }

        // entry author(s)
        if (Array.isArray(item.author)) {
          item.author.forEach(function (oneAuthor) {
            var name = oneAuthor.name,
                email = oneAuthor.email,
                link = oneAuthor.link;

            var author = [];

            if (name) {
              author.push({ name: name });
            }

            if (email) {
              author.push({ email: email });
            }

            if (link) {
              author.push({ uri: link });
            }

            entry.push({ author: author });
          });
        }

        // content

        // link - relative link to article

        //
        // entry: optional elements
        //

        // category

        // contributor
        if (Array.isArray(item.contributor)) {
          item.contributor.forEach(function (item) {
            var name = item.name,
                email = item.email,
                link = item.link;

            var contributor = [];

            if (name) {
              contributor.push({ name: name });
            }

            if (email) {
              contributor.push({ email: email });
            }

            if (link) {
              contributor.push({ uri: link });
            }

            entry.push({ contributor: contributor });
          });
        }

        // published
        if (item.published) {
          entry.push({ published: utils.getDate(item.published) });
        }

        // source

        // rights
        if (item.copyright) {
          entry.push({ rights: item.copyright });
        }

        feed.push({ entry: entry });
      });

      return DOCTYPE + xml(root, true);
    }
  }, {
    key: 'rss2',
    value: function rss2() {
      var options = this.options;

      var isAtom = false;
      var isContent = false;

      var channel = [{ title: options.title }, { link: options.link }, { description: options.description }, { lastBuildDate: options.updated ? utils.getDate(options.updated) : utils.getDate(new Date()) }, { docs: 'http://blogs.law.harvard.edu/tech/rss' }, { generator: options.generator || GENERATOR }];

      var rss = [{ _attr: { version: '2.0' } }, { channel: channel }];

      var root = [{ rss: rss }];

      /**
       * Channel Image
       * http://cyber.law.harvard.edu/rss/rss.html#ltimagegtSubelementOfLtchannelgt
       */
      if (options.image) {
        channel.push({
          image: [{ title: options.title }, { url: options.image }, { link: options.link }]
        });
      }

      /**
       * Channel Copyright
       * http://cyber.law.harvard.edu/rss/rss.html#optionalChannelElements
       */
      if (options.copyright) {
        channel.push({ copyright: options.copyright });
      }

      /**
       * Channel Categories
       * http://cyber.law.harvard.edu/rss/rss.html#comments
       */
      this.categories.forEach(function (category) {
        channel.push({ category: category });
      });

      /**
       * Feed URL
       * http://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html
       */
      var atomLink = options.feed || options.feedLinks && options.feedLinks.atom;
      if (atomLink) {
        isAtom = true;

        channel.push({
          'atom:link': {
            _attr: {
              href: atomLink,
              rel: 'self',
              type: 'application/rss+xml'
            }
          }
        });
      }

      /**
       * Hub for PubSubHubbub
       * https://code.google.com/p/pubsubhubbub/
       */
      if (options.hub) {
        isAtom = true;
        channel.push({
          'atom:link': {
            _attr: {
              href: options.hub,
              rel: 'hub'
            }
          }
        });
      }

      /**
       * Channel Categories
       * http://cyber.law.harvard.edu/rss/rss.html#hrelementsOfLtitemgt
       */
      this.items.forEach(function (entry) {
        var item = [];

        if (entry.title) {
          item.push({ title: { _cdata: entry.title } });
        }

        if (entry.link) {
          item.push({ link: entry.link });
        }

        if (entry.guid) {
          item.push({ guid: entry.guid });
        } else if (entry.link) {
          item.push({ guid: entry.link });
        }

        if (entry.date) {
          item.push({ pubDate: utils.getDate(entry.date, 'GMT') });
        }

        if (entry.description) {
          item.push({ description: { _cdata: entry.description } });
        }

        if (entry.content) {
          isContent = true;
          item.push({ 'content:encoded': { _cdata: entry.content } });
        }
        /**
         * Item Author
         * http://cyber.law.harvard.edu/rss/rss.html#ltauthorgtSubelementOfLtitemgt
         */
        if (Array.isArray(entry.author)) {
          entry.author.some(function (author) {
            if (author.email && author.name) {
              item.push({ author: author.email + ' (' + author.name + ')' });
              return true;
            } else {
              return false;
            }
          });
        }

        if (item.image) {
          item.push({ enclosure: [{ _attr: { url: entry.image } }] });
        }

        channel.push({ item: item });
      });

      if (isContent) {
        rss[0]._attr['xmlns:content'] = 'http://purl.org/rss/1.0/modules/content/';
      }

      if (isAtom) {
        rss[0]._attr['xmlns:atom'] = 'http://www.w3.org/2005/Atom';
      }

      return DOCTYPE + xml(root, true);
    }
  }, {
    key: 'json1',
    value: function json1() {
      var options = this.options,
          items = this.items;

      var feed = {
        version: 'https://jsonfeed.org/version/1',
        title: options.title
      };

      if (options.link) {
        feed.home_page_url = options.link;
      }

      if (options.feedLinks && options.feedLinks.json) {
        feed.feed_url = options.feedLinks.json;
      }

      if (options.description) {
        feed.description = options.description;
      }

      if (options.image) {
        feed.icon = options.image;
      }

      if (options.author) {
        feed.author = {};
        if (options.author.name) {
          feed.author.name = options.author.name;
        }
        if (options.author.link) {
          feed.author.url = options.author.link;
        }
      }
      feed.items = items.map(function (item) {
        var feedItem = {
          id: item.id,
          // json_feed distinguishes between html and text content
          // but since we only take a single type, we'll assume HTML
          html_content: item.content
        };
        if (item.link) {
          feedItem.url = item.link;
        }
        if (item.title) {
          feedItem.title = item.title;
        }
        if (item.description) {
          feedItem.summary = item.description;
        }

        if (item.image) {
          feedItem.image = item.image;
        }

        if (item.date) {
          feedItem.date_modified = utils.getDate(item.date);
        }
        if (item.published) {
          feedItem.date_published = utils.getDate(item.published);
        }

        if (item.author) {
          var author = item.author;
          if (author instanceof Array) {
            // json feed only supports 1 author per post
            author = author[0];
          }
          feedItem.author = {};
          if (author.name) {
            feedItem.author.name = author.name;
          }
          if (author.link) {
            feedItem.author.url = author.link;
          }
        }
        return feedItem;
      });

      return JSON.stringify(feed, null, 4);
    }
  }, {
    key: 'ISODateString',
    value: function ISODateString(d) {
      function pad(n) {
        return n < 10 ? '0' + n : n;
      }

      return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z';
    }
  }]);

  return Feed;
}();

module.exports = Feed;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);
var Feed = __webpack_require__(31);
var fs = __webpack_require__(2);
var striptags = __webpack_require__(40);
var utils = __webpack_require__(1);
var cron = __webpack_require__(8);

var rootFeed = config.paths.feed;

module.exports = {
  create: function create() {
    utils.getCrud().then(function (crud) {
      return crud.getItems({
        collection: config.db.collections.main,
        items_per_page: 10,
        sort: { published: -1 }
      });
    }).then(function (docs) {
      var feedXml = new Feed({
        title: config.txt.feed.title,
        description: config.txt.feed.description,
        link: config.host,
        image: config.host + '/logo.png',
        favicon: config.host + '/favicons/favicon.ico',
        copyright: 'Ofertadeo',
        updated: new Date(),
        generator: 'ofertadeo',
        feedLinks: {
          json: config.host + '/feed/feed-json.json',
          atom: config.host + '/feed/feed-atom.xml'
        }
      });

      docs.forEach(function (doc) {
        var content = striptags(doc.content);
        var description = content.slice(0, 200);
        if (description.length === 200) {
          description += '...';
        }
        feedXml.addItem({
          title: doc.title,
          link: config.host + config.routes.main + '/' + doc.slug,
          description: description,
          content: description,
          category: doc.categories[0],
          date: doc.published,
          image: doc.img
        });
      });

      fs.writeFile(rootFeed + '/feed-rss2.xml', feedXml.rss2(), 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
        console.log('RSS2 was created :=)');
      });

      fs.writeFile(rootFeed + '/feed-atom.xml', feedXml.atom1(), 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
        console.log('Atom was created :=)');
      });

      fs.writeFile(rootFeed + '/feed-json.json', feedXml.atom1(), 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
        console.log('JSON was created :=)');
      });
    }).then(function () {
      console.log('OK');
    }).catch(function (err) {
      console.log(err);
    });
  },
  schedule: function schedule() {
    var index = this;
    // cron.schedule('*/1 * * * *', function (){
    cron.schedule('1 12 * * *', function () {
      // run every day at 12:00 hrs
      utils.checkIfNewOffers().then(function (res) {
        console.log('feedburne');
        if (res && res.news) {
          index.create();
        }
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    });

    // cron.schedule('*/1 * * * *', function (){
    cron.schedule('50 23 * * *', function () {
      // run every day at 23:50 hours
      utils.checkIfNewOffers().then(function (res) {
        console.log('feedburne');
        if (res && res.news) {
          index.create();
        }
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    });
  }
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);
var request = __webpack_require__(9);
var apiKey = '61e4d89d5d5d1391dc97ca0c471003d4';
if (config.app_status === 'deploy') {
  apiKey = 'e5dd4f8caaa635b423152ea1ad66ded8';
}

module.exports = {
  all: function all(data) {
    request({
      url: 'https://pushcrew.com/api/v1/send/all',
      headers: {
        'Authorization': 'key=' + apiKey
      },
      method: 'POST'
    }).form(data).on('response', function (response) {
      console.log('Respuesta de https://pushcrew.com/api/v1/send/all');
      console.log(response.status);
      console.log(response.request_id);
      console.log(response.statusCode);
      console.log(response.statusMessage);
    }).on('error', function (err) {
      console.log('Error de https://pushcrew.com/api/v1/send/all');
      console.log(err);
    });
  }
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

var sm = __webpack_require__(39);
var config = __webpack_require__(0);
var fs = __webpack_require__(2);
var zlib = __webpack_require__(42);
var utils = __webpack_require__(1);

function compress(path) {
  var readable = fs.createReadStream(path);
  var writable = fs.createWriteStream(path + '.gz');
  var gzip = zlib.createGzip();

  return readable.pipe(gzip).pipe(writable);
}

function createSitemap() {
  var sitemap = sm.createSitemap({
    hostname: config.host,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n      xmlns:xhtml="http://www.w3.org/1999/xhtml"\n      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"'
  });

  return sitemap;
}

function addToSitemap(sitemap, data, params) {
  data.forEach(function (current) {
    var obj = {
      url: params.route + '/' + current.slug,
      changefreq: params.changefreq || 'daily',
      priority: params.priority || 0.5,
      lastmodISO: utils.getDate(current.modified)
    };

    if (current.img) {
      obj.img = {
        url: current.img,
        caption: current.img_alt,
        title: current.img_title
      };
    }

    sitemap.add(obj);
  });

  return sitemap;
}

function createSitemapFile(sitemap, params) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(params.sitemap_path, sitemap.toString(), function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }

      var readable = fs.createReadStream(params.sitemap_path);
      var writable = fs.createWriteStream(params.sitemap_path + '.gz');
      var gzip = zlib.createGzip();

      readable.pipe(gzip).pipe(writable);

      gzip.on('error', function (err) {
        console.log(err);
        reject(err);
      }).on('end', function () {
        writable.end();
        console.log(params.sitemap_path + ' sitemap file is compressed!!');
        resolve(params.sitemap_path + ' sitemap file is compressed!!');
      });
    });
  });
}

module.exports = {
  createSitemap: createSitemap,
  createSitemapFile: createSitemapFile,
  compress: compress,
  addToSitemap: addToSitemap
};

/***/ },
/* 35 */
/***/ function(module, exports) {

module.exports = require("jimp");

/***/ },
/* 36 */
/***/ function(module, exports) {

module.exports = require("mkdirp");

/***/ },
/* 37 */
/***/ function(module, exports) {

module.exports = require("mongodb");

/***/ },
/* 38 */
/***/ function(module, exports) {

module.exports = require("multer");

/***/ },
/* 39 */
/***/ function(module, exports) {

module.exports = require("sitemap");

/***/ },
/* 40 */
/***/ function(module, exports) {

module.exports = require("striptags");

/***/ },
/* 41 */
/***/ function(module, exports) {

module.exports = require("xml");

/***/ },
/* 42 */
/***/ function(module, exports) {

module.exports = require("zlib");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_helmet__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_morgan__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rotating_file_stream__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rotating_file_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rotating_file_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_sitemaps_schedule__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_sitemaps_schedule___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__utils_sitemaps_schedule__);












var develop = !("production" === 'production');
var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;
var morganFormat = 'combined';

var logDirectory = __WEBPACK_IMPORTED_MODULE_8_path___default.a.join(__dirname, '../log');
// ensure log directory exists
__WEBPACK_IMPORTED_MODULE_9_fs___default.a.existsSync(logDirectory) || __WEBPACK_IMPORTED_MODULE_9_fs___default.a.mkdirSync(logDirectory);
// create a rotating write stream
var accessLogStream = __WEBPACK_IMPORTED_MODULE_7_rotating_file_stream___default()('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

app.set('port', port);

// For some reason in develop, express precondition provoke an error when the user load more
// offers using ajax
if (!develop) {
  // const preconditions = require('express-preconditions');
  // app.use(preconditions())
  // morganFormat = 'dev'
}
app.use(__WEBPACK_IMPORTED_MODULE_5_body_parser___default.a.json());
// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_4__api__["a" /* default */]);
app.use(__WEBPACK_IMPORTED_MODULE_6_morgan___default()(morganFormat, { stream: accessLogStream }));
// Security
app.use(__WEBPACK_IMPORTED_MODULE_3_helmet___default()());
app.disable('x-powered-by');

// Import and Set Nuxt.js options
var nuxtConfig = __webpack_require__(10);
nuxtConfig.dev = develop;

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_0_nuxt___default.a(nuxtConfig);
// before nuxt render to compress data
app.set('view cache', true); // Cache template compilation
app.use(__WEBPACK_IMPORTED_MODULE_2_compression___default()()); // Compress all the data that the server response

// At the end because it won't call next()
app.use(nuxt.render);

// Build only in dev mode
if (nuxtConfig.dev) {
  nuxt.build().catch(function (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
}

// Listen the server
app.listen(port);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
// Schedule ping to web search engines
__WEBPACK_IMPORTED_MODULE_10__utils_sitemaps_schedule___default.a.ping();
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }
/******/ ]);
//# sourceMappingURL=main.map