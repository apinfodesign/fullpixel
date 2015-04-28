angular.module('pullPix')
    .controller('deleteUserCtrl',  
        function($scope, $http) {
 		
        $scope.UserDelete = function(currentUser){
            return $http.delete('/users/' + currentUser.username)
            .success(function(data) {
                console.log('success');
                //$scope.currentUser = data;
            })
            .error(function(err) {
                console.log('Error: ' + data);
                //$scope.currentUser = err;
            });
         };
    });
