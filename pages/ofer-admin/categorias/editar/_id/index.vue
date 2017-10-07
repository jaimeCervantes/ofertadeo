<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field disabled v-model.trim.lazy="catetory.name" name="name" label="Nombre" required></v-text-field>
            <v-text-field disabled v-model="catetory.slug" id="slug" :autofocus="!validation.slug.val" name="slug" label="Slug" required :error="!validation.slug.val"></v-text-field>
            <div class="error" v-if="!validation.slug.val">El slug generado ya esta ocupado, cambialo</div>
            <vue-editor v-model="catetory.content"></vue-editor>
            <v-text-field v-model="catetory.url_site" name="url" label="Url de la categoría" required></v-text-field>
            <file-uploader is-img @on-uploaded="getImgs" @on-imageLoaded="getImageData"></file-uploader>
            <v-text-field v-model="catetory.title" name="title" label="Titulo, h1" required></v-text-field>
            <v-text-field v-model="catetory.meta_title" name="meta_title" label="Meta titulo" required></v-text-field>
            <v-text-field v-model="catetory.img_alt" name="img_alt" label="Alt (img)" required></v-text-field>
            <v-text-field v-model="catetory.img_title" name="img_title" label="Title (img)" required></v-text-field>
            <v-text-field v-model="catetory.meta_description" name="meta_description" label="Meta description" multi-line required counter max="150"></v-text-field>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Editar Categoría</v-btn>
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
      catetory: {
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
  async asyncData ({ params }) {
    let { data } = await axios.get('/api/formdata/catetories/' + params.id)
    data.catetory = data.item
    delete data.item
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
    getImgs (resp) {
      this.catetory.img = resp.img
      this.catetory.thumbnail = resp.thumbnail
    },
    getImageData (data) {
      this.catetory.img_data = data
    },
    send () {
      var that = this

      if (!this.validation.slug.val) {
        return
      }

      if (!this.catetory.img || !this.catetory.thumbnail) {
        alert('Asegurate de primero subir la imagen de la categoría')
        return
      }
      if (!this.catetory.name || !this.catetory.url_site || !this.catetory.content) {
        alert('Todavia te faltan datos importantes antes de guardar la categoría.')
        return
      }

      this.loading = true
      this.disabled = true

      axios.post('/api/catetories/edit/' + this.catetory._id, this.catetory)
      .then(function (res) {
        if (res.data.ok) {
          that.$router.push(`/ofer-admin/categorias/${that.catetory.slug}`)
        } else {
          alert('Algo salió mal, al guardar Categoría en la base de datos, ')
        }
      })
      .catch(function (err) {
        alert('ocurrio un error al guardar la Categoría')
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
      let { data } = await axios.get('/api/catetories/' + currSlug)
      if (data && data.info) {
        this.validation.slug.val = false
      }
    }
  },
  head () {
    return {
      title: `Editar Categoría | Ofertadeo`,
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
