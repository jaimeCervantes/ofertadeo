const utils = require('./utils');
const config = require('../../config.js');
let conf = config();

utils.update({
	collections: ['categories', 'stores'],
	query: {},
	projection: { name: 1, img: 1 },
	callback: function (conn, coll, doc) {
		var imgParts = doc.img.split('.');
		var imgPart1 =  imgParts.slice(0, imgParts.length-1).join('.');
		var finalPart = imgPart1 + '_thumb.' + imgParts[imgParts.length-1];
		console.log(finalPart);
		conn.collection(coll).updateOne({_id: doc._id}, { $set: { thumbnail: finalPart } })
	}
});