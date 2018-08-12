"use strict";

export default function DescriptionFilter(){

    return function ( str , maxLength){

        return str.length < maxLength ? str : `${str.substring(0 , maxLength)}...`;

    }

}