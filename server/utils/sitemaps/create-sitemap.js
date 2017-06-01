var wagner = require('wagner-core');
var sm = require('sitemap')
var config = require('../../config.js')(wagner);
require('../../db/connection.js')(wagner);
var crud = require('../../db/crud.js');
var fs = require('fs');
var zlib = require('zlib');

var modified = new Date().toISOString();

function getData (params) {
  return wagner.invoke(function(conn) {
      return conn;
    }).then(function(db) {
      return crud({ db: db });
    }).then(function(crud){
      return crud.getItems({
          collection: params.collection || 'offers',
          query: params.query || {},
          projection: params.projection || { slug: 1 }
        })
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

function createSitemap () {
  var sitemap = sm.createSitemap({
    hostname: config.host
  });

  return sitemap
}

function addToSitemap(sitemap, data, params) {
  data.forEach(function(current) {
    sitemap.add({
      url: params.route + '/' + current.slug,
      changefreq: params.changefreq || 'daily',
      priority: params.priority || 0.5,
      lastmodISO: current.modified || modified
    });
  });

  return sitemap
}

function createSitemapFile (sitemap, params) {
  fs.writeFile(params.sitemap_path, sitemap.toString(), function(err) {
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
  getData: getData
} 