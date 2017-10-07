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
            <v-text-field v-model="category.url_site" name="url" label="Url de la Categoría" required></v-text-field>
            <file-uploader is-img @on-uploaded="getImgs" @on-imageLoaded="getImageData"></file-uploader>
            <v-text-field v-model="category.title" name="title" label="Titulo, h1" required></v-text-field>
            <v-text-field v-model="category.meta_title" name="meta_title" label="Meta titulo" required></v-text-field>
            <v-text-field v-model="category.img_alt" name="img_alt" label="Alt (img)" required></v-text-field>
            <v-text-field v-model="category.img_title" name="img_title" label="Title (img)" required></v-text-field>
            <v-text-field v-model="category.meta_description" name="meta_description" label="Meta description" multi-line required counter max="150"></v-text-field>
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
      slug: '',
      category: {
        name: '',
        slug: '',
        url_site: '',
        title: '',
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
          that.$router.push(`/ofer-admin/categorias/${that.category.slug}`)
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
      this.category.title = `${newName} – Ofertas, promociones y descuentos`
      this.category.meta_title = `Descuentos, ofertas y promociones en ${newName}`
      this.category.img_alt = `${newName}`
      this.category.img_title = `${newName}`
      this.category.meta_description = `Descubre las mejores ofertas y promociones de ${newName}. Descuentos, promociones y ofertas en ${newName} ${this.year}. ❤ ¡Ahorra ya!`
    },
    slug (newSlug) {
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
