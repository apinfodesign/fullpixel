angular.module('pullPix')
    .service('AboutInfoSvc', function($http, $routeParams){
		return{
		    getUsers: function(callback){
		        $http.get('/users'+ $routeParams.userdata).success(callback);
		    },
		    updateUser: function(userdata, callback){
		        $http.post('/updateUser', userdata);
		    }
	};
});