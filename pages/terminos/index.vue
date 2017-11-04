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
      <section>
      <h1 class="title">Términos y Condiciones</h1>
      <p>Estos son los términos y condiciones a los que de ahora en adelante quedas sujeto al visitar nuestro sitio Web. Las Ofertas y Promociones que encontrarás en este sitio Web son de carácter informativo. Las marcas, tiendas, empresas y establecimientos mencionados, así como los beneficios a obtener, son propiedad y responsabilidad de sus respectivos representantes. Se prohíbe la reproducción total o parcial de este sitio Web. Todo el contenido publicado es responsabilidad de los usuarios</p>

      <p>Ofertadeo.com es una página que recolecta ofertas y promociones de las principales tiendas y proveedores de servicios en México. No nos hacemos responsables de la veracidad de dichas ofertas y promociones, somos únicamente un medio informativo que procura validar lo más posible las ofertas, colocando el lugar oficial en la que se ha visto, siempre y cuando esté disponible. Si alguna promoción no es real o está incompleta, te pedimos reportarla con la administración de la página, nosotros aclararemos o completaremos los datos para que todos los usuarios tengan la información.</p>

      <p>Ofertadeo.com solo se limita a exhibir beneficios existentes en la república Mexicana. No es responsable por datos erróneos que puedan figurar. Tampoco tendrá responsabilidad alguna por los daños o perjuicios que el usuario pudiera sufrir derivados del acceso, uso o mala utilización de los contenidos de Oferatadeo.com. Toda la información publicada puede ser modificada sin previo aviso. Para mayor información y ante cualquier duda consultar en la página correspondiente a la empresa que brinda la promoción.</p>

      <p>Todos los contenidos que se muestran en página web ofertadeo.com y en especial, diseños, textos, audio, gráficos, logos, bases de datos, nombres comerciales, marcas, o cualesquiera otros signos susceptibles de utilización industrial y comercial están sujetos a derechos de propiedad intelectual e industrial del propietario y/o de terceros titulares de los mismos que han autorizado debidamente su inclusión en el Sistema On-Line. Su sola mención no comporta respaldo, patrocinio, o recomendación, derecho o responsabilidad alguna de la Web sobre los mismos.</p>

      <p>Ofertadeo.com es un medio de comunicacion e informacion a través de Internet que le ofrece información relacionada con ofertas, promociones, descuentos y concursos, por lo que, al acceder a Ofertadeo.com, usted está sujeto a los Términos de Servicio y Condiciones de Uso. Al acceder a Ofertadeo.com aceptas plenamente estos Términos y Condiciones tal y como aparecen en el momento de su acceso, mismos que están sujetos a cambios y modificaciones sin previo aviso en cualquier momento.</p>

      <p>El propósito principal de Ofertadeo.com es dar a conocer información acerca de ofertas, promociones, descuentos y concursos en beneficio de los consumidores y público en general. En ningún momento Ofertadeo.com pretende aplicar o hacer válidas las promociones y ofertas aquí publicadas que son responsabilidad de sus propios patrocinadores/proveedores/organizadores.</p>

      <p>El uso de este sitio web es bajo tu propia responsabilidad. Ofertadeo.com contiene información, datos, texto y otro contenido recopilado de una variedad de fuentes de información. Este contenido se provee para su conveniencia e intenta solamente informar al público en general y consumidores sobre temas de ofertas y promociones de marcas, productos y servicios.</p>

      <p>Sin limitar lo anterior, toda la información en Ofertadeo.com se le proporciona a usted “como está disponible” y “como es” sin garantía de cualquier tipo, incluyendo, pero no limitado, a las garantías implícitas del uso del producto. Ofertadeo.com no garantiza la integridad, fiabilidad, exactitud o novedad del contenido, información y enlaces, o sobre el uso o los resultados del uso de dicha información obtenida de este sitio web. Tú estás de acuerdo en que Ofertadeo.com, bajo cualquier circunstancia, no será responsable ante ti o ante nadie más por cualquier decisión o acción tomada por ti o cualquier otra persona en la información proporcionada en Ofertadeo.com.</p>

      <p>Ofertadeo.com no endosa, ni garantiza, ni es parte de, ni supervisa cualquier transacción entre los usuarios y los patrocinadores/proveedores/organizadores de las ofertas, promociones, descuentos y concursos publicados en este sitio Web. Reconoces que cualquier validez o garantía que se proporciona en relación con cualquier oferta, promoción, descuento u concurso que pueden ser descritos o publicados en Ofertadeo.com es proporcionada solamente por el organizador, proveedor, dueño o anunciante y no por Ofertadeo.com. Es su responsabilidad evaluar la exactitud, integridad o utilidad de cualquier información u otro contenido disponible a través de Ofertadeo.com.</p>

      <p>Ofertadeo.com no da ninguna garantía de que las ofertas, promociones, descuentos y concursos estarán libres de errores, retrasos, interrupciones o pérdidas, o que todos los errores serán corregidos. En la eventualidad de que una inexactitud exista en Ofertadeo.com por favor informe a ofertadeo@gmail.com.</p>

      <p>Ofertadeo.com proporciona enlaces a otros sitios web que ofrecen información útil y detalles acerca de las ofertas, promociones, descuentos y concursos aquí publicados. La inclusión de cualquier enlace a tales sitios web no implica endoso o control por parte de Ofertadeo.com de los sitios web de terceros. Ofertadeo.com no es responsable por los términos de servicio ni las políticas de privacidad o cualquier acción de cualquier tercero que controle tales sitios web.</p>

      <p>Ofertadeo.com tiene el derecho, pero no la responsabilidad, de supervisar el contenido en el sitio web y dar cualquier información a terceros. Ofertadeo.com se reserva el derecho de negarse a anunciar o quitar cualquier información o contenido, en total o en parte, que sea inaceptable, ofensiva o en violación de este acuerdo, con la sola determinación de Ofertadeo.com.</p>

      <p>Por la naturaleza de sus servicios, Ofertadeo.com presenta como referencia marcas de productos o de servicio propiedad de terceros lo cual no implica autorización para usarlas, mencionarlas o mostrarlas en cualquier forma o medio sin la autorización previa por escrito del titular de las mismas.</p>
      </section>
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
      path: '/terminos'
    }
  },
  head () {
    return {
      title: 'Términos | Ofertadeo',
      meta: [
        { hid: 'title', name: 'title', content: 'Términos | Ofertadeo' },
        { hid: 'description', name: 'description', content: 'Estos son los términos y condiciones a los que de ahora en adelante quedas sujeto al visitar nuestro sitio Web. Las Ofertas y Promociones que encontrarás...' }
      ],
      link: [
        { rel: 'canonical', href: `${this.config.host}/terminos` }
      ]
    }
  },
  components: {
    OferPaths
  }
}
</script>
