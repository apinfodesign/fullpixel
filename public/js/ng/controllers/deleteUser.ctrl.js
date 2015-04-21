angular.module('pullPix')
    .controller('deleteUserCtrl',  
        function($http, $scope){
 		//delete functionality
        $scope.UserDelete = function(username){
            $http.delete('/users')
            .success(function(data) {
                console.log('success');
                $scope.username = data;
            })
            .error(function(err) {
                console.log('Error: ' + data);
                $scope.username = err;
            });
         };
    });
