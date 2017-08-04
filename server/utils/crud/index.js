const utils = require('./utils');
const config = require('../../config.js');
let conf = config();

utils.update({
	collections: ['offers', 'stores', 'categories', 'pages'],
	query: { thumbnail: { $regex: /^[^(http)]/ } },
	projection: { thumbnail: 1},
	callback: function (conn, coll, doc) {
		conn.collection(coll).updateOne(this.query, { $set: { thumbnail: conf.host + doc.thumbnail } })
	}
});

utils.update({
	collections: ['offers', 'stores', 'categories', 'pages'],
	query: { img: { $regex: /^[^(http)]/ } },
	projection: { img: 1 },
	callback: function (conn, coll, doc) {
		conn.collection(coll).updateOne(this.query, { $set: { img: conf.host + doc.img } })
	}
});