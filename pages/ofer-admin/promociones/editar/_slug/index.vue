<template>
  <div>
      <v-layout>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <h1>Editar Oferta</h1>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field disabled v-model.trim.lazy="promotion.name" name="name" label="Nombre" required></v-text-field>
            <v-text-field disabled v-model="promotion.slug" id="slug" :autofocus="!validation.slug.val" name="slug" label="Slug" required :error="!validation.slug.val"></v-text-field>
            <div class="error" v-if="!validation.slug.val">El slug generado ya esta ocupado, cambialo</div>
            <vue-editor v-model="promotion.content"></vue-editor>
            <v-text-field v-model="promotion.url" name="url" label="Url origen" required></v-text-field>
            <div>{{promotion.img}}</div>
            <div>{{promotion.img_data}}</div>
            <file-uploader is-img @on-uploaded="getImgs" @on-imageLoaded="getImageData"></file-uploader>
            <v-text-field v-model="promotion.title" name="title" label="Titulo, h1" required></v-text-field>
            <v-text-field v-model="promotion.meta_title" name="meta_title" label="Meta titulo" required></v-text-field>
            <v-text-field v-model="promotion.img_alt" name="img_alt" label="Alt (img)" required></v-text-field>
            <v-text-field v-model="promotion.img_title" name="img_title" label="Title (img)" required></v-text-field>
            <v-text-field v-model="promotion.meta_description" name="meta_description" label="Meta description" multi-line required
            counter="150"
            :rules="[(v) => v.length <= config.seo.description.charsLimit || '']"
            ></v-text-field>
            <v-select
              v-bind:items="categories"
              v-model="promotion.categories"
              multiple
              label="Categoría"
              class="input-group--focused"
              item-text="name"
              return-object
              required
              autocomplete
            ></v-select>
            <v-select
              v-bind:items="stores"
              v-model="promotion.stores"
              multiple
              label="Tiendas"
              class="input-group--focused"
              item-text="name"
              return-object
              required
              autocomplete
            ></v-select>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Editar Oferta</v-btn>
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
        thumbnail: '',
        stores: '',
        categories: ''
      },
      validation: {
        slug: {
          val: true
        }
      }
    }
  },
  async asyncData ({ params }) {
    let { data } = await axios.get(OferCommon.props.config.default().host + '/api/formdata/promotions/' + params.slug)
    data.promotion = data.item
    delete data.promotion._id
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
      if (!this.promotion.name || !this.promotion.url || !this.promotion.content) {
        alert('Todavia te faltan datos importantes antes de guardar la oferta.')
        return
      }

      if (this.promotion.categories.length === 0 || this.promotion.stores.length === 0) {
        alert('Seleccionada al menos una categoria y una tienda')
      }

      this.loading = true
      this.disabled = true
      axios.post(this.config.host + '/api/promotions/edit/' + this.promotion.slug, this.promotion)
        .then(function (res) {
          if (res.data.ok) {
            that.$router.push(`/promociones/${that.promotion.slug}`)
          } else {
            alert('Algo salió mal, al insertar un nuevo documento en la base de datos')
          }
        })
        .catch(function (err) {
          alert('ocurrio un error al editar la oferta')
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
      let { data } = await axios.get(this.config.host + '/api/promotions/' + currSlug)
      if (this.exists(data)) {
        this.validation.slug.val = false
      }
    }
  },
  head () {
    return {
      title: `Editar oferta | Ofertadeo`,
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
