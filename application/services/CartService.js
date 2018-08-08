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
    }//getTotalSum





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
            'price': product.ProductPrice,
        };

    }//_getSimpleProduct

    _changeProduct(product){

        for ( let i = 0 ; i < this.cart.length ;  i++ ){

            if(this.cart[i].id === product.ProductID){

                this.cart[i].amount = product.amount;

                break;

            }//if

        }//for i
        this.localStorageService.set('cart', this.cart);

    }//  changeProduct

    _getTotalSumm(){
        let Sum = 0;

        for ( let i = 0 ; i < this.cart.length ; i++  ){

            Sum += +this.cart[i].amount * +this.cart[i].price;

        }//for i

        return Sum;


    }//getTotalSum

    _getCountCartVitamin(){

        let con = 0;
        for ( let i = 0 ; i < this.cart.length ; i++  ) {
             con += +this.cart[i].amount;

        }
        return con;

        }//getCountCartVitamin







    clearCart(){

        this.localStorageService.clearAll();
        this.cart.length = 0;

    }// clearCart

    OnItemRemove ( callback ){
        this._removeCallback = callback;
    }

    removeProduct( id ){

        let index = -1;
        for ( let i = 0 ; i < this.cart.length ; i++  ) {
            if(this.cart[i].id === id) {
                index=i;
            }
        }


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