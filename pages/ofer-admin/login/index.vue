<template>

  <v-layout>
    <v-flex xs12 sm12 md12 lg12 xl12>
      <form id="new-offer" action="/ofer-admin/login" method="post">
        <v-text-field v-model.trim="user.email" name="email" label="e-mail" required></v-text-field>
        <v-text-field v-model.trim="user.password" type="password" name="password" label="Password" required></v-text-field>
        <v-btn primary large :disabled="disabled" v-bind:loading="loading"type="submit">Login</v-btn>
      </form>
    </v-flex>
  </v-layout>

</template>

<script>
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

