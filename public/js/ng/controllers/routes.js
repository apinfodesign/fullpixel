angular.module('pullPix')
    .config(function ($routeProvider){
        $routeProvider
            .when('/',         {controller: 'ListCtrl', templateUrl: '/partials/posts.html'})
            .when('/register', {controller: 'RegisterCtrl', templateUrl: '/partials/register.html'})
            .when('/login',    {controller: 'LoginCtrl', templateUrl: '/partials/login.html'})
            .when('/imagemeta',{controller: 'ImgMetaCtrl', templateUrl: '/partials/img-meta.html'})
            .when('/upload',   {controller: 'UploadCtrl', templateUrl: '/templates/upload.html'}); 
    });