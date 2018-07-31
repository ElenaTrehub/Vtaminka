"use strict";


export default  function CartDirective( ){

    return {

        restrict: 'A',
        scope: {
            product: '='
        },
        templateUrl: 'templates/directives/cart-directive.html',
        controller: [ '$scope'  , function ( $scope ){
            console.log($scope.product.amount);
            $scope.count = $scope.product.amount;
            $scope.productTotalSum = $scope.count * $scope.product.ProductPrice;





        } ],
        link: function ( $scope , element ){



        }
    }

}