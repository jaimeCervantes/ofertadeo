webpackJsonp([15],{184:function(e,o,a){var t=a(16)(a(365),a(414),null,null);e.exports=t.exports},313:function(e,o,a){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={props:["items","routes","breadcrumbs","infoSection"]}},314:function(e,o,a){o=e.exports=a(31)(void 0),o.push([e.i,".breadcrumbs-info-section[data-v-1722db82]{padding:0 .5rem}.section-divider[data-v-1722db82]{padding:0}.middle-content[data-v-1722db82],header[data-v-1722db82]{padding-top:.5rem}.middle-content h2[data-v-1722db82]{margin-bottom:0}",""])},315:function(e,o,a){a(317);var t=a(16)(a(313),a(316),"data-v-1722db82",null);e.exports=t.exports},316:function(e,o){e.exports={render:function(){var e=this,o=e.$createElement,a=e._self._c||o;return a("div",{staticClass:"content"},[a("article",{staticClass:"container container--fluid"},[a("header",{staticClass:"row"},[a("div",{staticClass:"breadcrumbs-info-section"},[a("v-breadcrumbs",{attrs:{divider:""}},e._l(e.breadcrumbs,function(o){return a("v-breadcrumbs-item",{key:o,attrs:{disabled:o.disabled,href:o.href,target:o.target||"_self"}},[e._v("\n            "+e._s(o.text)+"\n          ")])})),e._t("info-section")],2)]),a("v-divider",{staticClass:"section-divider"}),a("div",{staticClass:"middle-content"},[e._t("content"),e._t("more-content")],2)],1)])},staticRenderFns:[]}},317:function(e,o,a){var t=a(314);"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a(32)("765a7bec",t,!0)},335:function(e,o,a){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={computed:{breadcrumbs:function(){var e=this.path.split("/").filter(function(e){return e}).map(function(e,o,a){var t=a.slice(0,o),r="/"+e,s=e.split("-").join(" ");return t.length>0&&(r=t.reduce(function(e,o){return e+o+"/"},"/"),r+=""+e),o<a.length-1&&(s+=" /"),{text:s,href:r,disabled:!1,target:"_self"}});return e.unshift({text:"Inicio /",href:"/",disabled:!1,target:"_self"}),e}}}},336:function(e,o,a){var t=a(16)(a(335),null,null,null);e.exports=t.exports},365:function(e,o,a){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=a(336),r=a.n(t),s=a(315),n=a.n(s);o.default={mixins:[r.a],data:function(){return{path:"/nosotros"}},head:function(){return{title:"Nosotros | Ofertadeo",meta:[{hid:"title",name:"title",content:"Ofertas, promociones y descuentos en México | Ofertadeo"},{hid:"description",name:"description",content:"Ofertadeo.com fue fundado con el fin de ayudar ahorrar a cualquier persona que requiera comprar cualquier producto. Actualmente ahorrar desde 1 peso es..."}],link:[{rel:"canonical",href:this.$store.state.host+"/nosotros"}]}},components:{OferPaths:r.a,OferContent:n.a}}},414:function(e,o){e.exports={render:function(){var e=this,o=e.$createElement,a=e._self._c||o;return a("ofer-content",{attrs:{breadcrumbs:e.breadcrumbs}},[a("template",{slot:"content"},[a("v-row",[a("v-col",{staticClass:"mt-3 mb-3",attrs:{xs12:"",sm12:"",md12:"",lg12:"",xl12:""}},[a("h1",{staticClass:"title"},[e._v("Nosotros")]),a("p",[e._v("Ofertadeo.com fue fundado con el fin de ayudar ahorrar a cualquier persona que requiera comprar cualquier producto. Actualmente ahorrar desde un peso es de gran ayuda para las familias Mexicanas que con los sueldos bajos no alcanza para la despensa básica. Por ello nace Ofertadeo, que nos ayuda ahorrar nuestro dinero, para evitar comprar productos con costos elevados.")]),a("p",[e._v("Además la economía del país no nos permite mal gastar nuestro dinero. Tenemos de alguna manera sacarle el mayor provecho, y eso se consigue con las ofertas y promociones que las tiendas ofrecen a sus clientes, o bien aprovechar cupones, con los que podemos obtener grandiosos descuentos o conejar por productos.")]),a("p",[e._v("Actualmente en México existen 2 sitios Web pioneros que informan sobre las ofertas que se encuentran publicadas en promociones y descuentos de tiendas como Walmart, Amazon, Liverpool, Soriana, etc se trata de Cazaofertas y Promodescuentos. El problema de estas páginas, es que no publican todas las ofertas de la mayoría de las tiendas, por lo que surge la necesidad de un proyecto alternativo que recopile la mayoría de promociones actuales de cada tienda, aunque sea pequeña.")]),a("p",[e._v("Esta idea se concretó el 15 de junio de 2017 ya que publicamos las primeras ofertas de Julio Regalado, de allí en adelante publicamos promociones en varios productos como PS4, Xbox One, pañales, pantallas, computadoras, celulares, boletos de avión, de cine o una cama gigante, estas en lugar correcto para ahorrar tu dinero todos los días.")]),a("p",[e._v("Ofertadeo.com es un sitio Web donde podrás encontrar las mejores ofertas, promociones, descuentos y concursos de las mejores tiendas en México, y de diferentes categorías. Y lo mejor de todo: al alcance de todas las personas que como tú y yo quieren ahorrar, desde un celular hasta un Cama Kinzae.")]),a("p",[e._v("Nuestro objetivo principal es proporcionar un medio rápido, eficaz y oportuno para dar a conocer las mejores promociones en México, y con ello ayudarte a ahorrar cada vez más, tiempo, dinero y esfuerzo.")]),a("p",[e._v("Así mismo, te ofrecemos las mejores ofertas de las mejores temporadas del año: El Buen Fin, Hot Sale, Julio Regalado, Navidad, Año nuevo, por mencionar algunos. Al igual que productos de alta demanda como lo son: Celulares, Consolas de videojuegos, Autos, Concursos, Pantallas, Ropa y Zapatos.")]),a("p",[e._v("Y lo mejor de todo, es que tú mismo podrás compartir con nosotros y a todo México, las ofertas, promociones, descuentos y concursos de las que te encuentres enterado por otras fuentes y/o medios. Siéntete con la confianza de compartir tus experiencias de compras y ventas en nuestra comunidad. Si deseas compartir una promociones, lo puedes hacer en el botón de Comparte una Oferta.")])])],1)],1)],2)},staticRenderFns:[]}}});