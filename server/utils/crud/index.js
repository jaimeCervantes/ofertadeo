const utils = require('./utils');
const config = require('../../config.js');
let conf = config();

utils.update({
	collections: ['offers'],
	query: { store_id: { $exists: true} },
	projection: { store_id: 1 },
	callback: function (conn, coll, doc) {
		console.log(doc);
		conn.collection(coll).updateOne({_id: doc._id}, { $set: { stores: [doc.store_id] }, $unset: { store_id: '' } })
	}
});