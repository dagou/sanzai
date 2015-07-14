var baseUrl = "http://localhost/ecshop/ecmobile/?url=";
angular.module('starter.services', [])

.factory('Cates',function($http){

        var all = function(callback){
            $http.get(baseUrl + '/home/category', {withCredentials: true})
                .success(function (data) {
                    if(callback)callback(data.data)
                });
        };
        return {
            all:all
        };
    })
    .factory('Users',function($http){
        var user = null;

        var login = function(username,pass,successFunc,errFunc){
            var json = {name:username,password:pass};
            $http({
                method: 'POST',
                withCredentials: true,
                data: json,
                headers:{'Content-type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                url: baseUrl+ '/user/signin'
            }).success(function (result) {
                if(result.status.succeed == 0){
                    if(errFunc)errFunc(result.status.error_desc);
                }else{
                    if(successFunc)successFunc(result.data);
                }

            }).error(function (result) {
                if(errFunc)errFunc(result);
            });
        };
        return{
            login:login,
            user:user
        };
    })
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
