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
      if (!this.name || !this.url || !this.content || !this.stores || !this.categories) {
        alert('Todavia te faltan datos importantes antes de guardar la oferta. Recuerda subir la imagen seleccionada antes de crear la oferta')
        return
      }

      this.loading = true
      this.disabled = true

      axios.post('/api/promotions/new', {
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
        alert('ocurrio un error al crear la oferta')
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
    this.categories = this.setTextPropertyForSelect(this.categories)
    this.stores = this.setTextPropertyForSelect(this.stores)
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
    },
    content (newContent) {
      this.meta_description = this.sliceTextFromHtml(newContent, this.config.seo.description.charsLimit)
    }
  },
  head () {
    return {
      title: `Nueva oferta | Ofertadeo`
    }
  }
}
</script>
