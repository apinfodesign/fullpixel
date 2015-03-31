angular
    .module('pullPix')
    .controller('ProfileCtrl',function($scope, ImgMetaSvc) {

        ImgMetaSvc.fetch()
            .success(function(imgmetas){
                $scope.imgmetas = imgmetas
            });

    });

