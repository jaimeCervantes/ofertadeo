const utils = require('./utils');
const config = require('../../config.js');
let conf = config();

utils.update({
	collections: ['categories', 'stores'],
	query: {},
	projection: { name: 1, img: 1 },
	callback: function (conn, coll, doc) {
		var imgParts = doc.img.split('.');
		conn.collection(coll).updateOne({id: doc._id}, { $set: { thumbnail: imgParts[0] + '_thumb.' + imgParts[1] } })
	}
});