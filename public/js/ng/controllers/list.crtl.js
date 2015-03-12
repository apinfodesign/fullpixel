angular.module('pullPix')
    .controller('ListCtrl',function($scope,ListSvc){
   $scope.ListAdd = function () {
      if ($scope.listBody) {
          ListSvc.create({
              body: $scope.listBody
          })
              .success(function(post){
                  console.log('success');
                  $scope.posts.unshift(post);
                  $scope.listBody = null;
              });
      }
       console.log('JSON fail.');
   }
    ListSvc.fetch()
        .success(function (posts) {
           $scope.posts = posts
        });

});