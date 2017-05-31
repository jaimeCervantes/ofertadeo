var csm = require('./create-sitemap');
var config = require('../../config')();
var sm = require('sitemap')
var fs = require('fs');

var offers = '/sitemaps/sitemap-ofertas.xml';
var categories = '/sitemaps/sitemap-categorias.xml';
var stores = '/sitemaps/sitemap-tiendas.xml';

csm.createSitemap({
  sitemap_path: config.paths.static + offers,
  route: config.routes.main,
  db_params: { collection: 'offers'}
});

csm.createSitemap({
  sitemap_path: config.paths.static + stores,
  route: config.routes.storeList,
  db_params: { collection: 'stores'}
});

csm.createSitemap({
  sitemap_path: config.paths.static + categories,
  route: config.routes.categories,
  db_params: { collection: 'categories'}
});

var index = sm.buildSitemapIndex({
  urls: [config.host + offers + '.gz', config.host + categories + '.gz', config.host + stores + '.gz']
});

fs.writeFile(config.paths.static + '/sitemaps/sitemap.xml', index.toString(), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Index sitemap is created :=)');
});