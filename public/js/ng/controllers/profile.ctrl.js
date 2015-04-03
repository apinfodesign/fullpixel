angular
    .module('pullPix')
    .controller('ProfileCtrl',function($scope, ImgMetaSvc, $routeParams) {
        $scope.userName = $routeParams.userName;

        ImgMetaSvc.fetch($scope.userName)
            .success(function(imgmetas){
               $scope.imgmetas = imgmetas;
                $scope.loadingIsDone = true;
                console.log('Pro ctrl ' +  imgmetas);
            });

    });

