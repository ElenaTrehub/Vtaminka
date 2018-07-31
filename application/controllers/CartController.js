"use strict"

export default class CartController{

    constructor($scope, CartService){

        $scope.cart = CartService.getCart();

        $scope.RemoveItem = function ( index ){
            CartService.removeVitamin( index );

        };

        $scope.ClearCart = function (){

            CartService.clearCart();

        };

    }//constructor



}//CartController