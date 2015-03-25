angular.module('pullPix')
    .controller('LoginCtrl', function($scope, UserSvc, $location){
        $scope.login = function(username, password){
            UserSvc.login(username, password)
                .then(function(response){
                    $scope.$emit('login', response.data);
                    $location.path('/upload-page');
                });
        };
    });
