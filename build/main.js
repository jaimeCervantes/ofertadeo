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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
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
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);


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
  host: 'https://www.ofertadeo.com',
  paths: {
    root: __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__dirname, '../'),
    server: __dirname,
    static: __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__dirname, '../static'),
    xml: '/home/jaime/xml',
    feed: '/home/jaime/static/feed'
  },
  app_status: 'deploy'
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(1).config;

module.exports = CRUD;

function CRUD(params) {
  this.COLLECTION = params.collection;
  this.DATABASE = params.db;
  this.ITEMS_PER_PAGE = params.items_per_page || config.db.itemsPerPage;
};

CRUD.prototype.getItems = function (params) {
  var db = this.DATABASE || params.db;
  var items_per_page = params.items_per_page || this.ITEMS_PER_PAGE;
  var cursor = db.collection(this.COLLECTION || params.collection).find(params.query || {}, params.projection || {});

  if (params.sort) {
    cursor.sort(params.sort);
  }

  if (params.skip) {
    cursor.skip(params.skip);
  }

  return cursor.limit(items_per_page).toArray().then(function (docs) {
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
  return db.collection(this.COLLECTION || params.collection).count(params.query || {}).then(function (numItems) {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

var config = __webpack_require__(1).config;
var wagner = __webpack_require__(6);
var Crud = __webpack_require__(2);

__webpack_require__(1)(wagner);
__webpack_require__(7)(wagner);

function getCrud() {
  return wagner.invoke(function (conn) {
    return conn;
  }).then(function (conn) {
    return new Crud({ db: conn });
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
/* 4 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("wagner-core");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var MongoClient = __webpack_require__(32).MongoClient;

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var utils = __webpack_require__(3);
var smUtils = __webpack_require__(29);
var config = __webpack_require__(1)();
var sm = __webpack_require__(11);
var fs = __webpack_require__(4);
var request = __webpack_require__(10);
var rootXml = config.paths.xml;
var offers = 'sitemap-offers.xml';
var pages_name = 'sitemap-pages.xml';
var stores_name = 'sitemap-stores.xml';
var categories_name = 'sitemap-categories.xml';

function getData(params) {
  return utils.getCrud().then(function (crud) {
    return crud.getItems({
      collection: params.collection || config.db.collections.main,
      query: params.query || {},
      projection: params.projection || { slug: 1, modified: 1 },
      items_per_page: params.items_per_page || 10000,
      sort: { published: -1 }
    }).catch(function (err) {
      return err;
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function smPages() {
  var modified = utils.getDate();
  var compoundSitemap = smUtils.createSitemap();

  compoundSitemap.add({ url: '/', changefreq: 'daily', priority: 1.0, lastmodISO: modified });

  getData({ collection: config.db.collections.pages }).then(function (data) {
    smUtils.addToSitemap(compoundSitemap, data, {
      route: '',
      changefreq: 'weekly',
      priority: 0.7
    });
  }).then(function (algo) {
    smUtils.createSitemapFile(compoundSitemap, {
      sitemap_path: rootXml + '/' + pages_name,
      sitemapName: pages_name
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function smCategories() {
  var smCategories = smUtils.createSitemap();
  getData({ collection: config.db.collections.categories }).then(function (data) {
    smUtils.addToSitemap(smCategories, data, {
      route: config.routes.categories,
      changefreq: 'weekly',
      priority: 0.9
    });
  }).then(function () {
    smUtils.createSitemapFile(smStores, {
      sitemap_path: rootXml + '/' + categories_name,
      sitemapName: categories_name
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function smStores() {
  var smStores = smUtils.createSitemap();
  getData({ collection: config.db.collections.secundary }).then(function (data) {
    smUtils.addToSitemap(smStores, data, {
      route: config.routes.storeList,
      changefreq: 'weekly',
      priority: 0.9
    });
  }).then(function () {
    smUtils.createSitemapFile(smStores, {
      sitemap_path: rootXml + '/' + stores_name,
      sitemapName: stores_name
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function smOffers() {
  var offersSitemap = smUtils.createSitemap();

  getData({ collection: config.db.collections.main }).then(function (data) {
    smUtils.addToSitemap(offersSitemap, data, {
      route: config.routes.main,
      changefreq: 'monthly',
      priority: 0.5
    });
  }).then(function () {
    smUtils.createSitemapFile(offersSitemap, {
      sitemap_path: rootXml + '/' + offers,
      sitemapName: offers
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function smIndex() {
  var content = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<sitemap>\n  <loc>' + config.host + '/' + pages_name + '.gz</loc>\n  <lastmod>' + utils.getDate() + '</lastmod>\n</sitemap>\n<sitemap>\n  <loc>' + config.host + '/' + offers + '.gz</loc>\n  <lastmod>' + utils.getDate() + '</lastmod>\n</sitemap>\n<sitemap>\n  <loc>' + config.host + '/' + stores_name + '.gz</loc>\n  <lastmod>' + utils.getDate() + '</lastmod>\n</sitemap><sitemap>\n  <loc>' + config.host + '/' + categories_name + '.gz</loc>\n  <lastmod>' + utils.getDate() + '</lastmod>\n</sitemap>\n</sitemapindex>';

  fs.writeFile(rootXml + '/sitemap.xml', content, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    smUtils.compress(rootXml + '/sitemap.xml');
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
  stores: smStores,
  categories: smCategories,
  ping: ping
};

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("node-cron");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("request");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("sitemap");

/***/ },
/* 12 */
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
  plugins: [{ src: '~plugins/ga.js', ssr: false }, { src: '~plugins/pc.js', ssr: false }],
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var wagner = __webpack_require__(6);
var home = __webpack_require__(22);
var categories = __webpack_require__(21);
var stores = __webpack_require__(24);
var promotions = __webpack_require__(23);
var upload = __webpack_require__(25);

__webpack_require__(1)(wagner);
__webpack_require__(7)(wagner);

var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
// Add USERS Routes
router.use(home(wagner));
router.use(categories(wagner));
router.use(stores(wagner));
router.use(promotions(wagner));
router.use(upload(wagner));

/* harmony default export */ exports["a"] = router;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

var cron = __webpack_require__(9);
var csm = __webpack_require__(8);
var utils = __webpack_require__(3);

var schedule = {
	ping: ping
};

function ping() {
	//cron.schedule('*/1 * * * *', function (){
	cron.schedule('1 12 * * *', function () {
		//run every day at 12:00 hrs
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

	//cron.schedule('*/1 * * * *', function (){
	cron.schedule('50 23 * * *', function () {
		//run every day at 23:50 hours
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
/* 15 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = require("compression");

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = require("helmet");

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = require("morgan");

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = require("rotating-file-stream");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(2);

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
      projection: { name: 1, thumbnail: 1, slug: 1, content: 1, img: 1, img_alt: 1, img_title: 1, img_data: 1 }
    }), crudInst.getPagination({
      query: { categories: req.params._id },
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
      projection: {
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(2);
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(2);
var csm = __webpack_require__(8);
var feed = __webpack_require__(27);
var pn = __webpack_require__(28);

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
    var rightNow = new Date();
    var data = Object.assign({ modified: rightNow, published: rightNow }, req.body);
    crudInst.setItem({
      collection: conf.db.collections.main,
      document: data
    }).then(function (result) {
      res.json(result);
      if (result.insertedId) {
        // @TODO, when we use more than one category and more than one store, the updateOne 
        // operation should be execute for each element in the arrary categories and stores
        return Promise.all([crudInst.updateOne({
          collection: conf.db.collections.secundary,
          query: { _id: data.stores[0] },
          update: { $set: { modified: rightNow } }
        }), crudInst.updateOne({
          collection: conf.db.collections.categories,
          query: { _id: data.categories[0] },
          update: { $set: { modified: rightNow } }
        })]);
      }
    }).then(function (results) {
      if (results && results.length > 0) {
        //Update sitemaps
        csm.pages();
        csm.offers();
        csm.stores();
        csm.categories();
        csm.index();
        //Update feed
        feed.create();
        //Push notifications
        pn.all({
          title: data.title,
          url: conf.host + conf.routes.main + '/' + data.slug,
          message: data.meta_description
          //@TODO: To set an image to the notifications using pushcrew, we need to create an PNG imgage 192X192
          //,image_url: data.thumbnail
        });
      }
    }).catch(function (err) {
      res.json(err);
    });
  });
}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(2);
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
      query: { stores: req.params._id },
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
      projection: { name: 1, thumbnail: 1, slug: 1, content: 1, url_site: 1, img: 1, img_alt: 1, img_title: 1, img_data: 1 }
    }), crudInst.getPagination({
      query: { stores: req.params._id },
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
      projection: {
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_multer__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_multer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_multer__);


var express = __webpack_require__(0);
var router = express.Router();
var CRUD = __webpack_require__(2);
var mkdirp = __webpack_require__(31);
var path = __webpack_require__(5);

var jimp = __webpack_require__(30);

var crudInst;
var conf;
var rootPathUploads = '/home/jaime/static';
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
        return img.scaleToFit(300, 300) // resize
        .quality(50) // set JPEG quality
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var xml = __webpack_require__(35);
var utils = __webpack_require__(3);

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
        feed.push({ "link": { _attr: { rel: 'self', href: atomLink } } });
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
          "atom:link": {
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
          "atom:link": {
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var config = __webpack_require__(1).config;
var Feed = __webpack_require__(26);
var fs = __webpack_require__(4);
var striptags = __webpack_require__(34);
var utils = __webpack_require__(3);
var cron = __webpack_require__(9);

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
				title: 'Ofertadeo',
				description: 'Nuevas ofertas',
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
				var description = content.slice(0, 150);
				if (description.length === 150) {
					description += '...';
				}
				feedXml.addItem({
					title: doc.title,
					link: config.host + config.routes.main + '/' + doc.slug,
					description: description,
					content: doc.content,
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
		//cron.schedule('*/1 * * * *', function (){
		cron.schedule('1 12 * * *', function () {
			//run every day at 12:00 hrs
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

		//cron.schedule('*/1 * * * *', function (){
		cron.schedule('50 23 * * *', function () {
			//run every day at 23:50 hours
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

var request = __webpack_require__(10);
var apiKey = '61e4d89d5d5d1391dc97ca0c471003d4';
if (true) {
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

var wagner = __webpack_require__(6);
var sm = __webpack_require__(11);
var config = __webpack_require__(1)(wagner);
var fs = __webpack_require__(4);
var zlib = __webpack_require__(36);
var utils = __webpack_require__(3);

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
      lastmodISO: utils.getDate(current.modified)
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
  addToSitemap: addToSitemap
};

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = require("jimp");

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = require("mkdirp");

/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports = require("mongodb");

/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports = require("multer");

/***/ },
/* 34 */
/***/ function(module, exports) {

module.exports = require("striptags");

/***/ },
/* 35 */
/***/ function(module, exports) {

module.exports = require("xml");

/***/ },
/* 36 */
/***/ function(module, exports) {

module.exports = require("zlib");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_helmet__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_morgan__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rotating_file_stream__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rotating_file_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rotating_file_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_sitemaps_schedule__ = __webpack_require__(14);
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
app.use(__WEBPACK_IMPORTED_MODULE_5_body_parser___default.a.json());
// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_4__api__["a" /* default */]);
app.use(__WEBPACK_IMPORTED_MODULE_6_morgan___default()(morganFormat, { stream: accessLogStream }));
//Security
app.use(__WEBPACK_IMPORTED_MODULE_3_helmet___default()());
app.disable('x-powered-by');

// Import and Set Nuxt.js options
var nuxtConfig = __webpack_require__(12);
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