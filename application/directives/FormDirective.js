"use strict";


export default  function FormDirective( ){

    return {

        restrict: 'A',
        scope: {
            name: '=',
            email:'=',
            phone:'='
        },
        templateUrl: 'templates/directives/form-directive.html',
        controller: [ '$scope', function ( $scope  ){

            $scope.name = "";
            $scope.email = "";
            $scope.phone = "";

            $scope.nameReject = function(){


                let name_regexp = /^[a-zа-яё]+(?: [a-zа-яё]+)?$/i;
                if (!name_regexp.test($scope.name)) {
                    document.querySelector('#correctName').style.display="block";
                }//if
                else{
                    document.querySelector('#correctName').style.display="none";
                }

                return false;
            };

            $scope.emailReject = function(){


                let email_regexp = /^([A-Za-z0-9_\-\.]{2,18})+\@([A-Za-z0-9_\-\.]{2,8})+\.([A-Za-z]{2,4})$/;
                if (!email_regexp.test($scope.email)) {
                    document.querySelector('#correctEmail').style.display="block";
                }//if
                else{
                    document.querySelector('#correctEmail').style.display="none";
                }

                return false;
            };

            $scope.phoneReject = function(){


                let phone_regexp = /^\+?([0-9]{12})$/;
                if (!phone_regexp.test($scope.phone)) {
                    document.querySelector('#correctPhone').style.display="block";
                }//if
                else{
                    document.querySelector('#correctPhone').style.display="none";
                }

                return false;
            };
        } ]

    }

}