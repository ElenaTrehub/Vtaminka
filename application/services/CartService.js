"use strict";


export default class CartService{


    constructor(localStorageService, ProductService){

        if(localStorageService.get('cart')){
            this.cart = localStorageService.get('cart');
        }//if
        else{
            this.cart = [];
        }//else

        this.localStorageService = localStorageService;
        this._productService = ProductService;

    }//constructor

    getCart(){
        return this.cart;
    }//getCart

    addProduct( product ){


        let exist = this.cart.some(p=>{
            return p.id === product.ProductID;
        });



        if(!exist){
            this.cart.push(this._getSimpleProduct( product));
        }//if
        else{

            for ( let i = 0 ; i < this.cart.length ;  i++ ){

                let p = this.cart[i];

                if(p.id === product.ProductID){

                    p.amount=product.amount;

                    break;

                }//if

            }//for i


        }//else


        this.localStorageService.set('cart', this.cart);

    }//addProduct

    _getSimpleProduct( product ){

        return {
            'id' : product.ProductID,
            'amount' : product.amount || 1,
            'name' : product.ProductTitle,
        };

    }//_getSimpleProduct

    clearCart(){

        this.localStorageService.clearAll();
        this.cart.length = 0;

    }// clearCart

    OnItemRemove ( callback ){
        this._removeCallback = callback;
    }

    removeProduct( index ){

        this.cart.splice( index , 1 );

        if( this._removeCallback ){
            this._removeCallback(index);
        }//if

        this.localStorageService.set( 'cart' , this.cart );

    }//removePhone

    async getFullProducts () {

        let productsCart = [];
        let products = await this._productService.getProducts();

        for ( let i = 0 ; i < this.cart.length ; i++  ){

            for(let j=0; j<products.length;j++){

                if(this.cart[i].id===products[j].ProductID){
                    let pr = products[j];
                    pr.amount = this.cart[i].amount;
                    productsCart.push( pr );
                }//if

            }//for j


        }//for i

        return productsCart;

    }//getFullProducts





}