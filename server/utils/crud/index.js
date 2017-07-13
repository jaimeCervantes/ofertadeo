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
	var cursor = conn.collection('stores').find({ img: { $regex: /^[^(http)]/ } }, { img: 1})
	cursor.forEach(function(doc) {
		console.log(doc.img);
		conn.collection('stores').updateOne(
			{ img: doc.img },
			{ $set: { img: conf.host + doc.img }
		})
	});

	cursor = conn.collection('categories').find({ img: { $regex: /^[^(http)]/ } }, { img: 1})
	cursor.forEach(function(doc) {
		console.log(doc.img);
		conn.collection('categories').updateOne(
			{ img: doc.img },
			{ $set: { img: conf.host + doc.img }
		})
	});

	cursor = conn.collection('offers').find({ img: { $regex: /^[^(http)]/ } }, { img: 1})
	cursor.forEach(function(doc) {
		console.log(doc.img);
		conn.collection('offers').updateOne(
			{ img: doc.img },
			{ $set: { img: conf.host + doc.img }
		})
	});
})
.catch(function(err) {
	console.log(err);
});