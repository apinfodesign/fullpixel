angular
    .module('pullPix')
    .controller('ProfileCtrl',function($scope, ImgMetaSvc, $routeParams) {
        $scope.userName = $routeParams.userName;

        ImgMetaSvc.fetch($scope.userName)
            .success(function(imgmetas){
              $scope.imgmetas = imgmetas;
            });
                var imgArrays = [];
              //  console.log('before ' + imgArrays)
                imgmetas.forEach(function(el){
                    imgArrays.push(el);
                 //   console.log(el);
                  //  console.log('during ' + imgArrays);
                });
               // console.log('After ' + $scope.imgArrays);
        $scope.imgArrays = imgArrays;
    });

