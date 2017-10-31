<template>
  <ofer-content>
    <template slot="content">
      <v-row>
        <v-col class="mt-3 mb-3" xs12 sm12 md12 lg12 xl12>
          <form id="new-offer" action="/ofer-admin/login" method="post">
            <v-text-field v-model.trim="user.email" name="email" label="e-mail" required></v-text-field>
            <v-text-field v-model.trim="user.password" type="password" name="password" label="Password" required></v-text-field>
            <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Login</v-btn>
          </form>
        </v-col>
      </v-row>
    </template>
  </ofer-content>
</template>

<script>
import OferContent from '~/components/ofer-content.vue'

export default {
  layout: 'admin',
  data () {
    return {
      loading: false,
      disabled: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    OferContent
  },
  head () {
    return {
      title: `Login | Ofertadeo`,
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>

