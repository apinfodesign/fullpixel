angular.module('pullPix')
    .controller('MemberListCtrl', function($scope, MemberListSvc){
        MemberListSvc.fetch()
            .success(function(users){
                $scope.members = users;
                console.log($scope.members + 'hello');
            });
    });