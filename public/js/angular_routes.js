//Angular routing

//App module in angular for routing on the front end

'use strict';
//ngRoute is a angular module that is needed....picApp is the name of the controller
var picApp = angular.module('picApp', [
  'ngRoute',
  'picControllers'
  ]);


//controllers have not been made for each view and will  thus throw an error
picApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/not_signed_in.html',
        //controller: 'PostController as postCtrl'
      }).
      when('/home', {   //login page
        templateUrl: 'partials/signed_in_home.html',
        controller: 'LoginController as logCtrl'

      }).               //refistration page
      when('/user', {   //will be /user/:username when we get the database working correctly
        templateUrl: 'partials/personal_homepage.html',
        controller: 'RegistrationController as regisCtrl'
      }).
      when('/edit', {  //again will be edit/:username
        templateUrl: 'partials/personal_edit.html',
        controller: 'PostController as postCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
