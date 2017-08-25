<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field disabled v-model.trim.lazy="name" name="name" label="Nombre" required></v-text-field>
            <v-text-field disabled v-model="slug" id="slug" :autofocus="!validation.slug.val" name="slug" label="Slug" required :error="!validation.slug.val"></v-text-field>
            <div class="error" v-if="!validation.slug.val">El slug generado ya esta ocupado, cambialo</div>
            <vue-editor v-model="content"></vue-editor>
            <v-text-field v-model="url" name="url" label="Url origen" required></v-text-field>
            <file-uploader is-img @on-uploaded="getImgs" @on-imageLoaded="getImageData"></file-uploader>
            <v-text-field v-model="title" name="title" label="Titulo, h1" required></v-text-field>
            <v-text-field v-model="meta_title" name="meta_title" label="Meta titulo" required></v-text-field>
            <v-text-field v-model="img_alt" name="img_alt" label="Alt (img)" required></v-text-field>
            <v-text-field v-model="img_title" name="img_title" label="Title (img)" required></v-text-field>
            <v-text-field v-model="meta_description" name="meta_description" label="Meta description" multi-line required counter max="150"></v-text-field>
            <v-select
              v-bind:items="allCategories"
              v-model="categorySelected"
              multiple
              label="Categoría"
              class="input-group--focused"
              item-value="text"
              required
              autocomplete
            ></v-select>
            <v-select
              v-bind:items="allStores"
              v-model="storeSelected"
              multiple
              label="Tiendas"
              class="input-group--focused"
              item-value="text"
              required
              autocomplete
            ></v-select>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Editar Oferta</v-btn>
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
      url: '',
      title: '',
      meta_title: '',
      meta_description: '',
      img_alt: '',
      img_title: '',
      content: '',
      img: '',
      img_data: {},
      thumbnail: '',
      categorySelected: [],
      storeSelected: [],
      validation: {
        slug: {
          val: true
        }
      }
    }
  },
  async asyncData ({ params }) {
    let { data } = await axios.get('/api/formdata/promotions/' + params.slug)
    let item = data.item
    delete data.item
    return Object.assign(data, item)
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
      this.img = resp.img
      this.thumbnail = resp.thumbnail
    },
    getImageData (data) {
      this.img_data = data
    },
    send () {
      var that = this

      if (!this.validation.slug.val) {
        return
      }

      if (!this.img || !this.thumbnail) {
        alert('Asegurate de primero subir la imagen de la oferta')
        return
      }
      if (!this.name || !this.url || !this.content) {
        alert('Todavia te faltan datos importantes antes de guardar la oferta. Recuerda subir la imagen seleccionada antes de crear la oferta')
        return
      }

      if (this.categorySelected.length === 0 || this.categorySelected.length === 0) {
        alert('Seleccionada al menos una categoria y una tienda')
      }

      this.loading = true
      this.disabled = true

      axios.post('/api/promotions/edit/' + this.slug, {
        name: this.name,
        slug: this.slug,
        url: this.url,
        title: this.title,
        meta_title: this.meta_title,
        meta_description: this.meta_description,
        img_alt: this.img_alt,
        img_title: this.img_title,
        content: this.content,
        img: this.img,
        img_data: this.img_data,
        thumbnail: this.thumbnail,
        stores: this.setArrayValues(this.storeSelected),
        categories: this.setArrayValues(this.categorySelected)
      })
      .then(function (res) {
        if (res.data.ok) {
          that.$router.push(`/ofer-admin/promociones/${that.slug}`)
        } else {
          alert('Algo salió mal, al insertar un nuevo documento en la base de datos')
        }
      })
      .catch(function (err) {
        alert('ocurrio un error al editar la oferta')
        console.log(err)
      })
      .then(function () {
        that.loading = true
        that.disabled = true
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
    this.allCategories = this.setTextPropertyForSelect(this.allCategories)
    this.allStores = this.setTextPropertyForSelect(this.allStores)
    this.categorySelected = this.setTextPropertyForSelect(this.categories)
    this.storeSelected = this.setTextPropertyForSelect(this.stores)
  },
  watch: {
    name (newName) {
      this.slug = slug(newName)
      this.title = `${newName}`
      this.meta_title = `${newName}`
      this.img_alt = `${newName}`
      this.img_title = `${newName}`
    },
    slug (newSlug) {
      if (newSlug.length > 5) {
        this.validateSlug(newSlug)
      }
    }
  },
  head () {
    return {
      title: `Editar oferta | Ofertadeo`
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
