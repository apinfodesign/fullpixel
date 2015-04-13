angular.module('pullPix')
    .service('AboutInfoSvc', function($http){
        this.fetch = function(username){
            return $http.get('/users');
        };
        this.create = function(imgmeta){
            return $http.post('/users', currentUser);
        }
    });