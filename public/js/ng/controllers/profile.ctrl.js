angular
    .module('pullPix')
    .controller('ProfileCtrl',function($scope, ImgMetaSvc, $routeParams) {
        $scope.userName = $routeParams.userName;

        ImgMetaSvc.fetch()
            .success(function(imgmetas){
                $scope.imgmetas = imgmetas
            });

    });

