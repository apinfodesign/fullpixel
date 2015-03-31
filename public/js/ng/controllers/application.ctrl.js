angular.module('pullPix')
    .controller('ApplicationCtrl', function($scope){
        $scope.$on('login', function(_, user){
            $scope.currentUser = user.username;
            console.log('appctrl ' + user.username);
    });
});
