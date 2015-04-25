angular.module('pullPix')
    .service('MemberListSvc', function($http){
        this.fetch = function(){
            return $http.get('https://localhost:3000/member');
        }
    });