"use strict";


export default function LangsOptionDirective( ){

    return {

        restrict: 'A',
        template: '',
        scope: {
            'langs': '='
        },
        controller: [ '$scope' , function ( $scope ){

            let cl = $scope.$parent._getLang();




            let elementMen =  document.querySelector('#men');
            let elementWomen =  document.querySelector('#women');
            let elementChildren =  document.querySelector('#children');
            let elementSport =  document.querySelector('#sport');

            if(cl==="EN"){

                $scope.currentLang = $scope.langs[1];

                elementMen.setAttribute('data', "MENS");
                elementWomen.setAttribute('data', "WOMEN");
                elementChildren.setAttribute('data', "CHILDREN");
                elementSport.setAttribute('data', "SPORTS");
                $scope.$parent.updateTranslations( cl );

            }//if

            if(cl==="RU" || cl==="") {

                $scope.currentLang = $scope.langs[0];

                elementMen.setAttribute('data', "МУЖСКИЕ");
                elementWomen.setAttribute('data', "ЖЕНСКИЕ");
                elementChildren.setAttribute('data', "ДЕТСКИЕ");
                elementSport.setAttribute('data', "СПОРТИВНЫЕ");
                $scope.$parent.updateTranslations( "RU" );



            }//if


            $scope.changeLanguage = function ( newLanguage ){

                if(newLanguage==="EN"){

                    elementMen.setAttribute('data', "MENS");
                    elementWomen.setAttribute('data', "WOMEN");
                    elementChildren.setAttribute('data', "CHILDREN");
                    elementSport.setAttribute('data', "SPORTS");



                }//if
                else{
                    elementMen.setAttribute('data', "МУЖСКИЕ");
                    elementWomen.setAttribute('data', "ЖЕНСКИЕ");
                    elementChildren.setAttribute('data', "ДЕТСКИЕ");
                    elementSport.setAttribute('data', "СПОРТИВНЫЕ");


                }
                $scope.$parent.updateTranslations( newLanguage );
            };

        } ],
        link: function ( scope, element, attrs, controller, transcludeFn ){

            let options = '';

            scope.langs.forEach( (lang) => {
                options += `<option value="${lang}" >${lang}</option>`;
            } );

            element.html( options );

            new SelectFx(
                document.querySelector('#langs'),{
                    onChange: scope.changeLanguage
                }
            );

        }//link

    }//LangsListDirective {}

}//LangsListDirective ()