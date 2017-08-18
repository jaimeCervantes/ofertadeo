var wagner = require('wagner-core');
var sm = require('sitemap')
var config = require('../../config.js')(wagner);
var fs = require('fs');
var zlib = require('zlib');
var utils = require('../index.js')

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
    hostname: config.host,
    xmlNs: `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"`
  });

  return sitemap
}

function addToSitemap(sitemap, data, params) {
  data.forEach(function(current) {
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
        title: current.img_title,
      };
    }
             
    sitemap.add(obj);
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
};