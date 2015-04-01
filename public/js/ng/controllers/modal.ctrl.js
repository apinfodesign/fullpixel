angular.module('pullPix')
.controller('ModalDemoCtrl', function ($scope, $modal) {


  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });
  };
});




// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('pullPix')
.controller('ModalInstanceCtrl', function ($scope, UserSvc, $location, $modalInstance) {

  $scope.register = function (username, password){
            UserSvc.register(username, password)
                .then(function(user){
                    console.log('WORK');
                    $scope.$emit('login', user);
                    $location.path('/upload');
            });
  };

  $scope.login = function(username, password){
            UserSvc.login(username, password)
                .then(function(user){
                    $scope.$emit('login', user);
                    console.log('User ' + user);
                    $location.path('/upload');
              });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});