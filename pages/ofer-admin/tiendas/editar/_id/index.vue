<template>
  <div>
      <v-layout>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <h1>Editar tienda</h1>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field disabled v-model.trim.lazy="store.name" name="name" label="Nombre" required></v-text-field>
            <v-text-field disabled v-model="store.slug" id="slug" :autofocus="!validation.slug.val" name="slug" label="Slug" required :error="!validation.slug.val"></v-text-field>
            <vue-editor v-model="store.content"></vue-editor>
            <v-text-field v-model="store.url_site" name="url" label="Url de la Tienda" required></v-text-field>
            <file-uploader is-img @on-uploaded="getImgs" @on-imageLoaded="getImageData"></file-uploader>
            <v-text-field v-model="store.title" name="Title" label="Titulo del navegador"></v-text-field>
            <v-text-field v-model="store.h1" name="h1" label="Titulo, H1"></v-text-field>
            <v-text-field v-model="store.h2" name="h2" label="Titulo, H2"></v-text-field>
            <v-text-field v-model="store.meta_title" name="meta_title" label="Meta titulo"></v-text-field>
            <v-text-field v-model="store.meta_description" name="meta_description" label="Meta description" multi-line counter max="150"></v-text-field>
            <v-text-field v-model="store.img_alt" name="img_alt" label="Alt (img)"></v-text-field>
            <v-text-field v-model="store.img_title" name="img_title" label="Title (img)"></v-text-field>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Editar Tienda</v-btn>
          </form>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import slug from 'slug'
import OferCommon from '~/components/mixins/ofer-common.vue'
import OferNotExists from '~/components/ofer-not-exists.vue'
import FileUploader from '~/components/file-uploader.vue'
import VueEditor from '~/components/editor.vue'

slug.defaults.modes.pretty = {
  replacement: '-',
  symbols: false,
  remove: /[.]/g,
  lower: true,
  charmap: Object.assign({}, slug.charmap, {'€': '', '₢': '', '₣': '', '£': '', '₤': '', '₥': '', '₦': '', '₧': '', '₨': '', '₩': '', '₪': '', '₫': '', '₭': '', '₮': '', '₯': '', '₰': '', '₱': '', '₲': '', '₳': '', '₴': '', '₵': '', '¢': '', '¥': '', '元': '', '円': '', '﷼': '', '₠': '', '¤': '', '฿': '', '$': '', '₹': ''},
    {'©': '', 'œ': '', 'Œ': '', '∑': '', '®': '', '†': '', '“': '"', '”': '"', '‘': "'", '’': "'", '∂': '', 'ƒ': '', '™': 'tm', '℠': 'sm', '…': '', '˚': '', 'º': '', 'ª': '', '•': '', '∆': '', '∞': '', '♥': '', '&': '', '|': '', '<': '', '>': '', '~/': ''}
  ),
  multicharmap: Object.assign({}, slug.multicharmap, {'<3': '', '&&': '', '||': '', 'w/': ''})
}

export default {
  layout: 'admin',
  mixins: [OferCommon],
  data () {
    return {
      loading: false,
      disabled: false,
      store: {
        name: '',
        slug: '',
        url_site: '',
        title: '',
        h1: '',
        h2: '',
        meta_title: '',
        meta_description: '',
        img_alt: '',
        img_title: '',
        content: '',
        img: '',
        img_data: {},
        thumbnail: ''
      },
      validation: {
        slug: {
          val: true
        }
      }
    }
  },
  async asyncData ({ params }) {
    let { data } = await axios.get(OferCommon.props.config.default().host + '/api/formdata/stores/' + params.id)
    data.store = data.item
    delete data.item
    return data
  },
  components: {
    OferCommon,
    OferNotExists,
    FileUploader,
    VueEditor
  },
  methods: {
    getImgs (resp) {
      this.store.img = resp.img
      this.store.thumbnail = resp.thumbnail
    },
    getImageData (data) {
      this.store.img_data = data
    },
    send () {
      var that = this

      if (!this.validation.slug.val) {
        return
      }

      if (!this.store.img || !this.store.thumbnail) {
        alert('Asegurate de primero subir la imagen de la Tienda')
        return
      }
      if (!this.store.name || !this.store.url_site || !this.store.content) {
        alert('Todavia te faltan datos importantes antes de guardar la Tienda.')
        return
      }

      this.loading = true
      this.disabled = true

      axios.post(this.config.host + '/api/stores/edit/' + this.store._id, this.store)
        .then(function (res) {
          if (res.data.ok) {
            that.$router.push(`/tiendas/${that.store.slug}`)
          } else {
            alert('Algo salió mal, al guardar tienda en la base de datos, ')
          }
        })
        .catch(function (err) {
          alert('ocurrio un error al guardar la Tienda')
          console.log(err)
        })
        .then(function () {
          that.loading = false
          that.disabled = false
        })
    }
  },
  head () {
    return {
      title: `Editar Tienda | Ofertadeo`,
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>
<style lang="stylus">
  #slug {
    margin-bottom: 0;
    .input-group__details {
      min-height: 0;
    }
  }
  
  .error {
    color: #fff;
    padding: 5px;
    margin-bottom: 22px;
  }
</style>
