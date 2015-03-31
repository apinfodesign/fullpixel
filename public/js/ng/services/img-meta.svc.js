angular.module('pullPix')
    .service('ImgMetaSvc', function($http){
        this.fetch = function(){
            return $http.get('/img-meta');
        };
        this.create = function(imgmeta){
            return $http.post('/img-meta', imgmeta);
        }
    });