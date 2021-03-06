"use strict";

//====================CONTROLLERS===========================//
import MainController from './controllers/MainController';
import CartController from './controllers/CartController';


//====================SERVICES==============================//
import LocaleService from './services/LocaleService';
import ProductService from './services/ProductService';
import CartService from './services/CartService';
import PromoService from './services/PromoService';

//====================FILTERS==============================//
import DescriptionFilter from './filters/DescriptionFilter';
//====================DIRECTIVES==============================//
import LangsOptionDirective from './directives/LangsOptionDirective';
import ProductDirective from './directives/ProductDirective';
import CartDirective from './directives/CartDirective';
import CheckoutDirective from './directives/CheckoutDirective';
import FormDirective from './directives/FormDirective';
import SingleDirective from './directives/SingleDirective';

angular.module('VtaminkaApplication.controllers' , []);
angular.module('VtaminkaApplication.services' , []);
angular.module('VtaminkaApplication.filters' , []);
angular.module('VtaminkaApplication.directives' , []);
angular.module('VtaminkaApplication.constants' , []);

//====================CONTROLLERS DECLARATIONS================================//
angular.module('VtaminkaApplication.controllers')
    .controller( 'MainController' , [ '$scope' , 'LocaleService' , '$translate', MainController ]);

angular.module('VtaminkaApplication.controllers')
    .controller('CartController', ['#scope', 'CartService', CartController]);

//====================CONSTANTS================================//
angular.module('VtaminkaApplication.constants')
    .constant('HOST' , 'http://localhost:63342/Vtaminka/public/');

angular.module('VtaminkaApplication.constants')
    .constant('GET_LANGS' , 'i18n/langs.json');

//GET_PRODUCTS
angular.module('VtaminkaApplication.constants')
    .constant('GET_PRODUCTS' , 'products/products-list.json');

angular.module('VtaminkaApplication.constants')
    .constant('GET_PROMO' , 'products/promo.json');

angular.module('VtaminkaApplication.constants')
    .constant('GET_TRANSLATIONS' , 'i18n/{{LANG}}.json');

//====================SERVICES DECLARATIONS===================//
angular.module('VtaminkaApplication.services')
    .service('LocaleService' , [ '$http', 'HOST' , 'GET_LANGS' , 'GET_TRANSLATIONS' , LocaleService ]);

angular.module('VtaminkaApplication.services')
    .service('ProductService' , [ '$http', 'HOST' , 'GET_PRODUCTS' , ProductService ]);

angular.module('VtaminkaApplication.services')
    .service('CartService' , ['localStorageService', 'ProductService', CartService ]);

angular.module('VtaminkaApplication.services')
    .service('PromoService' , [ '$http', 'HOST' , 'GET_PROMO' , PromoService ]);
//====================DIRECTIVES DECLARATIONS===================//
angular.module('VtaminkaApplication.directives')
    .directive('langsOptionDirective' , [ LangsOptionDirective ]);

angular.module('VtaminkaApplication.directives')
    .directive('productDirective' , [ ProductDirective ]);
angular.module('VtaminkaApplication.directives')
    .directive('cartDirective' , [ CartDirective ]);
angular.module('VtaminkaApplication.directives')
    .directive('checkoutDirective' , [ CheckoutDirective ]);

angular.module('VtaminkaApplication.directives')
    .directive('formDirective' , [ FormDirective ]);

angular.module('VtaminkaApplication.directives')
    .directive('singleDirective' , [ SingleDirective ]);

//====================FILTERS DECLARATIONS===================//
angular.module('VtaminkaApplication.filters')
    .filter('DescriptionFilter' ,  DescriptionFilter);

let app = angular.module('VtaminkaApplication',[
    'angular-loading-bar',
    'LocalStorageModule',
    'VtaminkaApplication.controllers',
    'VtaminkaApplication.filters',
    'VtaminkaApplication.services',
    'VtaminkaApplication.directives',
    'VtaminkaApplication.constants',
    'ngRoute',
    'ui.router',
    'pascalprecht.translate',
]);

app.config( [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    'localStorageServiceProvider' ,
    'cfpLoadingBarProvider',
    '$translateProvider',
    ($stateProvider , $urlRouterProvider , $locationProvider , localStorageServiceProvider , cfpLoadingBarProvider , $translateProvider)=>{

        $locationProvider.html5Mode(true).hashPrefix('!')

        $urlRouterProvider.otherwise('/home');

        $translateProvider.useStaticFilesLoader({
            'prefix': 'i18n/',
            'suffix': '.json'
        });

        $translateProvider.preferredLanguage('RU');

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;

        localStorageServiceProvider.setStorageCookie( 7 , '/' );
        localStorageServiceProvider.setStorageCookieDomain('localhost');

        $stateProvider.state('home' , {
            'url': '/home',
            'views':{
                "header":{
                    "templateUrl": "templates/header.html",
                    controller: [ '$scope' , 'CartService' , 'langs' , function ($scope, CartService , langs ){
                        $scope.langs = langs;
                        $scope.cart = CartService.getCart();

                    } ]
                },
                "content": {
                    'templateUrl': "templates/home/home.html",
                    controller: [ '$scope' ,  'CartService' , 'products' , function ($scope , CartService , products){

                        $scope.limit = 8;
                        $scope.offset = 8;
                        $scope.products = products;
                        let cart = CartService.getCart();

                        let correctProducts = (function(){

                            for ( let i = 0 ; i < cart.length ; i++  ){

                                for(let j=0; j<products.length;j++){

                                    if(cart[i].id===products[j].ProductID){
                                        products[j].isInCart = true;
                                    }//if

                                }//for j


                            }//for i
                            return products;
                        })();


                        $scope.viewProducts = correctProducts.slice(0,$scope.offset);

                        $scope.GetMoreVitamins = function () {
                            this.offset += $scope.limit;
                            this.viewProducts = correctProducts.slice(0, this.offset);

                            if (this.offset >= correctProducts.length) {
                                angular.element(document.querySelector("body")).disable = true;
                            }
                        }

                    } ]
                },
                "footer": {
                    'templateUrl': "templates/footer.html",
                }
            },
            'resolve': {

                'products': [ 'ProductService' , function ( ProductService ){
                    return ProductService.getProducts();
                } ],
                'langs': [ 'LocaleService' , function ( LocaleService ){
                    return LocaleService.getLangs();
                }  ]

            }
        });

        $stateProvider.state('cart' , {
            'url': '/cart',
            'views':{
                "header":{
                    "templateUrl": "templates/header.html",
                    controller: [ '$scope' , 'CartService' , 'langs' , function ($scope, CartService , langs ){
                        $scope.langs = langs;
                        $scope.cart = CartService.getCart();

                    } ]
                },
                "content": {
                    'templateUrl': "templates/cart/cart.html",
                    controller: ['$scope' ,  'productsList' , 'CartService',  function ($scope , productsList,CartService){

                        $scope.products = productsList;

                        document.querySelector('#totalCountVitamin').innerHTML = CartService._getCountCartVitamin();

                        document.querySelector('#totalSumVitamin').innerHTML = CartService._getTotalSumm();


                    }]
                },

                "footer": {
                    'templateUrl': "templates/footer.html",
                }
            },


            'resolve': {

                'productsList': [ 'CartService', function (CartService){
                    return CartService.getFullProducts();
                } ],
                'langs': [ 'LocaleService' , function ( LocaleService ){
                    return LocaleService.getLangs();
                }  ]

            }
        });

        $stateProvider.state('checkout' , {
            'url': '/checkout',
            'views':{
                "header":{
                    "templateUrl": "templates/header.html",
                    controller: [ '$scope' , 'CartService' , 'langs' , function ($scope, CartService , langs ){
                        $scope.langs = langs;
                        $scope.cart = CartService.getCart();

                    } ]
                },
                "content": {
                    'templateUrl': "templates/checkout/checkout.html",
                    controller: ['$scope' ,  'productsList' ,'promoList',  function ($scope , productsList,promoList){

                        $scope.products = productsList;
                        $scope.promos = promoList;

                    }]
                },
                "footer": {
                    'templateUrl': "templates/footer.html",
                }
            },


            'resolve': {

                'productsList': [ 'CartService', function (CartService){
                    return CartService.getFullProducts();
                } ],
                'langs': [ 'LocaleService' , function ( LocaleService ){
                    return LocaleService.getLangs();
                }  ],
                'promoList': [ 'PromoService', function (PromoService){
                    return PromoService.getPromo();
                } ]

            }
        });


        $stateProvider.state('singleVitamin' , {
            'url': '/singleVitamin:ProductID',
            'views':{
                "header":{
                    "templateUrl": "templates/header.html",
                    controller: [ '$scope' , 'CartService' , 'langs' , function ($scope, CartService , langs ){
                        $scope.langs = langs;
                        $scope.cart = CartService.getCart();

                    } ]
                },
                "content": {
                    'templateUrl': "templates/singleVitamin/singleVitamin.html",
                    controller: ['$scope' ,  'product', 'CartService' , function ($scope , product, CartService){

                        let cart = CartService.getCart();

                        $scope.product = (function(){

                            for ( let i = 0 ; i < cart.length ; i++  ){

                                if(cart[i].id===product.ProductID){
                                    product.isInCart = true;
                                    return product;
                                }//if

                            }//for i
                            return product;
                        })();

                        $scope.AddProduct = function (){

                            $scope.product.isInCart = true;

                            let count = document.querySelector('#countVitamin').value;
                            $scope.product.amount = count;
                            CartService.addProduct($scope.product);


                        };

                    }]
                },
                "footer": {
                    'templateUrl': "templates/footer.html",
                }
            },


            'resolve': {

                'product': [ 'ProductService', '$stateParams', function (ProductService,$stateParams){
                    return ProductService.getSingleProduct($stateParams.ProductID);
                } ],
                'langs': [ 'LocaleService' , function ( LocaleService ){
                    return LocaleService.getLangs();
                }  ]

            }
        });





    } ] );

app.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

        }
    ]);
