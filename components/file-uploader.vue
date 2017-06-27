<template>
  <div>
    <input type="file" @change="onFileChange" />
    <img class="preview" v-if="isImg && imgPreview" :src="imgPreview" alt="">
    <v-btn primary large :disabled="disabled" v-if="isImg" v-bind:loading="loading" v-on:click.native="uploadImg">Subir imagen</v-btn>
    <v-btn primary large :disabled="disabled" v-if="!isImg" v-bind:loading="loading" v-on:click.native="uploadFile">Subir archivo</v-btn>
  </div>
</template>
<script>
import axios from '~plugins/axios'

export default {
  props: {
    isImg: {
      type: Boolean,
      default: false
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
      fd.append('offerFile', file)
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
      }).catch(function (err) {
        console.log(err)
        alert('Ocurrió un error al subir el archivo, revisa la consola')
      })
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.inMemoryImg = files[0]
      this.createImage(this.inMemoryImg)
    },
    createImage (file) {
      this.imgPreview = ''
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.imgPreview = e.target.result
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
