webpackJsonp([3],{188:function(t,e,r){r(367);var n=r(19)(r(345),r(357),"data-v-22c8c4dd",null);t.exports=n.exports},192:function(t,e,r){"use strict";var n=r(58),o=r.n(n),i={};e.a=o.a.create(i)},193:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["items","routes","breadcrumbs","infoSection"]}},194:function(t,e,r){"use strict";e.__esModule=!0;var n=r(20),o=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=function(t){return function(){var e=t.apply(this,arguments);return new o.default(function(t,r){function n(i,a){try{var s=e[i](a),c=s.value}catch(t){return void r(t)}if(!s.done)return o.default.resolve(c).then(function(t){n("next",t)},function(t){n("throw",t)});t(c)}return n("next")})}}},195:function(t,e,r){t.exports=r(197)},196:function(t,e,r){e=t.exports=r(31)(void 0),e.push([t.i,".header[data-v-ccda79a8]{padding:0 .5rem}.section-divider[data-v-ccda79a8]{padding:0}",""])},197:function(t,e,r){(function(e){var n="object"==typeof e?e:"object"==typeof window?window:"object"==typeof self?self:this,o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r(198),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}}).call(e,r(33))},198:function(t,e,r){(function(e){!function(e){"use strict";function r(t,e,r,n){var i=e&&e.prototype instanceof o?e:o,a=Object.create(i.prototype),s=new p(n||[]);return a._invoke=u(t,r,s),a}function n(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function o(){}function i(){}function a(){}function s(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function c(t){function r(e,o,i,a){var s=n(t[e],t,o);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"==typeof u&&g.call(u,"__await")?Promise.resolve(u.__await).then(function(t){r("next",t,i,a)},function(t){r("throw",t,i,a)}):Promise.resolve(u).then(function(t){c.value=t,i(c)},a)}a(s.arg)}function o(t,e){function n(){return new Promise(function(n,o){r(t,e,n,o)})}return i=i?i.then(n,n):n()}"object"==typeof e.process&&e.process.domain&&(r=e.process.domain.bind(r));var i;this._invoke=o}function u(t,e,r){var o=E;return function(i,a){if(o===O)throw new Error("Generator is already running");if(o===C){if("throw"===i)throw a;return m()}for(r.method=i,r.arg=a;;){var s=r.delegate;if(s){var c=l(s,r);if(c){if(c===R)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===E)throw o=C,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=O;var u=n(t,e,r);if("normal"===u.type){if(o=r.done?C:k,u.arg===R)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(o=C,r.method="throw",r.arg=u.arg)}}}function l(t,e){var r=t.iterator[e.method];if(r===v){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=v,l(t,e),"throw"===e.method))return R;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return R}var o=n(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,R;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=v),e.delegate=null,R):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,R)}function f(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function d(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function p(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(f,this),this.reset(!0)}function h(t){if(t){var e=t[x];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(g.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=v,e.done=!0,e};return n.next=n}}return{next:m}}function m(){return{value:v,done:!0}}var v,y=Object.prototype,g=y.hasOwnProperty,_="function"==typeof Symbol?Symbol:{},x=_.iterator||"@@iterator",w=_.asyncIterator||"@@asyncIterator",b=_.toStringTag||"@@toStringTag",L="object"==typeof t,j=e.regeneratorRuntime;if(j)return void(L&&(t.exports=j));j=e.regeneratorRuntime=L?t.exports:{},j.wrap=r;var E="suspendedStart",k="suspendedYield",O="executing",C="completed",R={},P={};P[x]=function(){return this};var M=Object.getPrototypeOf,F=M&&M(M(h([])));F&&F!==y&&g.call(F,x)&&(P=F);var N=a.prototype=o.prototype=Object.create(P);i.prototype=N.constructor=a,a.constructor=i,a[b]=i.displayName="GeneratorFunction",j.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===i||"GeneratorFunction"===(e.displayName||e.name))},j.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,a):(t.__proto__=a,b in t||(t[b]="GeneratorFunction")),t.prototype=Object.create(N),t},j.awrap=function(t){return{__await:t}},s(c.prototype),c.prototype[w]=function(){return this},j.AsyncIterator=c,j.async=function(t,e,n,o){var i=new c(r(t,e,n,o));return j.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},s(N),N[b]="Generator",N[x]=function(){return this},N.toString=function(){return"[object Generator]"},j.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},j.values=h,p.prototype={constructor:p,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=v,this.done=!1,this.delegate=null,this.method="next",this.arg=v,this.tryEntries.forEach(d),!t)for(var e in this)"t"===e.charAt(0)&&g.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=v)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){function e(e,n){return i.type="throw",i.arg=t,r.next=e,n&&(r.method="next",r.arg=v),!!n}if(this.done)throw t;for(var r=this,n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var a=g.call(o,"catchLoc"),s=g.call(o,"finallyLoc");if(a&&s){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&g.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,R):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),R},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),d(r),R}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;d(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:h(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=v),R}}}("object"==typeof e?e:"object"==typeof window?window:"object"==typeof self?self:this)}).call(e,r(33))},199:function(t,e,r){r(201);var n=r(19)(r(193),r(200),"data-v-ccda79a8",null);t.exports=n.exports},200:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-content",[r("v-container",{attrs:{fluid:""}},[r("v-row",[r("div",{staticClass:"header"},[r("v-breadcrumbs",{attrs:{divider:""}},t._l(t.breadcrumbs,function(e){return r("v-breadcrumbs-item",{key:e,attrs:{disabled:e.disabled,href:e.href,target:e.target||"_self"}},[t._v("\n            "+t._s(e.text)+"\n          ")])})),t._t("info-section")],2)]),r("v-divider",{staticClass:"section-divider"}),t._t("content"),t._t("more-content")],2)],1)},staticRenderFns:[]}},201:function(t,e,r){var n=r(196);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(32)("7c6573d8",n,!0)},202:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["item","toLink","type"]}},203:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(192);e.default={props:{url:{type:String,default:""},pagination:{type:Object},txt:{type:String}},data:function(){return{reqCounter:0,loading:!1}},methods:{getMore:function(){var t=this;this.loading=!0,this.reqCounter+=1,n.a.get(this.url+"?page="+this.reqCounter).then(function(e){t.$emit("more-items",e.data.items)}).catch(function(t){alert(t)}).then(function(){t.loading=!1})}},computed:{disabled:function(){return 0===this.pagination.pages||this.pagination.pages-1===this.reqCounter}}}},204:function(t,e,r){e=t.exports=r(31)(void 0),e.push([t.i,".card__row[data-v-78bae970]{-ms-flex-pack:center;justify-content:center}.item__img[data-v-78bae970]{overflow:hidden}.item__img img[data-v-78bae970]{width:150px}.item__img .categories[data-v-78bae970]{width:125px}.item__name[data-v-78bae970],.item__store[data-v-78bae970]{-ms-flex-pack:left;justify-content:left;color:#424242;min-height:18px;font-weight:700}.item__store a[data-v-78bae970]{color:#888;font-size:.8rem}",""])},205:function(t,e,r){e=t.exports=r(31)(void 0),e.push([t.i,".actions[data-v-a31db136]{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}",""])},206:function(t,e,r){r(210);var n=r(19)(r(202),r(208),"data-v-78bae970",null);t.exports=n.exports},207:function(t,e,r){r(211);var n=r(19)(r(203),r(209),"data-v-a31db136",null);t.exports=n.exports},208:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"item",attrs:{hover:"",raised:""}},[t.item.thumbnail?r("v-card-row",{staticClass:"item__img"},[r("nuxt-link",{attrs:{to:t.toLink}},[r("img",{class:t.type,attrs:{src:t.item.thumbnail,alt:t.item.img_alt,title:t.item.img_title}})])],1):t._e(),t.item.store_id?r("v-card-row",{staticClass:"item__store"},[r("div",{staticClass:"pl-2 pr-2"},[r("nuxt-link",{attrs:{to:t.$store.state.routes.storeList+"/"+t.item.store_id}},[t._v(t._s(t.item.store_id.split("-").join(" ").toUpperCase()))])],1)]):t._e(),t.item.title||t.item.name?r("v-card-row",{staticClass:"item__name"},[r("div",{staticClass:"pl-2 pr-2"},[r("nuxt-link",{attrs:{to:t.toLink}},[t._v(t._s(t.item.title||t.item.name))])],1)]):t._e()],1)},staticRenderFns:[]}},209:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"actions"},[r("v-btn",{attrs:{primary:"",large:"",disabled:t.disabled,loading:t.loading},nativeOn:{click:function(e){t.getMore(e)}}},[t._v("\n    "+t._s(t.txt)+"\n  ")])],1)},staticRenderFns:[]}},210:function(t,e,r){var n=r(204);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(32)("6a9e7d0b",n,!0)},211:function(t,e,r){var n=r(205);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(32)("15466d5a",n,!0)},345:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(195),o=r.n(n),i=r(194),a=r.n(i),s=r(192),c=r(199),u=r.n(c),l=r(206),f=r.n(l),d=r(207),p=r.n(d);e.default={data:function(){return{urlReq:"/api/home"}},asyncData:function(){function t(){return e.apply(this,arguments)}var e=a()(o.a.mark(function t(){var e,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("/api/home");case 2:return e=t.sent,r=e.data,t.abrupt("return",r);case 5:case"end":return t.stop()}},t,this)}));return t}(),components:{OferContent:u.a,OferItem:f.a,OferMoreItems:p.a},methods:{concatItems:function(t){this.items=this.items.concat(t)}},head:function(){return{link:[{rel:"canonical",href:""+this.$store.state.host}]}}}},350:function(t,e,r){e=t.exports=r(31)(void 0),e.push([t.i,".title[data-v-22c8c4dd]{margin-top:.5rem}",""])},357:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ofer-content",[r("template",{slot:"info-section"},[r("h1",{staticClass:"title"},[t._v("Ofertas, promociones y descuentos en México")])]),r("template",{slot:"content"},[r("v-row",t._l(t.items,function(e,n){return r("v-col",{key:n,staticClass:"mt-3 mb-3",attrs:{xs6:"",sm3:"",md3:"",lg2:"",xl2:""}},[r("ofer-item",{attrs:{item:e,"to-link":t.$store.state.routes.stores+"/"+e.slug}})],1)}))],1),r("template",{slot:"more-content"},[r("ofer-more-items",{attrs:{pagination:t.pagination,url:t.urlReq,txt:"Cargar más ofertas"},on:{"more-items":t.concatItems}})],1)],2)},staticRenderFns:[]}},367:function(t,e,r){var n=r(350);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(32)("347c29d5",n,!0)}});