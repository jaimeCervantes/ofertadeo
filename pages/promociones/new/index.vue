<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <div class="promotion">
            <v-text-field v-model="name" name="name" label="Nombre" id="name"></v-text-field>
            <v-text-field v-model="slug" name="slug" label="Slug" id="slug"></v-text-field>
            <v-text-field v-model="url" name="url" label="Url origen" id="url"></v-text-field>
            <v-text-field v-model="title" name="title" label="Titulo, h1" id="title"></v-text-field>
            <v-text-field v-model="meta_title" name="meta_title" label="Meta titulo" id="meta_title"></v-text-field>
            <file-uploader is-img @on-uploaded="getImg"></file-uploader>
            <v-text-field v-model="img_alt" name="img_alt" label="Alt (img)" id="img_alt" ></v-text-field>
            <v-text-field v-model="img_title" name="img_title" label="Title (img)" id="img_alt" ></v-text-field>
            <v-text-field v-model="content" name="content" label="contenido" id="content" multi-line ></v-text-field>
            <v-text-field v-model="meta_description" name="meta_description" label="Meta description" id="content" multi-line ></v-text-field>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading" v-on:click.native="send">Crear Oferta</v-btn>
          </div>
        </v-col>
      </v-row>
    </template>
  </ofer-content>
</template>

<script>
import axios from '~plugins/axios'
import OferContent from '~components/ofer-content.vue'
import OferCommon from '~components/mixins/ofer-common.vue'
import OferNotExists from '~components/ofer-not-exists.vue'
import FileUploader from '~components/file-uploader.vue'

export default {
  mixins: [OferCommon],
  data () {
    return {
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
      thumbnail: ''
    }
  },
  methods: {
    getImg (resp) {
      console.log(resp)
      this.img = resp.img
      this.thumbnail = resp.thumbnail
    },
    send () {
      var that = this
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
        thumbnail: this.thumbnail
      }).then(function (res) {
        console.log(res)
        that.$router.push(`/promociones/${that.slug}`)
      }).catch(function (err) {
        console.log(err)
        alert('ocurrio un error al crear la oferta')
      })
    }
  },
  computed: {
  },
  watch: {
    name (newName) {
      this.slug = newName.split(/\s+/).join('-').toLowerCase()
      this.title = `${newName} | Ofertadeo`
      this.meta_title = `${newName} | Ofertadeo`
      this.img_alt = `${newName}`
      this.img_title = `${newName}`
    },
    content (newContent) {
      this.meta_description = `${this.getTextFromHtml(newContent).slice(0, 150)}...`
    }
  },
  head () {
    return {
      title: `Nueva oferta | Ofertadeo`
    }
  },
  components: {
    OferContent,
    OferCommon,
    OferNotExists,
    FileUploader
  }
}
</script>
