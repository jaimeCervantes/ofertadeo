<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field v-model.trim.lazy="name" name="name" label="Nombre" required></v-text-field>
            <v-text-field v-model.trim="item.slug" id="slug" :autofocus="!validation.slug.val" name="slug" label="Slug" required :error="!validation.slug.val"></v-text-field>
            <div class="error" v-if="!validation.slug.val">El slug generado ya esta ocupado, cambialo</div>

            <vue-editor v-model="item.content"></vue-editor>
            <v-text-field v-model="item.url" name="url" label="Url de la Tienda" required></v-text-field>
            <file-uploader is-img @on-uploaded="getImgs" @on-imageLoaded="getImageData"></file-uploader>
            <v-text-field v-model="item.title" name="title" label="Titulo, h1" required></v-text-field>
            <v-text-field v-model="item.meta_title" name="meta_title" label="Meta titulo" required></v-text-field>
            <v-text-field v-model="item.img_alt" name="img_alt" label="Alt (img)" required></v-text-field>
            <v-text-field v-model="item.img_title" name="img_title" label="Title (img)" required></v-text-field>
            <v-text-field v-model="item.meta_description" name="meta_description" label="Meta description" multi-line required counter max="150"></v-text-field>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Crear Tienda</v-btn>
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
      item: {
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
        alert('Asegurate de primero subir la imagen de la Tienda')
        return
      }
      if (!this.name || !this.url || !this.content) {
        alert('Todavia te faltan datos importantes antes de guardar la Tienda. Recuerda subir la imagen seleccionada antes de crear la oferta')
        return
      }

      this.loading = true
      this.disabled = true

      axios.post('/api/stores/new', {
        name: this.name,
        slug: this.slug,
        url_site: this.url,
        title: this.title,
        meta_title: this.meta_title,
        meta_description: this.meta_description,
        img_alt: this.img_alt,
        img_title: this.img_title,
        content: this.content,
        img: this.img,
        img_data: this.img_data,
        thumbnail: this.thumbnail
      })
      .then(function (res) {
        if (res.data.ok) {
          that.$router.push(`/ofer-admin/tiendas/${that.slug}`)
        } else {
          alert('Algo salió mal, alinsertar un nueva tienda en la base de datos, ')
        }
      })
      .catch(function (err) {
        alert('ocurrio un error al crear la Tienda')
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
      let { data } = await axios.get('/api/stores/' + currSlug)
      if (data && data.info) {
        this.validation.slug.val = false
      }
    }
  },
  watch: {
    slug (newSlug) {
      if (newSlug.length > 5) {
        this.validateSlug(newSlug)
      }
    }
  },
  computed: {
    name: {
      get () {
        return this.item.name
      },
      set (newValue) {
        this.item.slug = slug(newValue)
        this.item.title = `${newValue} – Ofertas, promociones y descuentos`
        this.item.meta_title = `Descuentos, ofertas y promociones en ${newValue}`
        this.item.img_alt = `${newValue}`
        this.item.img_title = `${newValue}`
        this.item.meta_description = `Descubre las mejores ofertas y promociones de ${newValue}. Descuentos, promociones y ofertas en ${newValue} 2017. ❤ ¡Ahorra ya!`
      }
    }
  },
  head () {
    return {
      title: `Nueva Tienda | Ofertadeo`
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
