<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form id="new-offer" v-on:submit.prevent="send">
            <v-text-field v-model="name" name="name" label="Nombre" required></v-text-field>
            <v-text-field v-model="slug" name="slug" label="Slug" required></v-text-field>
            <v-text-field v-model="url" name="url" label="Url origen" required></v-text-field>
            <v-text-field v-model="title" name="title" label="Titulo, h1" required></v-text-field>
            <v-text-field v-model="meta_title" name="meta_title" label="Meta titulo" required></v-text-field>
            <file-uploader is-img @on-uploaded="getImgs"></file-uploader>
            <v-text-field v-model="img_alt" name="img_alt" label="Alt (img)" required></v-text-field>
            <v-text-field v-model="img_title" name="img_title" label="Title (img)" required></v-text-field>
            <v-text-field v-model="content" name="content" label="contenido" multi-line required></v-text-field>
            <v-text-field v-model="meta_description" name="meta_description" label="Meta description" multi-line required counter
                      max="150"></v-text-field>
            <v-select
              v-bind:items="categories"
              v-model="categorySelected"
              label="Categoría"
              class="input-group--focused"
              item-value="text"
              required
            ></v-select>
            <v-select
              v-bind:items="stores"
              v-model="storeSelected"
              label="Tiendas"
              class="input-group--focused"
              item-value="text"
              required
            ></v-select>
            <v-btn primary large :disabled="disabled" type="submit" v-bind:loading="loading">Crear Oferta</v-btn>
          </form>
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
      thumbnail: '',
      categorySelected: { value: 'frutas-y-verduras', text: 'Frutas y Verduras' },
      storeSelected: { value: 'walmart', text: 'Walmart' }
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/formdata/promotions')
    return data
  },
  methods: {
    setTextPropertyForSelect (data) {
      return data.map(function (elem) {
        return { value: elem._id, text: elem.name }
      })
    },
    getImgs (resp) {
      this.img = resp.img
      this.thumbnail = resp.thumbnail
    },
    send () {
      var that = this
      if (!this.img || !this.thumbnail) {
        alert('Asegurate de primero subir la imagen de la oferta')
        return
      }
      if (!this.name || !this.url || !this.content || !this.stores || !this.categories) {
        alert('Todavia te faltan datos importantes antes de guardar la oferta. Recuerda subir la imagen seleccinada antes de crear la oferta')
        return
      }

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
        thumbnail: this.thumbnail,
        stores: [this.storeSelected.value],
        categories: [this.categorySelected.value]
      }).then(function (res) {
        console.log(res)
        that.$router.push(`/promociones/${that.slug}`)
      }).catch(function (err) {
        console.log(err)
        alert('ocurrio un error al crear la oferta')
      })
    }
  },
  created () {
    this.categories = this.setTextPropertyForSelect(this.categories)
    this.stores = this.setTextPropertyForSelect(this.stores)
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
