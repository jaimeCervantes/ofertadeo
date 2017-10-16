<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field v-model.trim.lazy="name" name="name" label="Nombre" required></v-text-field>
            <v-text-field v-model="store.slug" id="slug" :autofocus="!validation.slug.val" name="slug" label="Slug" required :error="!validation.slug.val"></v-text-field>
            <div class="error" v-if="!validation.slug.val">El slug generado ya esta ocupado, cambialo</div>
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
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Crear Tienda</v-btn>
          </form>
        </v-col>
      </v-row>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~/plugins/axios'
import slug from 'slug'
import OferContent from '~/components/ofer-content.vue'
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
      name: '',
      slug: '',
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
  components: {
    OferContent,
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

      axios.post('/api/stores/new', this.store)
        .then(function (res) {
          if (res.data.ok) {
            that.$router.push(`/tiendas/${that.store.slug}`)
          } else {
            console.log(res)
            alert('Algo salió mal, al insertar un nueva tienda en la base de datos, ')
          }
        })
        .catch(function (err) {
          alert('ocurrio un error al crear la Tienda')
          console.log(err)
        })
        .then(function () {
          that.loading = false
          that.disabled = false
        })
    },
    async validateSlug (currSlug) {
      if (currSlug === '') {
        return
      }
      this.validation.slug.val = true
      let { data } = await axios.get('/api/stores/' + currSlug)
      if (data && data.info) {
        this.validation.slug.val = false
      }
    }
  },
  watch: {
    name (newName) {
      this.store.name = newName
      this.store.slug = slug(newName)
      this.store.title = `Ofertas, descuentos y promociones en ${newName} 2017 | Ofertadeo`
      this.store.h1 = `${newName} - Ofertas, promociones y descuentos`
      this.store.h2 = `Lista de ofertas y promociones en ${newName}`
      this.store.meta_title = `Ofertas, descuentos y promociones en ${newName} 2017 | Ofertadeo`
      this.store.img_alt = `Ofertas ${newName}`
      this.store.img_title = `Ofertas ${newName}`
      this.store.meta_description = `Encuentra las mejores ofertas ${newName} en línea y todos los descuentos, ofertas y promociones en ${newName} 2017. ✓ ¡Ahorra con Ofertadeo!`
    },
    'store.slug' (newSlug) {
      if (newSlug.length > 5) {
        this.validateSlug(newSlug)
      }
    }
  },
  head () {
    return {
      title: `Nueva Tienda | Ofertadeo`,
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
