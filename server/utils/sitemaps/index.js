var csm = require('./create-sitemap');
var config = require('../../config')();
var offers = config.paths.static + '/sitemaps/sitemap-ofertas.xml';
var categories = config.paths.static + '/sitemaps/sitemap-categorias.xml';
var stores = config.paths.static + '/sitemaps/sitemap-tiendas.xml';

csm({
  sitemap_path: offers,
  route: config.routes.main,
  db_params: { collection: 'offers'}
});

csm({
  sitemap_path: stores,
  route: config.routes.storeList,
  db_params: { collection: 'stores'}
});

csm({
  sitemap_path: categories,
  route: config.routes.categories,
  db_params: { collection: 'categories'}
});