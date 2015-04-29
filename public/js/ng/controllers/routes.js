angular.module('pullPix')
    .config(function ($routeProvider){
        $routeProvider
            .when('/',           {controller: 'ModalDemoCtrl',   templateUrl: '/partials/splash-page.html'})
            .when('/upload',     {controller: 'UploadCtrl', controllerAs: 'vm', templateUrl: '/partials/upload-page.html'})
            .when('/photo',      {controller: 'ImgMetaCtrl', templateUrl: '/partials/photo-page.html'}) 
            .when('/photo-map',  {controller: '',            templateUrl: '/partials/map-page.html'})
            .when('/404', {controller: '',            templateUrl: '/partials/404.html'})
            .when('/members',    {controller: 'MemberListCtrl',            templateUrl: '/partials/members.html'})
            .when('/about',      {controller: 'AboutInfoCtrl',    templateUrl: '/partials/about.html'})
            .when('/publicUserAbout',{controller: 'MemberListCtrl',    templateUrl: '/partials/publicUserAbout.html'})
            .when('/info',       {controller: '',    templateUrl: '/partials/info.html'})
            .when('/:userName',  {controller: 'ProfileCtrl',  templateUrl: '/partials/profile-page.html'});
     });


