angular.module('pullPix')
    .service('ListSvc', function($http){
       this.fetch = function(){
            return $http.get('https://serene-temple-9683.herokuapp.com/api/posts');
       };
        this.create = function(post){
            return $http.post('https://serene-temple-9683.herokuapp.com/api/posts', post);
        };
    });

