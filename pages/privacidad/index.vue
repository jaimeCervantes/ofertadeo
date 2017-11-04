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
        <h1 class="title">Aviso de privacidad</h1>
        <p>Este es el aviso de privacidad, mismo al que queda usted sujeto por el solo hecho de visitar nuestro sitio Web. Por ello garantizamos la confidencialidad de los datos personales facilitados por los usuarios, incluidos en un fichero automatizado y se compromete a utilizarlos de acuerdo con la finalidad del mismo, así como a su obligación de guardarlos y adaptar todas las medidas para evitar la alteración, pérdida, tratamiento o acceso no autorizado.</p>

        <p>Al ingresar tus datos a través de los formularios de registro, el usuario autoriza expresamente al propietario de esta Página Web, al tratamiento automatizado de los mismos, con el fin de poner a su disposición información relacionada con promociones, descuentos, sorteos y demás ofertas que consideramos puedan ser del interés del usuario, sin perjuicio de su derecho a revocar el consentimiento a este tratamiento que ahora otorga, cuando lo estime oportuno.</p>

        <p> Una vez que hayamos recibido la información, Ofertadeo.com se compromete a proteger y respetar tu privacidad, estará bajo estrictos parámetros para tratar de evitar cualquier acceso no autorizado, sin embargo no podemos garantizar la seguridad de los datos que transmitas a nuestro sitio web o aplicaciones móviles, por lo que cualquier transmisión de información que hagas lo haces bajo tu propio riesgo.</p>

        <p>Sólo los administradores de Ofertadeo.com tendrán acceso a tu información y tienen indicaciones de nunca compartir con terceros, al menos que seamos obligados por vía legal.</p>

        <p>En ofertadeo.com.com hay links a otros sitios webs independientes a Ofertadeo y si das click a estos links, visitarás dichos sitios Web que tienen su propia política de privacidad, términos y condiciones. Por lo que es tu responsabilidad revisar dichas políticas antes de enviar información a estas páginas Web.</p>
        <p>
        Al enviar datos a Ofertadeo aceptas la transferencia, resguardo y manejo de dichos datos por parte de Ofertadeo. Por nuestra parte haremos nuestro mayor esfuerzo tomando medidas razonables para proteger tus datos de manera segura y de acuerdo a esta política de privacidad.</p>

        <h3 class="title">Datos solicitados</h3>

        <p>Para acceder a algunos de los espacios de la web será necesario facilitar determinados datos personales que serán tratados de forma automatizada.</p>

        <h3 class="title">Derecho de acceso</h3>

        <p>El titular de los datos de carácter personal tendrá derecho acceso, rectificación cancelación u oposición respecto a cuantos datos tuyos existan almacenados en la base de datos de Ofertadeo.com. Dichos derechos podrán ser ejercitados a través de cualquier medio de comunicación con Ofertadeo.com en el e-mail contacto@ofertadeo.com.</p>

        <h3 class="title">Objetivos de la recolección de datos</h3>

        <p>Cuando sea solicitada la cumplimentación de un formulario en el que se recojan datos de carácter personal, se informará al usuario de la finalidad del tratamiento, de la identidad y dirección del responsable del fichero, de los destinatarios de la información y de la posibilidad del titular de los datos de ejercer los derechos de acceso, rectificación, cancelación y oposición al tratamiento de sus datos.</p>

        <p>Al mismo tiempo, los usuarios autorizan expresamente a la empresa a enviarles información comercial vía electrónica, respecto de novedades en el ámbito de los productos y servicios prestados por la misma; en el supuesto de que no deseen recibir la mencionada información bastará con notificarlo vía e-mail a contacto@ofertadeo.com, en cualquier momento.</p>

        <h3 class="title">Veracidad de los datos</h3>

        <p>El usuario deberá rellenar los formularios con datos verdaderos, exactos, completos y actuales. En el caso de que el usuario introduzca datos correspondientes a otra persona, se entenderá que tiene consentimiento expreso para ello de esta persona, y que ésta nos otorga autorización para realizar el tratamiento descrito. El usuario será el único responsable de cualquier daño o perjuicio, directo o indirecto que pudiera ocasionar a cualquier persona a causa de la cumplimentación del formulario con datos falsos, inexactos, incompletos o no actualizados.</p>

        <h3 class="title">Medidas de seguridad</h3>

        <p>Ofertadeo.com ha adoptado todos los dispositivos técnicos a su alcance para evitar la pérdida, el mal uso, la alteración, el acceso o el robo de los datos personales facilitados por los usuarios de la web. El usuario tendrá en cuenta, sin embargo, que las medidas de seguridad en Internet no son absolutamente inviolables.</p>

        <h3 class="title">Presencia de “cookies”</h3>

        <p>Esta página web utiliza “cookies” cuando un usuario navega por la web. Las “cookies” son unos pequeños ficheros de datos que el servidor de Internet remite al navegador y que le son devueltos posteriormente en cada nueva petición. Estos ficheros se almacenan en el ordenador del usuario y permiten al sistema recordar características o preferencias de navegación de sesiones anteriores. Las “cookies” de esta web no son invasivas ni nocivas, y no contienen datos de carácter personal. En todo caso, puede desactivar la utilización de cookies” siguiendo las instrucciones de su navegador.</p>

        <h3 class="title">Contacto</h3>

        <p>Si tienes alguna duda, pregunta o comentario respecto a nuestra política de privacidad puedes hacerlo a través de nuestro formulario de contacto.</p>
      </v-flex> 
    </v-layout>
  </v-container>
</template>

<script>
import OferPaths from '~/components/mixins/ofer-paths.vue'
import OfferCommon from '~/components/mixins/ofer-common.vue'
export default {
  mixins: [OferPaths, OfferCommon],
  data () {
    return {
      path: '/privacidad'
    }
  },
  head () {
    return {
      title: 'Privacidad | Ofertadeo',
      meta: [
        { hid: 'title', name: 'title', content: 'Privacidad | Ofertadeo' },
        { hid: 'description', name: 'description', content: 'Este es el aviso de privacidad, mismo al que queda usted sujeto por el solo hecho de visitar nuestro sitio Web. Por ello garantizamos la confidencialidad...' }
      ],
      link: [
        { rel: 'canonical', href: `${this.config.host}/privacidad` }
      ]
    }
  },
  components: {
    OferPaths
  }
}
</script>
<style scope>
  h3.title {
    font-size: 1.2rem;
  }
</style>
