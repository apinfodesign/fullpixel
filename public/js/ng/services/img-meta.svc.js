angular.module('pullPix')
    .service('ImgMetaSvc', function($http){
        this.fetch = function(username){
            return $http.get('/img-meta/' + username);
        };
        this.create = function(imgmeta){
            return $http.post('/img-meta', imgmeta);
        }
    });
