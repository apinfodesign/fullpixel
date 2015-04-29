angular.module('pullPix')
    .controller('deleteUserCtrl',  
        function($scope, $http, $location) {
 		
        $scope.UserDelete = function(currentUser){
            $http.delete('/users/' + currentUser.username)
            .success(function() {
                console.log('success');
                $location.path('/members');   
            })
            .error(function(err) {
                console.log('Error: ' + data);
                //$scope.currentUser = err;
            })
         };
    });
