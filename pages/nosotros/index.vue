<template>
  <v-container grid-list-md fluid>
    <v-layout column>
      <v-flex xs12 sm12 md12 lg12 xl2>
        <header>
          <v-breadcrumbs divider="/" v-if="exists(breadcrumbs)">
            <v-breadcrumbs-item
              v-for="item in breadcrumbs" :key="item.href"
              :disabled="item.disabled"
              :href="item.href"
              :target="item.target || '_self'"
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </header>
        
        <h1 class="title">Nosotros</h1>
        <p>Ofertadeo.com fue fundado con el fin de ayudar ahorrar a cualquier persona que requiera comprar cualquier producto. Actualmente ahorrar desde un peso es de gran ayuda para las familias Mexicanas que con los sueldos bajos no alcanza para la despensa básica. Por ello nace Ofertadeo, que nos ayuda ahorrar nuestro dinero, para evitar comprar productos con costos elevados.</p>

        <p>Además la economía del país no nos permite mal gastar nuestro dinero. Tenemos de alguna manera sacarle el mayor provecho, y eso se consigue con las ofertas y promociones que las tiendas ofrecen a sus clientes, o bien aprovechar cupones, con los que podemos obtener grandiosos descuentos o conejar por productos.</p>

        <p>Actualmente en México existen 2 sitios Web pioneros que informan sobre las ofertas que se encuentran publicadas en promociones y descuentos de tiendas como Walmart, Amazon, Liverpool, Soriana, etc se trata de Cazaofertas y Promodescuentos. El problema de estas páginas, es que no publican todas las ofertas de la mayoría de las tiendas, por lo que surge la necesidad de un proyecto alternativo que recopile la mayoría de promociones actuales de cada tienda, aunque sea pequeña.</p>

        <p>Esta idea se concretó el 15 de junio de 2017 ya que publicamos las primeras ofertas de Julio Regalado, de allí en adelante publicamos promociones en varios productos como PS4, Xbox One, pañales, pantallas, computadoras, celulares, boletos de avión, de cine o una cama gigante, estas en lugar correcto para ahorrar tu dinero todos los días.</p>

        <p>Ofertadeo.com es un sitio Web donde podrás encontrar las mejores ofertas, promociones, descuentos y concursos de las mejores tiendas en México, y de diferentes categorías. Y lo mejor de todo: al alcance de todas las personas que como tú y yo quieren ahorrar, desde un celular hasta un Cama Kinzae.</p>

        <p>Nuestro objetivo principal es proporcionar un medio rápido, eficaz y oportuno para dar a conocer las mejores promociones en México, y con ello ayudarte a ahorrar cada vez más, tiempo, dinero y esfuerzo.</p>

        <p>Así mismo, te ofrecemos las mejores ofertas de las mejores temporadas del año: El Buen Fin, Hot Sale, Julio Regalado, Navidad, Año nuevo, por mencionar algunos. Al igual que productos de alta demanda como lo son: Celulares, Consolas de videojuegos, Autos, Concursos, Pantallas, Ropa y Zapatos.</p>

        <p>Y lo mejor de todo, es que tú mismo podrás compartir con nosotros y a todo México, las ofertas, promociones, descuentos y concursos de las que te encuentres enterado por otras fuentes y/o medios. Siéntete con la confianza de compartir tus experiencias de compras y ventas en nuestra comunidad. Si deseas compartir una promociones, lo puedes hacer en el botón de Comparte una Oferta.</p>
      </v-flex> 
    </v-layout>
  </v-container>
</template>

<script>
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OferCommon from '~/components/mixins/ofer-common.vue'
export default {
  mixins: [OferPaths, OferCommon],
  data () {
    return {
      // Check ofer-paths component, it use this path variable to create the breadcrumbs
      path: '/nosotros'
    }
  },
  head () {
    return {
      title: 'Nosotros | Ofertadeo',
      meta: [
        { hid: 'title', name: 'title', content: 'Ofertas, promociones y descuentos en México | Ofertadeo' },
        { hid: 'description', name: 'description', content: 'Ofertadeo.com fue fundado con el fin de ayudar ahorrar a cualquier persona que requiera comprar cualquier producto. Actualmente ahorrar desde 1 peso es...' }
      ],
      link: [
        { rel: 'canonical', href: `${this.config.host}/nosotros` }
      ]
    }
  },
  components: {
    OferPaths
  }
}
</script>
