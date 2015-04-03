angular.module('pullPix')
.controller('SignupCollapseCtrl', function ($scope, UserSvc, $rootScope, $location) {
  $scope.isCollapsed = true;

  $scope.register = function (username, password){
            UserSvc.register(username, password)
                .then(function(user){
                    console.log('WORK');
                    $rootScope.$emit('login', user);
                    $location.path('/upload');
            });
  };
});