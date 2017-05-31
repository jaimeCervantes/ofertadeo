var wagner = require('wagner-core');
var sm = require('sitemap')
var config = require('../../config.js')(wagner);
require('../../db/connection.js')(wagner);
var crud = require('../../db/crud.js');
var fs = require('fs');
var zlib = require('zlib');

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

function createSitemap (params) {
  var sitemap = sm.createSitemap({
    hostname: config.host
  });

  var modified = new Date().toISOString();
  getData(params.db_params || {})
  .then(function(data) {
    data.forEach(function(current) {
      sitemap.add({
        url: params.route + '/' + current.slug,
        changefreq: 'daily',
        priority: 0.5,
        lastmodISO: current.modified || modified
      });
    });

    fs.writeFile(params.sitemap_path, sitemap.toString(), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(params.db_params.collection + ' sitemap has been created!!');
      compress(params.sitemap_path);
    });
  });
}


module.exports = createSitemap