angular.module('pullPix')
    .config(function ($routeProvider){
        $routeProvider
            .when('/',         {controller: 'ListCtrl', templateUrl: '/templates/posts.html'})
            .when('/register', {controller: 'RegisterCtrl', templateUrl: '/templates/register.html'})
            .when('/login',    {controller: 'LoginCtrl', templateUrl: '/templates/login.html'})
            .when('/upload', {controller: 'UploadCtrl', templateUrl: '/templates/upload.html'});
    });