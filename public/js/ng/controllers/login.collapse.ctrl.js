angular.module('pullPix')
.controller('LoginCollapseCtrl', function ($scope, UserSvc, $rootScope, $location) {
  $scope.isCollapsed = true;

  $scope.login = function(username, password){
            UserSvc.login(username, password)
                .then(function(user){
                    $rootScope.$emit('login', user);
                    console.log('User ' + user);
                    $location.path('/upload');
              });
  			};
  		});