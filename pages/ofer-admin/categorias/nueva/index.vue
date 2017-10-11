<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field v-model.trim.lazy="name" name="name" label="Nombre" required></v-text-field>
            <v-text-field v-model="category.slug" id="slug" :autofocus="!validation.slug.val" name="slug" label="Slug" required :error="!validation.slug.val"></v-text-field>
            <div class="error" v-if="!validation.slug.val">El slug generado ya esta ocupado, cambialo</div>
            <vue-editor v-model="category.content"></vue-editor>
            <v-text-field v-model="category.url_site" name="url" label="Url de la Categoría"></v-text-field>
            <file-uploader is-img @on-uploaded="getImgs" @on-imageLoaded="getImageData"></file-uploader>
            <v-text-field v-model="category.title" name="Title" label="Titulo del navegador"></v-text-field>
            <v-text-field v-model="category.h1" name="h1" label="Titulo, H1"></v-text-field>
            <v-text-field v-model="category.h2" name="h2" label="Titulo, H2"></v-text-field>
            <v-text-field v-model="category.meta_title" name="meta_title" label="Meta titulo"></v-text-field>
            <v-text-field v-model="category.meta_description" name="meta_description" label="Meta description" multi-line counter max="150"></v-text-field>
            <v-text-field v-model="category.img_alt" name="img_alt" label="Alt (img)"></v-text-field>
            <v-text-field v-model="category.img_title" name="img_title" label="Title (img)"></v-text-field>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Nueva Categoría</v-btn>
          </form>
        </v-col>
      </v-row>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import slug from 'slug'
import OferContent from '~components/ofer-content.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferNotExists from '~components/ofer-not-exists.vue'
import FileUploader from '~components/file-uploader.vue'
import VueEditor from '~components/editor.vue'

slug.defaults.modes.pretty = {
  replacement: '-',
  symbols: false,
  remove: /[.]/g,
  lower: true,
  charmap: Object.assign({}, slug.charmap, {'€': '', '₢': '', '₣': '', '£': '', '₤': '', '₥': '', '₦': '', '₧': '', '₨': '', '₩': '', '₪': '', '₫': '', '₭': '', '₮': '', '₯': '', '₰': '', '₱': '', '₲': '', '₳': '', '₴': '', '₵': '', '¢': '', '¥': '', '元': '', '円': '', '﷼': '', '₠': '', '¤': '', '฿': '', '$': '', '₹': ''},
    {'©': '', 'œ': '', 'Œ': '', '∑': '', '®': '', '†': '', '“': '"', '”': '"', '‘': "'", '’': "'", '∂': '', 'ƒ': '', '™': 'tm', '℠': 'sm', '…': '', '˚': '', 'º': '', 'ª': '', '•': '', '∆': '', '∞': '', '♥': '', '&': '', '|': '', '<': '', '>': '', '~': ''}
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
      category: {
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
      this.category.img = resp.img
      this.category.thumbnail = resp.thumbnail
    },
    getImageData (data) {
      this.category.img_data = data
    },
    send () {
      var that = this

      if (!this.validation.slug.val) {
        return
      }

      if (!this.category.img || !this.category.thumbnail) {
        alert('Asegurate de primero subir la imagen de la Categoría')
        return
      }
      if (!this.category.name || !this.category.url_site || !this.category.content) {
        alert('Todavia te faltan datos importantes antes de guardar la Categoría.')
        return
      }

      this.loading = true
      this.disabled = true

      axios.post('/api/categories/new', this.category)
      .then(function (res) {
        if (res.data.ok) {
          that.$router.push(`/categorias/${that.category.slug}`)
        } else {
          alert('Algo salió mal, al insertar un nueva categoría en la base de datos, ')
        }
      })
      .catch(function (err) {
        alert('ocurrio un error al crear la Categoría')
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
      let { data } = await axios.get('/api/categories/' + currSlug)
      if (data && data.info) {
        this.validation.slug.val = false
      }
    }
  },
  watch: {
    name (newName) {
      this.category.name = newName
      this.category.slug = slug(newName)
      this.category.title = `Ofertas, descuentos y promociones en ${newName} 2017 | Ofertadeo`
      this.category.h1 = `${newName} - Ofertas, promociones y descuentos`
      this.category.h2 = `Lista de ofertas y promociones en ${newName}`
      this.category.meta_title = `Ofertas, descuentos y promociones en ${newName} 2017 | Ofertadeo`
      this.category.img_alt = `Ofertas ${newName}`
      this.category.img_title = `Ofertas ${newName}`
      this.category.meta_description = `Encuentra las mejores ofertas ${newName} en línea y todos los descuentos, ofertas y promociones en ${newName} 2017. ✓ ¡Ahorra con Ofertadeo!`
    },
    'category.slug' (newSlug) {
      if (newSlug.length > 5) {
        this.validateSlug(newSlug)
      }
    }
  },
  head () {
    return {
      title: `Nueva Categoría | Ofertadeo`,
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
