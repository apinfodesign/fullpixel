//Single controller page
//Confused how to export the separate controllers 
//will want a separate controller per page

var picControllers = angular.module('picControllers', ['ngCookies']);  //[] = what angular modules to request

var sessionLength = 300000;

picControllers.controller('LoginController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies) {
	if (Date.now() - $cookies.timeStamp < sessionLength) {
		$location.path('/edit'); //send you directly to your page if cookie not expired
	} else {
		$cookies.timeStamp = 0;
		$cookies.user = null;
		$scope.message = 'Please Sign In';
		$scope.username = '';
		$scope.password = '';

		// Simple POST request example (passing data) :
		this.login = function () {
			$http.post('/api/login', {username: $scope.username, password: $scope.password}).
				success(function(data, status, headers, config) {
					if (data.loggedIn) {
						$cookies.timeStamp = Date.now();
						$cookies.user = $scope.username;
						$location.path('/personal_edit');  //if cookie then got to your page
					} else {
						$scope.message = 'Login unsuccessful.  Username and password pair not found.';
						$scope.password = '';
					}
				}).
				error(function(data, status, headers, config) {
					console.log(data);
					$scope.message = 'Login unsuccessful.  Username and password pair not found.  Please register.';
					$scope.password = '';
				});
		}

		this.direct = function (){
			$location.path('/user');
		}
	}
}]);

picControllers.controller('RegistrationController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.message = 'Please Register';
	$scope.username = '';
	$scope.password = '';
	$scope.email = '';
	// Simple POST request example (passing data) :
	this.register = function () {
		if ($scope.username && $scope.password && $scope.email) {
			$http.post('/api/register', {username: $scope.username, password: $scope.password, email: $scope.email}).
				success(function(data, status, headers, config) {
					if (data.added) {
						$scope.message = 'Registration successful';
						$scope.username = '';
						$scope.password = '';
						$scope.email = '';
						$location.path('/personal_edit');
					} else {
						$scope.message = 'Registration unsuccessful, username already exists.';
						$scope.username = '';
						$scope.password = '';
						$scope.email = '';
					}
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		} else {
			$scope.message = 'Registration unsuccessful.  Please complete all fields.';
		}
	}
	
	this.direct = function (){
		$location.path('/home');  //go back to the login page
	}
	
}]);

