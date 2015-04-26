angular.module('pullPix')
    .service('MemberListSvc', function($http){
        this.fetch = function(){
            return $http.get('https://serene-temple-9683.herokuapp.com/member');
        }
    });