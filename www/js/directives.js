/**
 * Created by zhuzhengwei on 15-6-28.
 */
(function(angular) {
    var app = angular.module("starter.directives",["ionic"]);
    app.directive('login',['$ionicModal',function($ionicModal){
        var link = function(scope, element, attr){
            element.on('click',function(){
                $ionicModal.fromTemplateUrl('templates/login.html', {
                    scope: scope
                })
                    .then(function(modal) {
                        scope.modal = modal;
                        scope.modal.show();
                    });
            });
        };
        return {
            restrict: 'AC',
            link: link
        };
    }]);
})(angular);