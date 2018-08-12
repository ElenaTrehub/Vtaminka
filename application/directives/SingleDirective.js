"use strict";


export default  function SingleDirective( ){

    return {

        restrict: 'A',
        scope: {
            product: '='
        },
        templateUrl: 'templates/directives/single-directive.html',
        controller: [ '$scope', function ( $scope ){



                $scope.DescriptionButton = function(){
                    document.querySelector('#home').innerHTML = $scope.product.ProductDescription;
                };

                $scope.CompositionButton = function(){
                    document.querySelector('#home').innerHTML = $scope.product.ProductComposition;
                };
                $scope.InfoButton = function(){
                    document.querySelector('#home').innerHTML = $scope.product.ProductInfo;
                };




        }],
        link:function() {


        }
    }
}