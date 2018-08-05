"use strict";


export default  function CartDirective( ){

    return {

        restrict: 'A',
        scope: {
            product: '=',
            products: '='
        },
        templateUrl: 'templates/directives/cart-directive.html',
        controller: [ '$scope', 'CartService', function ( $scope , CartService ){

            //$scope.cart = CartService.getCart();

            $scope.count = $scope.product.amount;
            $scope.productTotalSum = $scope.count * $scope.product.ProductPrice;



            $scope.ChangeCount = function (){

                $scope.product.amount = $scope.count;
                $scope.productTotalSum = $scope.count * $scope.product.ProductPrice;
                CartService._changeProduct($scope.product);
                document.querySelector('#totalCountVitamin').innerHTML = CartService._getCountCartVitamin();
                document.querySelector('#totalSumVitamin').innerHTML = CartService._getTotalSumm();
            };

            $scope.RemoveVitamin = function (){

                CartService.removeProduct($scope.product.ProductID);
                document.querySelector('#totalCountVitamin').innerHTML = CartService._getCountCartVitamin();
                document.querySelector('#totalSumVitamin').innerHTML = CartService._getTotalSumm();

                let index = -1;
                for ( let i = 0 ; i < $scope.products.length ; i++  ) {
                    if($scope.products[i].ProductID === $scope.product.ProductID) {
                        index=i;
                    }
                }
                console.log(index);
                $scope.products.splice(index,1);
                console.log($scope.products);
            };

        } ],
        link: function ( $scope , element ){


        }
    }

}