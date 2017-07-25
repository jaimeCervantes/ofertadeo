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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(2).config;

module.exports = CRUD;

function CRUD(params) {
  this.COLLECTION = params.collection;
  this.DATABASE = params.db;
  this.ITEMS_PER_PAGE = params.items_per_page || config.db.itemsPerPage;
};

CRUD.prototype.getItems = function (params) {
  var db = this.DATABASE || params.db;
  var items_per_page = params.items_per_page || this.ITEMS_PER_PAGE;
  return db.collection(this.COLLECTION || params.collection).find(params.query || {}, params.projection || {}).sort(params.sort || { _id: 1 }).skip(params.skip || 0).limit(items_per_page).toArray().then(function (docs) {
    if (items_per_page > 1) {
      return docs;
    } else {
      return docs[0];
    }
  }).catch(function (err) {
    return err;
  });
};

CRUD.prototype.getItem = function (params) {
  params.items_per_page = 1;
  return this.getItems(params);
};

CRUD.prototype.setItem = function (params) {
  var db = this.DATABASE || params.db;
  return db.collection(params.collection || this.COLLECTION).insertOne(params.document).then(function (res) {
    return res;
  }).catch(function (err) {
    return err;
  });
};

CRUD.prototype.updateOne = function (params) {
  var db = this.DATABASE || params.db;
  return db.collection(params.collection || this.COLLECTION).updateOne(params.query, params.update).then(function (res) {
    return res;
  }).catch(function (err) {
    return err;
  });
};

CRUD.prototype.searchItems = function (params) {
  var db = this.DATABASE || params.db;
  return db.collection(this.COLLECTION || params.collection)
  //we project the textScore meta data and then we sort the results by the best matches first
  .find(params.query, params.projection || { score: { $meta: 'textScore' } }).sort(params.sort || { score: { $meta: 'textScore' } }).skip(params.skip || 0).limit(params.items_per_page || this.ITEMS_PER_PAGE).toArray().then(function (docs) {
    return docs;
  }).catch(function (err) {
    return err;
  });
};

CRUD.prototype.getPagination = function (params) {
  var that = this;
  var db = that.DATABASE || params.db;
  return db.collection(this.COLLECTION || params.collection).find(params.query || {}).count().then(function (numItems) {
    var items_per_page = params.items_per_page || that.ITEMS_PER_PAGE;
    var numPages = 0;
    if (numItems > items_per_page) {
      numPages = Math.ceil(numItems / items_per_page);
    }
    return {
      pages: numPages,
      total: numItems
    };
  }).catch(function (err) {
    return err;
  });
};

CRUD.prototype.aggregation = function (params) {
  var db = this.DATABASE || params.db;
  return db.collection(this.COLLECTION || params.collection).aggregate(params.aggregation).toArray().then(function (data) {
    return data;
  }).catch(function (err) {
    return err;
  });
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var wagner = __webpack_require__(5);
var path = __webpack_require__(4);

var config = {
  db: {
    user: "ofertadeo",
    password: "Cdo_2017*",
    name: 'ofertadeo',
    host: 'ds161471.mlab.com:61471',
    shard1: 'pensemosweb-shard-00-00-147ev.mongodb.net:27017',
    shard2: 'pensemosweb-shard-00-01-147ev.mongodb.net:27017',
    shard3: 'pensemosweb-shard-00-02-147ev.mongodb.net:27017',
    queryString: '?ssl=true&replicaSet=pensemosweb-shard-0&authSource=admin',
    mainCollection: 'offers',
    itemsPerPage: 12,
    collections: {
      main: 'offers',
      secundary: 'stores',
      categories: 'categories',
      pages: 'pages'
    }
  },
  routes: {
    categories: '/categorias',
    categoriesList: '/categorias',
    stores: '/promociones',
    main: '/promociones',
    storeList: '/tiendas'
  },
  host: 'http://45.55.71.33',
  paths: {
    root: path.resolve(__dirname, '../'),
    server: __dirname,
    static: path.resolve(__dirname, '../static')
  }
};

module.exports = function (wagner) {
  if (wagner) {
    wagner.factory('config', function () {
      return config;
    });
  }
  return config;
};

module.exports.config = config;
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("wagner-core");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var MongoClient = __webpack_require__(27).MongoClient;

function getConnection(config) {
  //connPromise is pending when trying to connect to mongodb atlas
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
}

module.exports = function (wagner) {
  wagner.invoke(function (config) {
    var conn = getConnection(config);
    wagner.factory('conn', function () {
      return conn;
    });
  });
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var utils = __webpack_require__(24);
var config = __webpack_require__(2)();
var sm = __webpack_require__(8);
var fs = __webpack_require__(3);
var request = __webpack_require__(30);

config.paths.static = '/home/jaime/xml';
var offers = '/sitemap-ofertas.xml';
var stores_categories_pages = '/sitemap-paginas.xml';

function smPages() {
  var modified = utils.getDate();
  var compoundSitemap = utils.createSitemap();

  compoundSitemap.add({ url: '/', changefreq: 'daily', priority: 1.0, lastmodISO: modified });

  utils.getData({ collection: config.db.collections.pages }).then(function (data) {
    utils.addToSitemap(compoundSitemap, data, {
      route: '',
      changefreq: 'weekly',
      priority: 0.7
    });
  }).then(function () {
    return utils.getData({ collection: config.db.collections.secundary });
  }).then(function (data) {
    utils.addToSitemap(compoundSitemap, data, {
      route: config.routes.storeList,
      changefreq: 'daily',
      priority: 0.9
    });
  }).then(function () {
    return utils.getData({ collection: config.db.collections.categories });
  }).then(function (data) {
    utils.addToSitemap(compoundSitemap, data, {
      route: config.routes.categories,
      changefreq: 'daily',
      priority: 0.9
    });
  }).then(function () {
    utils.createSitemapFile(compoundSitemap, {
      sitemap_path: config.paths.static + stores_categories_pages,
      sitemapName: stores_categories_pages
    });
  });
}

function smOffers() {
  var offersSitemap = utils.createSitemap();

  utils.getData({ collection: config.db.collections.main }).then(function (data) {
    utils.addToSitemap(offersSitemap, data, {
      route: config.routes.main,
      changefreq: 'daily',
      priority: 0.5
    });
  }).then(function () {
    utils.createSitemapFile(offersSitemap, {
      sitemap_path: config.paths.static + offers,
      sitemapName: offers
    });
  });
}

function smIndex() {
  var content = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<sitemap>\n  <loc>https://www.ofertadeo.com/sitemap-paginas.xml</loc>\n  <lastmod>' + utils.getDate() + '</lastmod>\n</sitemap>\n<sitemap>\n  <loc>https://www.ofertadeo.com/sitemap-ofertas.xml</loc>\n  <lastmod>' + utils.getDate() + '</lastmod>\n</sitemap>\n</sitemapindex>';

  fs.writeFile(config.paths.static + '/sitemap.xml', content, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Index sitemap is created :=)');
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
  ping: ping
};

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("sitemap");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = {
  loading: {
    color: '#ff80ab',
    height: '11px'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Ofertas, promociones y descuentos en México | Ofertadeo',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'theme-color', content: '#1976d2' }, { name: 'msapplication-TileColor', content: '#2d89ef' }, { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' }, { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }, { name: 'p:domain_verify', content: 'd22a77a044a4490ebd5019e778f4a37b' }, { name: 'google-site-verification', content: '-jN3QPeaXQTbgPBlyAXlXXh7qRSesWIpa3GC3ijTjJM' }, { name: 'msvalidate.01', content: '162D9E28E432D290B43E41702E108642' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' }, { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' }, { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }, { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }, { rel: 'manifest', href: '/favicons/manifest.json' }, { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#1976d2' }, { rel: 'shortcut icon', href: '/favicons/favicon.ico' }, { rel: 'dns-prefetch', href: '//www.google-analytics.com' }],
    htmlAttrs: {
      lang: 'es-MX'
    }
  },
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/stylus/main.styl', lang: 'stylus' }, { src: '~assets/css/main.scss', lang: 'scss' // scss instead of sass
  }],
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var wagner = __webpack_require__(5);
var home = __webpack_require__(19);
var categories = __webpack_require__(18);
var stores = __webpack_require__(21);
var promotions = __webpack_require__(20);
var upload = __webpack_require__(22);

__webpack_require__(2)(wagner);
__webpack_require__(6)(wagner);

var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
// Add USERS Routes
router.use(home(wagner));
router.use(categories(wagner));
router.use(stores(wagner));
router.use(promotions(wagner));
router.use(upload(wagner));

/* harmony default export */ exports["a"] = router;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

var cron = __webpack_require__(29);
var csm = __webpack_require__(7);

var schedule = {
	ping: ping
};

function ping() {
	cron.schedule('* 12 * * *', function () {
		//run every 5 minutes after midnigh everyday
		csm.ping();
	});

	cron.schedule('50 23 * * *', function () {
		//run every 6 hours
		csm.ping();
	});
}

module.exports = schedule;

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("compression");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("helmet");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("morgan");

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = require("rotating-file-stream");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(1);

var crudInst;
var conf;
module.exports = function (wagner, params) {
  wagner.invoke(function (conn, config) {
    conf = config;
    return conn;
  }).then(function (db) {
    crudInst = new CRUD({
      db: db
    });
  }).catch(function (err) {
    //some configuration to notify no database connection working
    console.log(err);
  }).then(function () {
    if (crudInst) {
      _id();
      index();
    } else {
      indexNoDB();
    }
  });

  return router;
};

function _id() {
  router.get('/categories/:_id', function (req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [crudInst.getItems({
      collection: conf.db.collections.main,
      query: { categories: req.params._id },
      items_per_page: conf.db.itemsPerPage,
      skip: conf.db.itemsPerPage * page,
      sort: { _id: -1 },
      projection: { name: 1, thumbnail: 1, store_id: 1, stores: 1, slug: 1, img_alt: 1, img_title: 1 }
    }), crudInst.getItem({
      collection: conf.db.collections.categories,
      query: { _id: req.params._id },
      projection: { name: 1, thumbnail: 1, slug: 1, content: 1, img: 1, img_alt: 1, img_title: 1 }
    }), crudInst.getPagination({
      query: { store_id: req.params._id },
      collection: conf.db.collections.main
    })];

    Promise.all(iterable).then(function (results) {
      res.json({
        items: results[0],
        info: results[1],
        pagination: results[2]
      });
    }).catch(function (error) {
      res.json(error);
    });
  });
}

function index() {
  router.get('/categories', function (req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [crudInst.getItems({
      collection: conf.db.collections.categories,
      items_per_page: conf.db.itemsPerPage,
      skip: conf.db.itemsPerPage * page,
      sort: { name: 1 },
      projection: { name: 1, slug: 1, thumbnail: 1, img_alt: 1, img_title: 1 }
    }), crudInst.getPagination({
      collection: conf.db.collections.categories
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(1);
var crudInst;
var conf;

module.exports = function (wagner, params) {
  wagner.invoke(function (conn, config) {
    conf = config;
    return conn;
  }).then(function (db) {
    crudInst = new CRUD({
      db: db
    });
  }).catch(function (err) {
    //some configuration to notify no database connection working
    console.log(err);
  }).then(function () {
    if (crudInst) {
      index();
    } else {
      indexNoDB();
    }
  });

  return router;
};

function index() {
  router.get('/home', function (req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [crudInst.getItems({
      collection: conf.db.collections.main,
      items_per_page: conf.db.itemsPerPage,
      skip: conf.db.itemsPerPage * page,
      sort: { _id: -1 },
      projection: { name: 1, thumbnail: 1, store_id: 1, stores: 1, slug: 1, img_alt: 1, img_title: 1, title: 1 }
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var utils = __webpack_require__(23);
var CRUD = __webpack_require__(1);
var csm = __webpack_require__(7);

var crudInst;
var conf;
module.exports = function (wagner, params) {
  wagner.invoke(function (conn, config) {
    conf = config;
    return conn;
  }).then(function (db) {
    crudInst = new CRUD({
      db: db
    });
  }).catch(function (err) {
    //some configuration to notify no database connection working
    console.log(err);
  }).then(function () {
    if (crudInst) {
      slug();
      getFormDataPromotions();
      createPromotion();
    }
  });

  return router;
};

function slug() {
  router.get('/promotions/:slug', function (req, res) {
    var iterable = [crudInst.getItem({
      collection: conf.db.mainCollection,
      query: { slug: req.params.slug },
      items_per_page: 1,
      sort: { _id: -1 }
    })];

    return Promise.all(iterable).then(function (results) {
      res.json({
        item: results[0]
      });
    }).catch(function (error) {
      res.json(error);
    });
  });
}

function getFormDataPromotions() {
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
}

function createPromotion() {
  router.post('/promotions/new', function (req, res) {
    var data = Object.assign({ modified: utils.getDate() }, req.body);
    crudInst.setItem({
      collection: conf.db.mainCollection,
      document: data
    }).then(function (result) {
      res.json(result);
      if (result.insertedId) {
        // @TODO, when we use more than one category and more than one store, the updateOne 
        // operation should be execute for each element in the arrary categories and stores
        return Promise.all([crudInst.updateOne({
          collection: conf.db.collections.main,
          query: { _id: result.insertedId },
          update: { $set: { modified: utils.getDate() } }
        }), crudInst.updateOne({
          collection: conf.db.collections.secundary,
          query: { _id: data.stores[0] },
          update: { $set: { modified: utils.getDate() } }
        }), crudInst.updateOne({
          collection: conf.db.collections.categories,
          query: { _id: data.categories[0] },
          update: { $set: { modified: utils.getDate() } }
        })]);
      }
    }).then(function (results) {
      if (results && results.length > 0) {
        csm.pages();
        csm.offers();
        csm.index();
      }
    }).catch(function (err) {
      res.json(err);
    });
  });
}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(1);
var crudInst;
var conf;

module.exports = function (wagner, params) {
  wagner.invoke(function (conn, config) {
    conf = config;
    return conn;
  }).then(function (db) {
    crudInst = new CRUD({
      db: db
    });
  }).catch(function (err) {
    //some configuration to notify no database connection working
    console.log(err);
  }).then(function () {
    if (crudInst) {
      _id();
      index();
    }
  });

  return router;
};

function _id() {
  router.get('/stores/:_id', function (req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [crudInst.getItems({
      collection: conf.db.collections.main,
      query: { $or: [{ store_id: req.params._id }, { stores: req.params._id }] },
      items_per_page: conf.db.itemsPerPage,
      skip: conf.db.itemsPerPage * page,
      sort: { _id: -1 },
      projection: { name: 1, thumbnail: 1, store_id: 1, stores: 1, slug: 1, img: 1, img_alt: 1, img_title: 1, categories: 1 }
    }), crudInst.getItem({
      collection: conf.db.collections.secundary,
      query: { _id: req.params._id },
      projection: { name: 1, thumbnail: 1, slug: 1, url_site: 1, content: 1, img: 1, img_alt: 1, img_title: 1 }
    }), crudInst.getPagination({
      query: { store_id: req.params._id },
      collection: conf.db.collections.main
    })];

    Promise.all(iterable).then(function (results) {
      res.json({
        items: results[0],
        info: results[1],
        pagination: results[2]
      });
    }).catch(function (error) {
      res.json(error);
    });
  });
}

function index() {
  router.get('/stores', function (req, res) {
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [crudInst.getItems({
      collection: conf.db.collections.secundary,
      items_per_page: conf.db.itemsPerPage,
      skip: conf.db.itemsPerPage * page,
      sort: { name: 1 },
      projection: { name: 1, slug: 1, thumbnail: 1, img_alt: 1, img_title: 1 }
    }), crudInst.getPagination({
      collection: conf.db.collections.secundary
    })];

    Promise.all(iterable).then(function (results) {
      res.json({
        items: results[0],
        pagination: results[1]
      });
    }).catch(function (error) {
      console.log(error);
      res.json(error);
    });
  });
}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_multer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_multer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_multer__);


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(1);
var mkdirp = __webpack_require__(26);
var path = __webpack_require__(4);

var jimp = __webpack_require__(25);

var crudInst;
var conf;
var rootPathUploads = '/home/jaime';
module.exports = function (wagner, params) {
  wagner.invoke(function (conn, config) {
    conf = config;
    return conn;
  }).then(function (db) {
    crudInst = new CRUD({
      db: db
    });
  }).catch(function (err) {
    //some configuration to notify no database connection working
    console.log(err);
  }).then(function () {
    if (crudInst) {
      upload();
    }
  });

  return router;
};

function getPath(file) {
  var date = new Date();
  var finalPath = path.join(rootPathUploads + '/uploads/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
  if (file) {
    finalPath = finalPath + '/{file.originalname}';
  }
  return finalPath;
}

function upload() {
  router.post('/upload', function (req, res) {
    return multerUpload(req, res, function (err) {
      if (err) {
        res.json(error);
      }

      var path = getPath();
      var file = req.files[0];
      var originalName = file.originalname;
      var name = originalName.split('.')[0];
      var extension = originalName.split('.')[1];
      var filePath = path + '/' + originalName;
      var finalRootPath = path.split(rootPathUploads)[1];

      jimp.read(filePath).then(function (img) {
        img.resize(jimp.AUTO, 300) // resize
        .quality(80) // set JPEG quality
        .write(path + '/' + name + '_thumb.' + extension); // save
      }).then(function (result) {
        res.json({ success: true, img: conf.host + filePath.split(rootPathUploads)[1], thumbnail: '' + conf.host + finalRootPath + '/' + name + '_thumb.' + extension });
      }).catch(function (err) {
        res.json(err);
      });
    });
  });
}

var storage = __WEBPACK_IMPORTED_MODULE_0_multer___default.a.diskStorage({
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

var multerUpload = __WEBPACK_IMPORTED_MODULE_0_multer___default()({ storage: storage }).array("offerFile", 3); //Field name and max count

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

/***/ },
/* 23 */
/***/ function(module, exports) {

function getDate() {
  var date = new Date();
  var substract = date.getTime() - 300 * 60 * 1000;
  var dateStr = new Date(substract).toISOString().split('.')[0];
  return dateStr + '-05:00';
}

module.exports = {
  getDate: getDate
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var wagner = __webpack_require__(5);
var sm = __webpack_require__(8);
var config = __webpack_require__(2)(wagner);
__webpack_require__(6)(wagner);
var CRUD = __webpack_require__(1);
var fs = __webpack_require__(3);
var zlib = __webpack_require__(31);

function getDate() {
  var date = new Date();
  var substract = date.getTime() - 300 * 60 * 1000;
  var dateStr = new Date(substract).toISOString().split('.')[0];
  return dateStr + '-05:00';
}

function getData(params) {
  return wagner.invoke(function (conn) {
    return conn;
  }).then(function (db) {
    return new CRUD({ db: db });
  }).then(function (crud) {
    return crud.getItems({
      collection: params.collection || 'offers',
      query: params.query || {},
      projection: params.projection || { slug: 1, modified: 1 },
      items_per_page: params.items_per_page || 10000,
      sort: { _id: -1 }
    });
  });
}

function compress(path) {
  var readable = fs.createReadStream(path);
  var writable = fs.createWriteStream(path + '.gz');
  var gzip = zlib.createGzip();
  readable.pipe(gzip).pipe(writable);
  gzip.on('end', function () {
    writable.end();
    console.log(path + ' sitemap file is compressed!!');
  });
}

function createSitemap() {
  var sitemap = sm.createSitemap({
    hostname: config.host,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n      xmlns:xhtml="http://www.w3.org/1999/xhtml"\n      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"'
  });

  return sitemap;
}

function addToSitemap(sitemap, data, params) {
  data.forEach(function (current) {
    sitemap.add({
      url: params.route + '/' + current.slug,
      changefreq: params.changefreq || 'daily',
      priority: params.priority || 0.5,
      lastmodISO: current.modified || getDate()
    });
  });

  return sitemap;
}

function createSitemapFile(sitemap, params) {
  fs.writeFile(params.sitemap_path, sitemap.toString(), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(params.sitemapName + ' sitemap has been created!!');
    compress(params.sitemap_path);
  });
}

module.exports = {
  createSitemap: createSitemap,
  createSitemapFile: createSitemapFile,
  compress: compress,
  addToSitemap: addToSitemap,
  getData: getData,
  getDate: getDate
};

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = require("jimp");

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = require("mkdirp");

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = require("mongodb");

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = require("multer");

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = require("node-cron");

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = require("request");

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = require("zlib");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_helmet__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_morgan__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rotating_file_stream__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rotating_file_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rotating_file_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_sitemaps_schedule__ = __webpack_require__(11);
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

//For some reason in develop, express precondition provoke an error when the user load more
//offers using ajax
if (!develop) {
  //const preconditions = require('express-preconditions');
  //app.use(preconditions())
  //morganFormat = 'dev'
}
app.use(__WEBPACK_IMPORTED_MODULE_5_body_parser___default.a.json({ limit: '3mb' }));
// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_4__api__["a" /* default */]);
app.use(__WEBPACK_IMPORTED_MODULE_6_morgan___default()(morganFormat, { stream: accessLogStream }));
//Security
app.use(__WEBPACK_IMPORTED_MODULE_3_helmet___default()());
app.disable('x-powered-by');

// Import and Set Nuxt.js options
var nuxtConfig = __webpack_require__(9);
nuxtConfig.dev = develop;

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_0_nuxt___default.a(nuxtConfig);
//before nuxt render to compress data
app.set('view cache', true); //Cache template compilation
app.use(__WEBPACK_IMPORTED_MODULE_2_compression___default()()); //Compress all the data that the server response

//At the end because it won't call next()
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
//Schedule ping to web search engines
__WEBPACK_IMPORTED_MODULE_10__utils_sitemaps_schedule___default.a.ping();
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }
/******/ ]);
//# sourceMappingURL=main.map