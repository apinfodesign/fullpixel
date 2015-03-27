angular.module('pullPix',[
    'ngRoute',
    'angularFileUpload'
]);
angular.module('pullPix')
    .controller('ApplicationCtrl', ["$scope", function($scope){
        $scope.$on('login', function(_, user){
            $scope.currentUser = user;
    });
}]);

angular.module('pullPix')
    .controller('ImgMetaCtrl', ["$scope", "ImgMetaSvc", "CurrentUser", function($scope, ImgMetaSvc, CurrentUser){
        $scope.ImgUpdate = function(metadata){
            if(metadata){
                ImgMetaSvc.create({
                    userid          : metadata.userid,
                    path            : metadata.path,
                    title           : metadata.title,
                    caption         : metadata.caption,
                    tags            : metadata.tags,
                    camera          : metadata.camera,
                    shutter         : metadata.shutter,
                    aperture        : metadata.aperture,
                    iso             : metadata.iso,
                    date            : metadata.date
                })
                    .success(function(imgmeta){
                       console.table(imgmeta);
                        metadata = null;
                    });
            }

        };
    }]);
angular.module('pullPix')
    .controller('ListCtrl',["ListSvc", function(ListSvc){
        var vm = this;
   vm.ListAdd = function () {
      if (vm.listBody) {
          ListSvc.create({
              body: vm.listBody
          })
              .success(function(post){
                  vm.posts.unshift(post);
                  vm.listBody = null;
              });
      }
   }
    ListSvc.fetch()
        .success(function (posts) {
           vm.posts = posts
        });

}]);
angular.module('pullPix')
    .controller('LoginCtrl', ["$scope", "UserSvc", "$location", function($scope, UserSvc, $location){
        var vm = this;
        vm.login = function(username, password){
            UserSvc.login(username, password)
                .then(function(user){
                    $scope.$emit('login', user);
                    console.log('User ' + user);
                    $location.path('/');
                });
        };
    }]);

angular.module('pullPix')
    .controller('RegisterCtrl', ["$scope", "UserSvc", "$location", function($scope, UserSvc, $location){
        var vm = this;
        vm.register = function (username, password){
            UserSvc.register(username, password)
                .then(function(user){
                    $scope.$emit('login', user);
                    $location.path('/');
            });
        };
    }]);

angular.module('pullPix')
    .config(["$routeProvider", function ($routeProvider){
        $routeProvider
            .when('/',         {controller: 'ListCtrl', templateUrl: '/partials/posts.html'})
            .when('/register', {controller: 'RegisterCtrl', templateUrl: '/partials/register.html'})
            .when('/login',    {controller: 'LoginCtrl', templateUrl: '/partials/login.html'})
            .when('/imagemeta',{controller: 'ImgMetaCtrl', templateUrl: '/partials/img-meta.html'})
            .when('/upload',   {controller: 'UploadCtrl', templateUrl: '/templates/upload.html'})
            .when('/splash',   {controller: ['RegisterCtrl', 'LoginCtrl'], templateUrl: '/partials/splash-page.html'})
            .when('/photo',    {controller: 'ImgMetaCtrl', templateUrl: '/partials/photo-page.html'})
            .when('/profile',  {controller: '', templateUrl: '/partials/profile-page.html'}) 
            .when('/photo-map',{controller: '', templateUrl: '/partials/map-page.html'})
            .when('/upload-page',{controller: 'UploadCtrl', templateUrl: '/partials/upload-page.html'})
            .when('/photo-map',{controller: '', templateUrl: '/partials/map-page.html'}); 
     }]);



angular.module('pullPix')

  .controller('UploadCtrl', ["$scope", "$upload", "ImgMetaSvc", "CurrentUser", function($scope, $upload, ImgMetaSvc, CurrentUser) {
 
   $scope.onFileSelect = function(files) {


      $scope.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        data: {myObj: $scope.myModelObj},
        file: files  //number files uploaded

      }).progress(function(evt) {


      }).success(function(data, status, headers, config) {


        $scope.fileout = files[0].name;
        $scope.currentuser = CurrentUser.userid;
    });
  };
  $scope.ImgUpdate = function(metadata){
            if(metadata){
                ImgMetaSvc.create({
                    userid          : metadata.userid,
                    path            : metadata.path,
                    title           : metadata.title,
                    caption         : metadata.caption,
                    tags            : metadata.tags,
                    camera          : metadata.camera,
                    shutter         : metadata.shutter,
                    aperture        : metadata.aperture,
                    iso             : metadata.iso,
                    date            : metadata.date
                })
                    .success(function(imgmeta){
                        console.table(imgmeta);

                        metadata = null;
                    });
            }

  };
}]);



angular.module('pullPix')
    .factory('CurrentUser', function(){
        var currentuser = {
            'userid' : 666
        }
        return currentuser;
    });
angular.module('pullPix')
    .service('ImgMetaSvc', ["$http", function($http){
        this.fetch = function(){
            return $http.get('/img-meta');
        };
        this.create = function(imgmeta){
            return $http.post('/img-meta', imgmeta);
        }
    }]);
angular.module('pullPix')
    .service('ListSvc', ["$http", function($http){
       this.fetch = function(){
            return $http.get('http://localhost:3000/api/posts');
       };
        this.create = function(post){
            return $http.post('http://localhost:3000/api/posts', post);
        };
    }]);






angular.module('pullPix')
    .service('UserSvc', ["$http", "$window", function ($http, $window) {
        var svc = this;
        svc.getUser = function () {
            return $http.get('/users')
                .then(function (response) {
                    return response.data;
                });
        };
        svc.login = function (username, password) {
            return $http.post('/sessions', {
                username: username, password: password
            }).then(function (response) {
                console.log("Res data " + response.data);
                $window.localStorage.setItem('access_token', response.data);
                svc.token = response.data
                $http.defaults.headers.common['X-Auth'] = response.data;
                return svc.getUser();
            });
        };
        svc.register = function (username, password) {
            return $http.post('/users', {
                username: username, password: password
            }).then(function () {
                return svc.login(username, password);
            });
        };
    }]);
