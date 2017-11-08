<template>
  <v-footer app color="primary" dark>
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
          <v-btn tag="a" href="https://www.facebook.com/ofertadeo/" target="_blank" rel="nofollow noopener">
            <img src="https://www.ofertadeo.com/icons/facebook.svg" alt="Facebook Ofertadeo" title="Facebook Ofertadeo" width="30" height="30">
          </v-btn>
        </li>
        <li>
          <v-btn tag="a" href="https://twitter.com/ofertadeo" target="_blank" rel="nofollow noopener">
            <img src="https://www.ofertadeo.com/icons/twitter.svg" alt="twitter Ofertadeo" title="Twitter Ofertadeo" width="30" height="30">
          </v-btn>
        </li>
        <li>
          <v-btn tag="a" href="https://plus.google.com/110009950298317863923" target="_blank" rel="nofollow noopener">
            <img src="https://www.ofertadeo.com/icons/google-plus.svg" alt="Google plus Ofertadeo" title="Google+ Ofertadeo" width="30" height="30">
          </v-btn>
        </li>
        <li>
          <v-btn tag="a" href="https://www.youtube.com/channel/UCG8yl6wupq3kHem9SE4qa0g" target="_blank" rel="nofollow noopener">
            <img src="https://www.ofertadeo.com/icons/youtube.svg" alt="Google plus Ofertadeo" title="Google+ Ofertadeo" width="30" height="30">
          </v-btn>
        </li>
        <li>
          <v-btn tag="a" href="https://es.pinterest.com/ofertadeo/" target="_blank" rel="nofollow noopener">
            <img src="https://www.ofertadeo.com/icons/pinterest.svg" alt="Pinteres Ofertadeo" title="Pinterest Ofertadeo" width="30" height="30">
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
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  line-height: inherit;
  padding: 0.5rem;
  color: $white;
  a,h5 {
    color: $white;
  }

  & > :first-child {
    margin-left: 0.5rem;
  }

  #follow {
    list-style:none !important;
    display: flex !important;
    a.btn {
      width:30px !important;
      min-width:30px !important;
      min-height:30px !important;
      padding:0 !important;
      background-color: #fff !important;
      margin-left: 5px !important;
      margin-right: 5px !important;
      .btn__content {
        min-width: 20px !important;
      }
    }
    img {
      width:30px;
    }
  }
}
ul {
  list-style:none;
  margin-left: 0;
  padding-left: 0;
}
</style>
