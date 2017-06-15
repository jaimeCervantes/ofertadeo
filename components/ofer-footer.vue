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
          <li><a href="https://www.facebook.com/ofertadeo/" target="_blank"><img src="/icons/facebook.svg" alt="facebook ofertadeo"></a></li>
          <li><a href="https://plus.google.com/110009950298317863923" target="_blank"><img src="/icons/google-plus.svg" alt="Google plus ofertadeo"></a></li>
          <li><a href="https://es.pinterest.com/ofertadeo/" target="_blank"><img src="/icons/pinterest.svg" alt="Pinteres ofertadeo"></a></li>
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
    img {
      margin-left:5px;
      width:30px;
    }
  }
}
</style>
