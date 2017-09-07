let mkdirp = require('mkdirp')
let path = require('path')
let multer = require('multer')
let jimp = require('jimp')

module.exports = function (spec) {
  let that = {}
  spec = spec || {}

  function getPath (file) {
    let date = new Date()
    let finalPath = path.join(`${spec.config.paths.static}/uploads/${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`)
    if (file) {
      finalPath = `${finalPath}/{file.originalname}`
    }
    return finalPath
  }

  function mkdirPromise (pathFile) {
    return new Promise(function (resolve, reject) {
      mkdirp(pathFile, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(`Directorio creado: ${pathFile}`)
        }
      })
    })
  }

  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      let pathFile = getPath()
      mkdirPromise(pathFile)
      .then(function (success) {
        callback(null, pathFile)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  })

  let multerUpload = multer({ storage: storage }).array('offerFile', 3) // Field name and max count

  function upload () {
    spec.router.post('/upload', function (req, res) {
      return multerUpload(req, res, function (error) {
        if (error) {
          res.json(error)
        }

        if (req.files && req.files[0]) {
          let path = getPath()
          let file = req.files[0]
          let originalName = file.originalname
          let name = originalName.split('.')[0]
          let extension = originalName.split('.')[1]
          let filePath = `${path}/${originalName}`
          let finalRootPath = path.split(spec.config.paths.static)[1]

          jimp.read(filePath)
          .then(function (img) {
            return img.scaleToFit(300, 300)// resize
                   .quality(50)// set JPEG quality
                   .write(`${path}/${name}_thumb.${extension}`) // save
          }).then(function (result) {
            res.json({
              success: true,
              img: spec.config.host + filePath.split(spec.config.paths.static)[1],
              thumbnail: `${spec.config.host}${finalRootPath}/${name}_thumb.${extension}`
            })
          }).catch(function (err) {
            console.log('Error al tratar de Guardar o Leer la imagen')
            console.log(err)
            res.json({ success: false, msg: 'Ocurrio un error al guardar la imagen revisar con el desarrollador' })
          })
        } else {
          res.json({ success: false, msg: 'No obtuvimos ningun archivo de la peticón' })
        }
      })
    })
  }

  that.upload = upload

  return that
}
