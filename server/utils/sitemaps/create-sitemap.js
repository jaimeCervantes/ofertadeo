var utils = require('./utils.js');
var config = require('../../config')();
var sm = require('sitemap')
var fs = require('fs');

var modified = new Date().toISOString();
var offers = '/sitemaps/sitemap-ofertas.xml';
var stores_categories_pages = '/sitemaps/sitemap-paginas.xml';

var compoundSitemap = utils.createSitemap();
compoundSitemap.add({url: '/', changefreq: 'daily', priority: 1.0, lastmodISO: modified});
compoundSitemap.add({url: config.routes.storeList, changefreq: 'weekly', priority: 0.7, lastmodISO: modified});
compoundSitemap.add({url: config.routes.categoriesList, changefreq: 'weekly', priority: 0.7, lastmodISO: modified});

utils.getData( { collection: 'stores'} )
.then(function(data) {
  utils.addToSitemap(compoundSitemap, data,  {
    route: config.routes.storeList,
    changefreq: 'daily',
    priority: 0.9
  });
})
.then(function() {
  utils.getData( { collection: 'categories'} )
  .then(function(data) {
    utils.addToSitemap(compoundSitemap, data,  {
      route: config.routes.categories,
      changefreq: 'daily',
      priority: 0.9
    });

    utils.createSitemapFile(compoundSitemap, {
      sitemap_path: config.paths.static + stores_categories_pages,
      sitemapName: stores_categories_pages
    });

  });
});

var offersSitemap = utils.createSitemap();

utils.getData({collection: config.db.mainCollection })
.then(function (data) {
  utils.addToSitemap(offersSitemap, data, {
    route: config.routes.main,
    changefreq: 'daily',
    priority: 0.5
  });
})
.then(function() {
  utils.createSitemapFile(offersSitemap, {
    sitemap_path: config.paths.static + offers,
    sitemapName: offers
  });
});

var index = sm.buildSitemapIndex({
  urls: [config.host + stores_categories_pages + '.gz', config.host + offers + '.gz']
});

fs.writeFile(config.paths.static + '/sitemaps/sitemap.xml', index.toString(), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Index sitemap is created :=)');
});