"use strict";

export default class MainController{

    constructor( $scope , LocaleService , $translate ){
        $scope.cLang="";
        $scope.updateTranslations = function ( lang ){
            $translate.use(lang);
            $scope.cLang=lang;
        }
        $scope._getLang=function() {

            return this.cLang;

        }
    }//constructor

}