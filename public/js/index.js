!function(t){var e={};function n(a){if(e[a])return e[a].exports;var r=e[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(a,r,function(e){return t[e]}.bind(null,r));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);angular.module("VtaminkaApplication.controllers",[]),angular.module("VtaminkaApplication.services",[]),angular.module("VtaminkaApplication.filters",[]),angular.module("VtaminkaApplication.directives",[]),angular.module("VtaminkaApplication.constants",[]),angular.module("VtaminkaApplication.controllers").controller("MainController",["$scope","LocaleService","$translate",class{constructor(t,e,n){t.updateTranslations=function(t){n.use(t)}}}]),angular.module("VtaminkaApplication.constants").constant("HOST","http://localhost:63342/Vtaminka/public/"),angular.module("VtaminkaApplication.constants").constant("GET_LANGS","i18n/langs.json"),angular.module("VtaminkaApplication.constants").constant("GET_PRODUCTS","products/products-list.json"),angular.module("VtaminkaApplication.constants").constant("GET_TRANSLATIONS","i18n/{{LANG}}.json"),angular.module("VtaminkaApplication.services").service("LocaleService",["$http","HOST","GET_LANGS","GET_TRANSLATIONS",class{constructor(t,e,n,a){this._$http=t,this._HOST=e,this._GET_LANGS=n,this._GET_TRANSLATIONS=a}async getLangs(){return(await this._$http.get(`${this._HOST}${this._GET_LANGS}`)).data}async getTranslations(t){let e=this._GET_TRANSLATIONS.replace("{{LANG}}",t.toUpperCase());return(await this._$http.get(`${this._HOST}${e}`)).data}}]),angular.module("VtaminkaApplication.services").service("ProductService",["$http","HOST","GET_PRODUCTS",class{constructor(t,e,n){this._$http=t,this._HOST=e,this._GET_PRODUCTS=n}async getProducts(){let t=(await this._$http.get(`${this._HOST}${this._GET_PRODUCTS}`)).data;return t.forEach(t=>{t.amount=1}),t}}]),angular.module("VtaminkaApplication.services").service("CartService",[class{constructor(){this.cart=[]}getCart(){return this.cart}addProduct(t){this.cart.push(t)}}]),angular.module("VtaminkaApplication.directives").directive("langsOptionDirective",[function(){return{restrict:"A",template:"",scope:{langs:"="},controller:["$scope",function(t){t.currentLang=t.langs[0],t.changeLanguage=function(e){console.log(e),t.$parent.updateTranslations(e)}}],link:function(t,e,n,a,r){let o="";t.langs.forEach(t=>{o+=`<option value="${t}" >${t}</option>`}),e.html(o),new SelectFx(document.querySelector("#langs"),{onChange:t.changeLanguage})}}}]),angular.module("VtaminkaApplication.directives").directive("productDirective",[function(){return{restrict:"A",scope:{product:"="},templateUrl:"templates/directives/product-directive.html",controller:["$scope","CartService",function(t,e){t.changeAmount=function(e){t.product.amount=e},t.AddProduct=function(t){t.isInCart=!0,e.addProduct(t),console.log(e.getCart())}}],link:function(t,e){new SelectFx(e.context.querySelector("select.cs-select"),{onChange:t.changeAmount}),ripplyScott.init(".button",.75)}}}]);let a=angular.module("VtaminkaApplication",["angular-loading-bar","LocalStorageModule","VtaminkaApplication.controllers","VtaminkaApplication.filters","VtaminkaApplication.services","VtaminkaApplication.directives","VtaminkaApplication.constants","ngRoute","ui.router","pascalprecht.translate"]);a.config(["$stateProvider","$urlRouterProvider","$locationProvider","localStorageServiceProvider","cfpLoadingBarProvider","$translateProvider",(t,e,n,a,r,o)=>{n.html5Mode(!0).hashPrefix("!"),e.otherwise("/home"),o.useStaticFilesLoader({prefix:"i18n/",suffix:".json"}),o.preferredLanguage("RU"),r.includeSpinner=!0,r.includeBar=!0,a.setStorageCookie(7,"/"),a.setStorageCookieDomain("localhost"),t.state("home",{url:"/home",views:{header:{templateUrl:"templates/header.html",controller:["$scope","CartService","langs",function(t,e,n){t.langs=n,t.cart=e.getCart()}]},content:{templateUrl:"templates/home/home.html",controller:["$scope","CartService","products",function(t,e,n){t.products=n,t.cart=e.getCart()}]},footer:{templateUrl:"templates/footer.html"}},resolve:{products:["ProductService",function(t){return t.getProducts()}],langs:["LocaleService",function(t){return t.getLangs()}]}})}]),a.run(["$rootScope","$state","$stateParams",function(t,e,n){}])}]);
//# sourceMappingURL=index.js.map