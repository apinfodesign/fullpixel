angular
    .module('PullPix')
    .factory('ProfileSvc', function($http){
        this.fetch = function(username){
            return $http.get('/')
        }
    });

/// use image meta service????
