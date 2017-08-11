const utils = require('./utils');
const config = require('../../config.js');
let conf = config();

utils.update({
	collections: ['offers', 'pages', 'categories', 'stores'],
	query: { published: { $exists: true} },
	projection: { published: 1 },
	callback: function (conn, coll, doc) {
		console.log(doc);
		conn.collection(coll).updateOne({_id: doc._id}, { $set: { published: new Date(doc.published) } })
	}
});

utils.update({
	collections: ['offers', 'pages', 'categories', 'stores'],
	query: { published: { $exists: true} },
	projection: { published: 1 },
	callback: function (conn, coll, doc) {
		console.log(doc);
		conn.collection(coll).updateOne({_id: doc._id}, { $set: { modified: new Date(doc.published) } })
	}
});