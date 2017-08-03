<template>
  <v-footer>
      <div>
        <ul>
          <li><a href="/nosotros">Nosotros</a></li>
          <li><a href="/terminos">Términos</a></li>
          <li><a href="/privacidad">Aviso de privacidad</a></li>
        </ul>
      </div>
      <div>
        <div>Siguenos:</div>
        <ul id="follow">
          <li>
            <v-btn tag="a" href="https://www.facebook.com/ofertadeo/" target="_blank">
              <img src="/icons/facebook.svg" alt="Facebook Ofertadeo" title="Facebook Ofertadeo" width="30" height="30">
            </v-btn>
          </li>
          <li>
            <v-btn tag="a" href="https://twitter.com/ofertadeo" target="_blank">
              <img src="/icons/twitter.svg" alt="twitter Ofertadeo" title="Twitter Ofertadeo" width="30" height="30">
            </v-btn>
          </li>
          <li>
            <v-btn tag="a" href="https://plus.google.com/110009950298317863923" target="_blank">
              <img src="/icons/google-plus.svg" alt="Google plus Ofertadeo" title="Google+ Ofertadeo" width="30" height="30">
            </v-btn>
          </li>
          <li>
            <v-btn tag="a" href="https://www.youtube.com/channel/UCG8yl6wupq3kHem9SE4qa0g" target="_blank">
              <img src="/icons/youtube.svg" alt="Google plus Ofertadeo" title="Google+ Ofertadeo" width="30" height="30">
            </v-btn>
          </li>
          <li>
            <v-btn tag="a" href="https://es.pinterest.com/ofertadeo/" target="_blank">
              <img src="/icons/pinterest.svg" alt="Pinteres Ofertadeo" title="Pinterest Ofertadeo" width="30" height="30">
            </v-btn>
          </li>
        </ul>
        <div>Ofertadeo {{new Date().getFullYear()}}</div>
      </div>
  </v-footer>
</template>
<style scoped lang="scss">
$white: #fff;
.footer {
  display: flex;
  justify-content: space-between;
  height: auto;
  line-height: inherit;
  padding: 0.5rem;
  color: $white;
  a,h5 {
    color: $white;
  }

  #follow {
    list-style:none;
    display: flex;
    a.btn {
      width:30px;
      min-width:30px;
      min-height:30px;
      padding:0;
      background-color: #fff;
    }
    img {
      width:30px;
    }
  }
}
</style>
