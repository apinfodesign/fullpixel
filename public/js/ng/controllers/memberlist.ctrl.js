angular.module('pullPix')
    .controller('MemberListCtrl', function($rootScope, MemberListSvc){
        MemberListSvc.fetch()
            .success(function(users){
                $rootScope.members = users;
            });
    });