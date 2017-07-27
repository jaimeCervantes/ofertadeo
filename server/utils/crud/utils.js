const wagner = require('wagner-core');
const config = require('../../config.js');
const connection = require('../../db/connection.js');

let conf = config(wagner);
connection(wagner);

function addDomainToUrl( conn, params ) {
	var query =  params.query || { img: { $regex: /^[^(http)]/ } };
	var cursor = conn.collection(params.collection).find(query, params.projection);
	cursor.forEach(function(doc) {
		params.callback(doc, conn);
	});
}

module.exports = {
	/**
	 * Cambiar URL de imagenes de categorias, tiendas y ofertas
	 * @return {undefined}
	 */
	updateImgs () {
		wagner.invoke(function(conn, config) {
		  return conn;
		})
		.then(function(conn) {
			let mainQuery = { img: { $regex: /^[^(http)]/ } };
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
		.then(function () {
			console.log('img url done')
		})
		.catch(function(err) {
			console.log(err);
		});
	},

	setPublished ( arr_collections ) {
		wagner.invoke(function(conn) {
			return conn
		})
		.then(function (conn) {
			arr_collections.forEach(function(coll) {
				let cursor = conn.collection(coll).find({ modified: { $exists: true} }, { modified: 1});
				cursor.forEach(function(doc) {
					conn.collection(coll).updateOne({ _id: doc._id }, { $set: { published: doc.modified } });
				})
			})
		})
		.then(function () {
			console.log('published date done')
		})
		.catch(function() {
			console.log(error)
		})
	}
};