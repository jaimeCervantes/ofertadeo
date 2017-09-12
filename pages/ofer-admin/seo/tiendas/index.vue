<template>
  <section class="content">
    <div class="container container--fluid">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form v-on:submit.prevent="save">
            <v-text-field v-model="title" name="title" label="Titulo del navegador" hint="Utiliza {name} para que se reemplace por la tienda actual y {year} para el año actual"  required></v-text-field>
            <v-text-field v-model="seo.h1" name="h1" label="Titulo h1" hint="Utiliza {name} para que se reemplace por la tienda actual  y {year} para el año actual" required></v-text-field>
            <v-text-field v-model="seo.h2" name="h2" label="Titulo h2" hint="Utiliza {name} para que se reemplace por la tienda actual  y {year} para el año actual" required></v-text-field>
            <v-text-field v-model="seo.meta_title" name="meta_title" label="Meta titulo" hint="Utiliza {name} para que se reemplace por la tienda actual  y {year} para el año actual" required></v-text-field>
            <v-text-field v-model="seo.meta_description" name="meta_description" label="Meta description" hint="Utiliza {name} para que se reemplace por la tienda actual  y {year} para el año actual" multi-line required counter max="150"></v-text-field>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Guardar</v-btn>
          </form>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import axios from '~plugins/axios'
export default {
  layout: 'admin',
  data () {
    return {
      disabled: false,
      loading: false,
      seo: {
        title: '',
        h1: '',
        h2: '',
        meta_title: '',
        meta_description: ''
      }
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get('/api/seo/stores')
    if (data) {
      return { seo: data }
    }
  },
  methods: {
    async save () {
      this.disabled = true
      this.loading = true
      let { data } = await axios.post('/api/seo/stores', this.seo)

      if (data && data.ok) {
        alert('Se guardaron los datos de seo para las tiendas ')
      } else {
        alert('Ocurrio un error')
      }

      this.disabled = false
      this.loading = false
    }
  },
  computed: {
    title: {
      get () {
        return this.seo.title
      },
      set (newValue) {
        this.seo.title = newValue
        this.seo.meta_title = newValue
        this.seo.h1 = newValue
        this.seo.h2 = newValue
      }
    },
    description: {
      get () {
        return this.seo.description
      },
      set (newValue) {
        this.seo.description = newValue
        this.seo.meta_description = newValue
      }
    }
  },
  head () {
    return {
      title: `SEO Tienda | Ofertadeo`,
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>
