<template>
  <section class="content">
    <div class="container container--fluid">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form v-on:submit.prevent="save">
            <v-text-field v-model="seo.title" name="title" label="Titulo del navegador" hint="Utiliza {name} para que se reemplace por la tienda actual y {year} para el año actual"  required></v-text-field>
            <v-text-field v-model="seo.h1" name="h1" label="Titulo h1" hint="Utiliza {name} para que se reemplace por la tienda actual  y {year} para el año actual" required></v-text-field>
            <v-text-field v-model="seo.h2" name="h2" label="Titulo h2" hint="Utiliza {name} para que se reemplace por la tienda actual  y {year} para el año actual" required></v-text-field>
            <v-text-field v-model="seo.meta_title" name="meta_title" label="Meta titulo" hint="Utiliza {name} para que se reemplace por la tienda actual  y {year} para el año actual" required></v-text-field>
            <v-text-field v-model="seo.meta_description" name="meta_description" label="Meta description" hint="Utiliza {name} para que se reemplace por la tienda actual  y {year} para el año actual" multi-line required counter max="150"></v-text-field>
            <v-text-field v-model="seo.img_alt" name="img_alt" label="Alt (img)"></v-text-field>
            <v-text-field v-model="seo.img_title" name="img_title" label="Title (img)"></v-text-field>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Guardar</v-btn>
          </form>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import OferCommon from '~/components/mixins/ofer-common.vue'
export default {
  layout: 'admin',
  mixins: [OferCommon],
  data () {
    return {
      disabled: false,
      loading: false,
      seo: {
        title: '',
        h1: '',
        h2: '',
        img_alt: '',
        img_title: '',
        meta_title: '',
        meta_description: ''
      }
    }
  },
  async asyncData ({ params, route }) {
    let { data } = await axios.get(OferCommon.props.config.default().host + '/api/seo/stores')
    if (data) {
      return { seo: data }
    }
  },
  methods: {
    async save () {
      this.disabled = true
      this.loading = true
      let { data } = await axios.post(this.config.host + '/api/seo/stores', this.seo)

      if (data && data.ok) {
        alert('Se guardaron los datos de seo para las tiendas ')
      } else {
        alert('Ocurrio un error')
      }

      this.disabled = false
      this.loading = false
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
