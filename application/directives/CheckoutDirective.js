"use strict";


export default  function CheckoutDirective( ){

    return {

        restrict: 'A',
        scope: {
            products: '=',
            promos:'='
        },
        templateUrl: 'templates/directives/checkout-directive.html',
        controller: [ '$scope', 'CartService', function ( $scope , CartService ){

            let delivery = 15;
            document.querySelector('#Delivery').innerHTML = delivery;

            document.querySelector('#totalCountVitamin').innerHTML = CartService._getCountCartVitamin();

            document.querySelector('#totalSumVitamin').innerHTML = CartService._getTotalSumm() + delivery;

            $scope.PromoApplay = function(){

                let promo = document.querySelector('#PromoCode').value;


                let exist = $scope.promos.some(p=>{
                    return p.code === promo;
                });

                if(!exist){
                    alert("PromoCode is not correct!");
                }//if
                else {

                    let sale = 1;

                    for ( let i = 0 ; i < $scope.promos.length ;  i++ ) {

                        if($scope.promos[i].code===promo){

                            sale = +$scope.promos[i].discount/100;

                        }//if

                    }//for

                    let totalSum = document.querySelector('#totalSumVitamin').innerHTML;

                    let newTotalSum = +totalSum - (+totalSum-delivery)*sale;

                    document.querySelector('#totalSumVitamin').innerHTML = newTotalSum;

                }//else
            };

        } ]

    }

}