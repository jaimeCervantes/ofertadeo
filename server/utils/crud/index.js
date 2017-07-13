var wagner = require('wagner-core');
require('../../config.js')(wagner);
require('../../db/connection.js')(wagner);

/**
 * Cambiar utl de las imagenes de categorias, tiendas y ofertas
 * @param  {[type]} conn)         {                 return                              conn;}).then(function(db) {	var        cursor [description]
 * @param  {[type]} options.$set: {            img: 'https:	});}).catch(function(err) {	console.log(err);       [description]
 * @return {[type]}               [description]
 */
var conf;
wagner.invoke(function(conn, config) {
  conf = config;
  return conn
})
.then(function(conn) {
	var mainQuery = { img: { $regex: /^[^(http)]/ } };
	['stores', 'offers', 'categories'].forEach(function(collection) {
		addDomainToUrl( conn, {
			collection: collection,
			query: mainQuery,
			callback: function (doc, conn) {
				conn.collection(collection).updateOne(mainQuery, { $set: { img: conf.host + doc.img } });
			}
		});
	})
})
.catch(function(err) {
	console.log(err);
});

function addDomainToUrl( conn, params ) {
	var query =  params.query || { img: { $regex: /^[^(http)]/ } };
	var cursor = conn.collection(params.collection).find(query, params.projection)
	cursor.forEach(function(doc) {
		params.callback(doc, conn)
	});
}