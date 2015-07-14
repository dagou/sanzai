/**
 * 图片延迟加载
 * Created by zhuzhengwei on 15-3-6.
 */

(function(angular){
    var app = angular.module('imgLazyLoad',['ionic']);
    //绑定scroll事件
    app.directive('lazyscroll',['$rootScope','$timeout',function($rootScope,$timeout){
        var link = function(scope, element){
            var scrollTimeoutId = 0;
            scope.invoke = function () {
                $rootScope.$broadcast('lazyScrollEvent');
            };
            element.bind('scroll',function(){
                $timeout.cancel(scrollTimeoutId);
                scrollTimeoutId = $timeout(scope.invoke, 0);
            });
        };
        return {
            restrict:'A',
            link:link
        };
    }]);

    //延迟加载图片
    app.directive('imglazysrc',['$document','$timeout',function($document, $timeout){
        var link = function(scope,ele,attr){
            function isInView(){
                var clientHeight = $document[0].documentElement.clientHeight;
                var clientWidth = $document[0].documentElement.clientWidth;
                var imageRect = ele[0].getBoundingClientRect();
                return  (imageRect.top >= 0 && imageRect.bottom <= clientHeight) && (imageRect.left >= 0 && imageRect.right <= clientWidth);
            };

            var deregistration = scope.$on('lazyScrollEvent', function () {

                    if (isInView()) {
                        ele[0].src = attr.imglazysrc; // set src attribute on element (it will load image)
                        deregistration();
                    }
                }
            );

            ele.on('$destroy', function () {
                deregistration();
            });
            $timeout(function() {
                if (isInView()) {
                    ele[0].src = attr.imglazysrc; // set src attribute on element (it will load image)
                    deregistration();
                }
            }, 500);
        };


        return {
          restrict:'A',
            link:link,
            scope: '='
        };
    }]);

})(angular);