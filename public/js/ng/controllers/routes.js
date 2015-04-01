angular.module('pullPix')
    .config(function ($routeProvider){
        $routeProvider
            .when('/',           {controller: 'LoginCtrl',   templateUrl: '/partials/splash-page.html'})
            .when('/upload',     {controller: 'UploadCtrl', controllerAs: 'vm', templateUrl: '/partials/upload-page.html'})
            .when('/photo',      {controller: 'ImgMetaCtrl', templateUrl: '/partials/photo-page.html'})
            .when('/:userName',    {controller: 'ProfileCtrl',  templateUrl: '/partials/profile-page.html'})
            .when('/photo-map',  {controller: '',            templateUrl: '/partials/map-page.html'})
            .when('/photo-page',  {controller: '',            templateUrl: '/partials/photo-page.html'})
            .when('/lightbox',  	{controller: 'LightboxCtrl',    templateUrl: '/partials/lightbox.html'});
     });


