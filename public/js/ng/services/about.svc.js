angular.module('pullPix')
    .service('AboutInfoSvc', function($http){
		this.fetch = function(currentUser){
            return $http.get('/users/'+ currentUser.username);
        };
        this.update = function(currentUser, userdata){
            return $http.put('/users/' + currentUser.username, userdata);
        }
    });