<template>
  <section>
    <input type="file" @change="onFileChange" />
    <img class="preview" v-if="isImg && imgPreview" :src="imgPreview" alt="">
    <v-btn primary large :disabled="disabled" v-if="isImg" v-bind:loading="loading" v-on:click.native="uploadImg">Subir imagen</v-btn>
    <v-btn primary large :disabled="disabled" v-if="!isImg" v-bind:loading="loading" v-on:click.native="uploadFile">Subir archivo</v-btn>
  </section>
</template>
<script>
import axios from '~plugins/axios'

export default {
  props: {
    isImg: {
      type: Boolean,
      default: false
    },
    imgMaxSize: {
      type: Number,
      default: 600
    }
  },
  data () {
    return {
      imgPreview: '',
      inMemoryImg: '',
      loading: false,
      disabled: false
    }
  },
  methods: {
    uploadFile (file) {
      this.loading = true
      this.disabled = true
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      var fd = new FormData()
      fd.append('offerFile', file, this.originalname)
      fd.append('extension', this.extension)
      fd.append('originalname', this.originalname)
      return axios.post('/api/upload', fd, config)
    },
    uploadImg () {
      var that = this
      this.uploadFile(this.inMemoryImg)
      .then(function (res) {
        that.loading = false
        that.disabled = false
        that.$emit('on-uploaded', { img: res.data.img, thumbnail: res.data.thumbnail })
        alert('La imagen se subió correctamente')
      })
      .catch(function (err) {
        console.log(err)
        alert('Ocurrió un error al subir el archivo, revisa la consola')
      })
      .then(function () {
        that.loading = false
        that.disabled = false
      })
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.originalname = files[0].name
      this.extension = this.originalname.split('.')[1]
      this.createImage(files[0])
    },
    dataURLToBlob (dataURL) {
      var BASE64_MARKER = ';base64,'
      var parts
      var contentType
      var raw
      var rawLength
      if (dataURL.indexOf(BASE64_MARKER) === -1) {
        parts = dataURL.split(',')
        contentType = parts[0].split(':')[1]
        raw = parts[1]

        return new Blob([raw], {type: contentType})
      }

      parts = dataURL.split(BASE64_MARKER)
      contentType = parts[0].split(':')[1]
      raw = window.atob(parts[1])
      rawLength = raw.length

      var uInt8Array = new Uint8Array(rawLength)

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }

      return new Blob([uInt8Array], {type: contentType})
    },
    createImage (file) {
      this.imgPreview = ''
      var reader = new FileReader()
      var vm = this

      reader.onload = (readerEvent) => {
        var image = new Image()
        image.onload = function (imgEvent) {
          // Resize the image
          var canvas = document.createElement('canvas')
          var maxSize = vm.imgMaxSize
          var width = image.width
          var height = image.height
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width
              width = maxSize
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height
              height = maxSize
            }
          }
          canvas.width = width
          canvas.height = height
          canvas.getContext('2d').drawImage(image, 0, 0, width, height)
          vm.inMemoryImg = vm.dataURLToBlob(canvas.toDataURL(file.type, 0.6))
        }
        image.src = readerEvent.target.result
        vm.imgPreview = image.src
      }

      reader.readAsDataURL(file)
    }
  }
}
</script>
<style>
  .preview {
    width: 200px;
  }
</style>
