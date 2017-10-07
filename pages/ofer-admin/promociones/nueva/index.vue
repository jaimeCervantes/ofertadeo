<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <h1>Crear nueva oferta</h1>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field v-model.trim.lazy="name" name="name" label="Nombre" required></v-text-field>
            <v-text-field v-model="promotion.slug" id="slug" :autofocus="!validation.slug.val" name="slug" label="Slug" required :error="!validation.slug.val"></v-text-field>
            <div class="error" v-if="!validation.slug.val">El slug generado ya esta ocupado, cambialo</div>
            <h3>Contenido</h3>
            <vue-editor v-model="content"></vue-editor>
            <v-text-field v-model="promotion.url" name="url" label="Url origen" required></v-text-field>
            <file-uploader is-img @on-uploaded="getImgs" @on-imageLoaded="getImageData"></file-uploader>
            <v-text-field v-model="promotion.title" name="title" label="Titulo, h1" required></v-text-field>
            <v-text-field v-model="promotion.meta_title" name="meta_title" label="Meta titulo" required></v-text-field>
            <v-text-field v-model="promotion.img_alt" name="img_alt" label="Alt (img)" required></v-text-field>
            <v-text-field v-model="promotion.img_title" name="img_title" label="Title (img)" required></v-text-field>
            <v-text-field v-model="promotion.meta_description" name="meta_description" label="Meta description" multi-line required counter max="150"></v-text-field>
            <v-select
              v-bind:items="categories"
              v-model="categorySelected"
              multiple
              label="Categoría"
              class="input-group--focused"
              item-value="text"
              required
              autocomplete
            ></v-select>
            <v-select
              v-bind:items="stores"
              v-model="storeSelected"
              multiple
              label="Tiendas"
              class="input-group--focused"
              item-value="text"
              required
              autocomplete
            ></v-select>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Crear Oferta</v-btn>
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
      content: '',
      promotion: {
        name: '',
        slug: '',
        url: '',
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
      categorySelected: [],
      storeSelected: [],
      validation: {
        slug: {
          val: true
        }
      }
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/formdata/promotions')
    return data
  },
  components: {
    OferContent,
    OferCommon,
    OferNotExists,
    FileUploader,
    VueEditor
  },
  methods: {
    setTextPropertyForSelect (data) {
      return data.map(function (elem) {
        return { value: elem._id, text: elem.name }
      })
    },
    setArrayValues (data) {
      return data.map(function (elem) {
        return { _id: elem.value, name: elem.text }
      })
    },
    getImgs (resp) {
      this.promotion.img = resp.img
      this.promotion.thumbnail = resp.thumbnail
    },
    getImageData (data) {
      this.promotion.img_data = data
    },
    send () {
      var that = this

      if (!this.validation.slug.val) {
        return
      }

      if (!this.promotion.img || !this.promotion.thumbnail) {
        alert('Asegurate de primero subir la imagen de la oferta')
        return
      }
      if (!this.promotion.name || !this.promotion.url || !this.promotion.content || this.storeSelected.length === 0 || this.categorySelected.length === 0) {
        alert('Todavia te faltan datos importantes antes de guardar la oferta.')
        return
      }
      this.loading = true
      this.disabled = true
      this.promotion.stores = this.setArrayValues(this.storeSelected)
      this.promotion.categories = this.setArrayValues(this.categorySelected)
      axios.post('/api/promotions/new', this.promotion)
      .then(function (res) {
        if (res.data.ok) {
          that.$router.push(`/promociones/${that.promotion.slug}`)
        } else {
          alert('Algo salió mal, al insertar un nuevo documento en la base de datos')
        }
      })
      .catch(function (err) {
        alert('ocurrio un error al crear la oferta')
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
      let { data } = await axios.get('/api/promotions/' + currSlug)
      if (this.exists(data)) {
        this.validation.slug.val = false
      }
    }
  },
  created () {
    this.categories = this.setTextPropertyForSelect(this.categories)
    this.stores = this.setTextPropertyForSelect(this.stores)
  },
  watch: {
    name (newName) {
      this.promotion.name = newName
      this.promotion.slug = slug(newName)
      this.promotion.title = `${newName}`
      this.promotion.meta_title = `${newName}`
      this.promotion.img_alt = `${newName}`
      this.promotion.img_title = `${newName}`
    },
    slug (newSlug) {
      if (newSlug.length > 5) {
        this.validateSlug(newSlug)
      }
    },
    content (newContent) {
      this.promotion.content = newContent
      this.promotion.meta_description = this.sliceTextFromHtml(newContent, this.config.seo.description.charsLimit)
    }
  },
  head () {
    return {
      title: `Nueva oferta | Ofertadeo`,
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
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

  h3{
    padding-bottom: 0;
    margin-bottom: 0;
    line-height:inherit;
  }

</style>
