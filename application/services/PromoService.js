"use strict";

export default class PromoService{

    constructor(
        $http ,
        HOST ,
        GET_PROMO
    ){

        this._$http = $http;
        this._HOST = HOST;
        this._GET_PROMO = GET_PROMO;
    }

    async getPromo(){

        let response = await this._$http.get( `${this._HOST}${this._GET_PROMO}` );

        let promo = response.data;


        return promo;

    }



}