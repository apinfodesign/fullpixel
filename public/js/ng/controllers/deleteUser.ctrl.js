angular.module('pullPix')
    .controller('deleteUserCtrl',  
        function($http, $scope) {
 		
        $scope.UserDelete = function(currentUser){
            return $http.delete('/users', currentUser)
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
