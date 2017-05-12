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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Ofertadeo',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Ofertadeo' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/css/main.scss', lang: 'scss' }, // scss instead of sass
  '~assets/css/roboto-material-icons.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vue-material'],
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var bodyParser = __webpack_require__(1);
var wagner = __webpack_require__(11);
var config = __webpack_require__(7);
var home = __webpack_require__(6);

wagner.factory('config', function () {
  return config;
});
__webpack_require__(8)(wagner);

var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
// Add USERS Routes
router.use(home(wagner));

/* harmony default export */ exports["a"] = router;

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("compression");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var crudFn = __webpack_require__(9);

var crudInst;
var conf;
module.exports = function (wagner, params) {
  wagner.invoke(function (conn, config) {
    conf = config;
    return conn;
  }).then(function (db) {
    crudInst = crudFn({
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
    var iterable = [crudInst.getItems({ collection: 'categories', items_per_page: 20 }), crudInst.getItems({ collection: 'stores', items_per_page: 20, projection: { name: 1, slug: 1 } }), crudInst.aggregation({ collection: 'stores',
      aggregation: [{ $match: { "catalogs.0": { $exists: true } } }, { $sort: { name: 1 } }, { $limit: 5 }, { $project: { _id: 0, catalogs: 1 } }, { $unwind: "$catalogs" }, { $project: { "catalogs.title": 1, "catalogs.thumbnail": 1 } }]
    })];

    Promise.all(iterable).then(function (results) {
      res.json({
        categories: results[0],
        stores: results[1],
        catalogs: results[2],
        routes: conf.routes
      });
    }).catch(function (error) {
      console.log(error);
      res.json(error);
    });
  });
}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  db: {
    user: "ofertadeo_user",
    password: "Cdo_2017*",
    name: 'ofertadeo',
    host: 'ds131621.mlab.com:31621',
    shard1: 'pensemosweb-shard-00-00-147ev.mongodb.net:27017',
    shard2: 'pensemosweb-shard-00-01-147ev.mongodb.net:27017',
    shard3: 'pensemosweb-shard-00-02-147ev.mongodb.net:27017',
    queryString: '?ssl=true&replicaSet=pensemosweb-shard-0&authSource=admin'
  },
  routes: {
    categories: '/categorias',
    stores: '/folletos-catalogos'
  }
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var MongoClient = __webpack_require__(10).MongoClient;

function getConnection(config) {
  //connPromise is pending when trying to connect to mongodb atlas
  // var shards = config.db.shard1 + ',' + config.db.shard2 + ',' + config.db.shard3;
  // var url = 'mongodb://' + config.db.user + ':' + config.db.password + '@' + shards + '/' + config.db.name + config.db.queryString;
  var url = 'mongodb://' + config.db.user + ':' + config.db.password + '@' + config.db.host + '/' + config.db.name;

  return MongoClient.connect(url).then(function (conn) {
    console.log('It is connected to db: ' + config.db.name);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DATABASE;
var COLLECTION;
var ITEMS_PER_PAGE;

module.exports = function (params) {
  COLLECTION = params.collection;
  DATABASE = params.db;
  ITEMS_PER_PAGE = params.items_per_page || 6;

  return {
    getPagination: getPagination,
    getItems: getItems,
    searchItems: searchItems,
    aggregation: aggregation
  };
};

function getItems(params) {
  var db = DATABASE || params.db;
  return db.collection(COLLECTION || params.collection).find(params.query || {}, params.projection || {}).sort(params.sort || { _id: 1 }).skip(params.skip || 0).limit(params.items_per_page || ITEMS_PER_PAGE).toArray().then(function (docs) {
    return docs;
  }).catch(function (err) {
    return err;
  });
}

function searchItems(params) {
  var db = DATABASE || params.db;
  return db.collection(COLLECTION || params.collection)
  //we project the textScore meta data and then we sort the results by the best matches first
  .find(params.query, params.projection || { score: { $meta: 'textScore' } }).sort(params.sort || { score: { $meta: 'textScore' } }).skip(params.skip || 0).limit(params.items_per_page || ITEMS_PER_PAGE).toArray().then(function (docs) {
    return docs;
  }).catch(function (err) {
    return err;
  });
}

function getPagination(params) {
  var db = DATABASE || params.db;
  return db.collection(COLLECTION || params.collection).find(params.query).count().then(function (numItems) {
    var items_per_page = params.items_per_page || ITEMS_PER_PAGE;
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
}

function aggregation(params) {
  var db = DATABASE || params.db;
  return db.collection(COLLECTION || params.collection).aggregate(params.aggregation).toArray().then(function (data) {
    return data;
  }).catch(function (err) {
    return err;
  });
}

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("mongodb");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("wagner-core");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(3);






var bodyParser = __webpack_require__(1);

var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

app.set('port', port);

// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */]);

// Import and Set Nuxt.js options
var nuxtConfig = __webpack_require__(2);
nuxtConfig.dev = !("development" === 'production');

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
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }
/******/ ]);
//# sourceMappingURL=main.map