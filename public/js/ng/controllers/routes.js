angular.module('pullPix')
    .config(function ($routeProvider){
        $routeProvider
            .when('/',         {controller: 'ListCtrl', templateUrl: '/partials/posts.html'})
            .when('/register', {controller: 'RegisterCtrl', templateUrl: '/partials/register.html'})
            .when('/login',    {controller: 'LoginCtrl', templateUrl: '/partials/login.html'})
            .when('/imagemeta',{controller: 'ImgMetaCtrl', templateUrl: '/partials/img-meta.html'})
            .when('/upload',   {controller: 'UploadCtrl', templateUrl: '/templates/upload.html'})
            .when('/splash',   {controller: 'RegisterCtrl', templateUrl: '/partials/splash-page.html'})
            .when('/photo',    {controller: 'ImgMetaCtrl', templateUrl: '/partials/photo-page.html'})
            .when('/profile',  {controller: '', templateUrl: '/partials/profile-page.html'}) 
            .when('/photo-map',{controller: 'UploadCtrl', templateUrl: '/partials/map-page.html'})
            .when('/upload-page',{controller: 'UploadCtrl', templateUrl: '/partials/upload-page.html'})
           ; 
     });


