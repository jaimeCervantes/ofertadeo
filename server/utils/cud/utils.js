// const config = require('../../config.js')
const conn = require('../../db/connection.js')

// query = { thumbnail: { $regex: /^[^(http)]/ } }
// projection = { img: 1, thumbnail: 1}
// update = { $set: { img: config.host + doc.img, thumbnail: config.host + doc.thumbnail } }

// query = { modified: { $exists: true} };
// projection = { modified: 1}
// update = { $set: { published: doc.modified } }

module.exports = {
  /**
   * Cambiar URL de imagenes de categorias, tiendas y ofertas
   * @return {undefined}
   */
  update (params) {
    conn.then(function (conn) {
      params.collections.forEach(function (coll) {
        let cursor = conn.collection(coll).find(params.query || {}, params.projection || {})
        cursor.forEach(function (doc) {
          if (typeof (params.callback) === 'function') {
            params.callback(conn, coll, doc)
          } else {
            conn.collection(coll).updateOne(params.query, params.update)
          }
        })
      })
    })
      .then(function () {
        console.log('update operation done')
        console.log(params)
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
