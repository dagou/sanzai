angular.module('starter.controllers', [])
    .controller('TabCtrl',function($scope,$ionicModal,Users) {
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.login = function(){
            $scope.modal.show();
        }
        $scope.closeModal=function(){
            $scope.modal.hide();
        };
        $scope.username="xuanyan";
        $scope.pass = "12345678";
        $scope.execLogin= function(){
            Users.login($scope.username, $scope.pass, function (data) {
                console.log(data);
            },function(data){
                console.log(data);
            });
        };
    })
.controller('DashCtrl', function($scope) {
        $scope.doRefresh=function(){
            $scope.$broadcast('scroll.refreshComplete');
        };
    })
    .controller('GoodsCtrl', function($scope,$stateParams) {
        var cateId = $stateParams.cateId;
    })
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
}).controller('CatesCtrl',function($scope,Cates){
        $scope.cates = [];
        Cates.all(function(data){
            $scope.cates = data;
        });

    })

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$ionicModal) {

});
