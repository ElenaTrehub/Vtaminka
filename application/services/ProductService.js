"use strict";

export default class ProductService{

    constructor(
        $http ,
        HOST ,
        GET_PRODUCTS
    ){

        this._$http = $http;
        this._HOST = HOST;
        this._GET_PRODUCTS = GET_PRODUCTS;
    }

    async getProducts(){

        let response = await this._$http.get( `${this._HOST}${this._GET_PRODUCTS}` );

        let products = response.data;

        products.forEach( p => {
            p.amount = 1;
        } );

        return products;

    }

    async getSingleProduct(productID){

        let response = await this._$http.get( `${this._HOST}${this._GET_PRODUCTS}` );

        let products = response.data;


        for ( let i = 0 ; i < products.length ; i++  ) {

            if(products[i].ProductID === productID){
                products[i].amount = 1;
                return products[i];
            }//if

        }//for


    }//getSingleProduct

}