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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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
    getItem: getItem,
    searchItems: searchItems,
    aggregation: aggregation
  };
};

function getItems(params) {
  var db = DATABASE || params.db;
  var items_per_page = params.items_per_page || ITEMS_PER_PAGE;
  return db.collection(COLLECTION || params.collection).find(params.query || {}, params.projection || {}).sort(params.sort || { _id: 1 }).skip(params.skip || 0).limit(items_per_page).toArray().then(function (docs) {
    if (items_per_page > 1) {
      return docs;
    } else {
      return docs[0];
    }
  }).catch(function (err) {
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
  .find(params.query, params.projection || { score: { $meta: 'textScore' } }).sort(params.sort || { score: { $meta: 'textScore' } }).skip(params.skip || 0).limit(params.items_per_page || ITEMS_PER_PAGE).toArray().then(function (docs) {
    return docs;
  }).catch(function (err) {
    return err;
  });
}

function getPagination(params) {
  var db = DATABASE || params.db;
  return db.collection(COLLECTION || params.collection).find(params.query || {}).count().then(function (numItems) {
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
/* 2 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("wagner-core");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = {
  loading: {
    color: '#42a5f5',
    height: '11px'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Ofertas, promociones y descuentos en México | Ofertadeo',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'theme-color', content: '#1976d2' }, { hid: 'title', name: 'title', content: 'Ofertas, promociones y descuentos en México | Ofertadeo' }, { hid: 'publisher', rel: 'publisher', href: 'https://plus.google.com/110009950298317863923' }, { hid: 'description', name: 'description', content: 'Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!' }, { hid: 'og:locale', property: 'og:locale', content: 'es-MX' }, { hid: 'og:type', property: 'og:type', content: 'website' }, { hid: 'og:site_name', property: 'og:site_name', content: 'Ofertadeo' }, { hid: 'og:title', property: 'og:title', content: 'Ofertas, promociones y descuentos en México | Ofertadeo' }, { hid: 'og:description', property: 'og:description', content: 'Descubre las mejores ofertas, promociones y descuentos en México de las principales tiendas de tu ciudad.  ✓ ¡Ahorra con ofertadeo!' }, { hid: 'og:url', property: 'og:url', content: 'https://ofertadeo.com' }, { hid: 'og:image', property: 'og:image', content: 'https://ofertadeo.com/logo.png' }, { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: 'https://ofertadeo.com/logo.png' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    htmlAttrs: {
      lang: 'es-MX'
    }
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var bodyParser = __webpack_require__(2);
var wagner = __webpack_require__(3);
var home = __webpack_require__(9);
var categories = __webpack_require__(8);
var stores = __webpack_require__(11);
var promotions = __webpack_require__(10);

__webpack_require__(12)(wagner);
__webpack_require__(13)(wagner);

var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
// Add USERS Routes
router.use(home(wagner));
router.use(categories(wagner));
router.use(stores(wagner));
router.use(promotions(wagner));

/* harmony default export */ exports["a"] = router;

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("compression");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var crudFn = __webpack_require__(1);
var ITEMS_PER_PAGE = 6;
var COLLECTION = 'categories';

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
      collection: conf.db.mainCollection,
      query: { categories: req.params._id },
      items_per_page: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * page,
      projection: { name: 1, thumbnail: 1, store_id: 1, slug: 1 }
    }), crudInst.getItem({
      collection: COLLECTION,
      query: { _id: req.params._id },
      projection: { name: 1, thumbnail: 1, slug: 1, content: 1, img: 1 }
    }), crudInst.getPagination({
      query: { store_id: req.params._id },
      collection: conf.db.mainCollection
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
      collection: COLLECTION,
      items_per_page: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * page,
      projection: { name: 1, slug: 1, thumbnail: 1 }
    }), crudInst.getPagination({
      collection: COLLECTION
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var crudFn = __webpack_require__(1);
var ITEMS_PER_PAGE = 6;
var COLLECTION = 'offers';

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
    var page = req.query.page ? Number(req.query.page) : 0;
    var iterable = [crudInst.getItems({
      collection: COLLECTION,
      items_per_page: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * page,
      projection: { name: 1, thumbnail: 1, store_id: 1, slug: 1 }
    }), crudInst.getPagination({
      collection: COLLECTION
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var crudFn = __webpack_require__(1);

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
      slug();
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
      projection: { name: 1, thumbnail: 1, store_id: 1, categories: 1, slug: 1, content: 1, url: 1, img: 1, modified: 1 } })];

    return Promise.all(iterable).then(function (results) {
      res.json({
        item: results[0]
      });
    }).catch(function (error) {
      res.json(error);
    });
  });
}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();
var crudFn = __webpack_require__(1);
var ITEMS_PER_PAGE = 6;
var COLLECTION = 'stores';

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
      collection: conf.db.mainCollection,
      query: { store_id: req.params._id },
      items_per_page: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * page,
      projection: { name: 1, thumbnail: 1, store_id: 1, slug: 1 }
    }), crudInst.getItem({
      collection: COLLECTION,
      query: { _id: req.params._id },
      projection: { name: 1, thumbnail: 1, slug: 1, url_site: 1, content: 1, img: 1 }
    }), crudInst.getPagination({
      query: { store_id: req.params._id },
      collection: conf.db.mainCollection
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
      collection: COLLECTION,
      items_per_page: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * page,
      projection: { name: 1, slug: 1, thumbnail: 1 }
    }), crudInst.getPagination({
      collection: COLLECTION
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var wagner = __webpack_require__(3);
var path = __webpack_require__(15);

var config = {
  db: {
    user: "ofertadeo_user",
    password: "Cdo_2017*",
    name: 'ofertadeo',
    host: 'ds131621.mlab.com:31621',
    shard1: 'pensemosweb-shard-00-00-147ev.mongodb.net:27017',
    shard2: 'pensemosweb-shard-00-01-147ev.mongodb.net:27017',
    shard3: 'pensemosweb-shard-00-02-147ev.mongodb.net:27017',
    queryString: '?ssl=true&replicaSet=pensemosweb-shard-0&authSource=admin',
    mainCollection: 'offers'
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var MongoClient = __webpack_require__(14).MongoClient;

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
/* 14 */
/***/ function(module, exports) {

module.exports = require("mongodb");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(5);






var bodyParser = __webpack_require__(2);

var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

app.set('port', port);

// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */]);

// Import and Set Nuxt.js options
var nuxtConfig = __webpack_require__(4);
nuxtConfig.dev = !("production" === 'production');

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

/***/ }
/******/ ]);
//# sourceMappingURL=main.map