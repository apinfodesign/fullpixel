angular.module('pullPix')
    .config(function ($routeProvider){
        $routeProvider
            .when('/',         {controller: 'LoginCtrl',  templateUrl: '/partials/splash-page.html'})
            .when('/register', {controller: 'RegisterCtrl', templateUrl: '/partials/register.html'})
            .when('/login',    {controller: 'LoginCtrl', templateUrl: '/partials/login.html'})
            .when('/upload',   {controller: 'UploadCtrl', templateUrl: '/partials/upload-page.html'})
            .when('/splash',   {controller: 'RegisterCtrl', templateUrl: '/partials/splash-page.html'})
            .when('/photo',    {controller: 'ImgMetaCtrl', templateUrl: '/partials/photo-page.html'})
            .when('/profile',  {controller: '', templateUrl: '/partials/profile-page.html'}) 
            .when('/photo-map',{controller: '', templateUrl: '/partials/map-page.html'}); 
     });
