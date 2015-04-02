angular
    .module('pullPix')
    .controller('ProfileCtrl',function($scope, ImgMetaSvc, $routeParams, $rootScope) {
        $scope.userName = $routeParams.userName;

        ImgMetaSvc.fetch($scope.userName)
            .success(function(imgmetas){
               $rootScope.imgmetas = imgmetas;
                console.log(imgmetas);
            });

    });

