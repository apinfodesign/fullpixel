<<<<<<< HEAD
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
    .factory('CurrentUser', function(){
        var currentuser = {
            'userid' : 666
        }
        return currentuser;
    });
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
    .service('ListSvc', ["$http", function($http){
       this.fetch = function(){
            return $http.get('http://localhost:3000/api/posts');
       };
        this.create = function(post){
            return $http.post('http://localhost:3000/api/posts', post);
        };
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
  }
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



angular.module('pullPix')
    .service('ImgMetaSvc', ["$http", function($http){
        this.fetch = function(){
            return $http.get('/img-meta');
        };
        this.create = function(imgmeta){
            return $http.post('/img-meta', imgmeta);
        }
    }]);
=======
angular.module("pullPix",["ngRoute","angularFileUpload"]),angular.module("pullPix").controller("ApplicationCtrl",["$scope",function(t){t.$on("login",function(e,l){t.currentUser=l})}]),angular.module("pullPix").controller("ImgMetaCtrl",["$scope","ImgMetaSvc",function(t,e){t.ImgUpdate=function(t){t&&e.create({title:t.title,caption:t.caption,tags:t.tags,camera:t.camera,shutter:t.shutter,aperture:t.aperture,iso:t.iso,date:t.date}).success(function(e){console.table(e),t=null})}}]),angular.module("pullPix").controller("ListCtrl",["$scope","ListSvc",function(t,e){t.ListAdd=function(){t.listBody&&e.create({body:t.listBody}).success(function(e){t.posts.unshift(e),t.listBody=null})},e.fetch().success(function(e){t.posts=e})}]),angular.module("pullPix").service("ListSvc",["$http",function(t){this.fetch=function(){return t.get("http://localhost:3000/api/posts")},this.create=function(e){return t.post("http://localhost:3000/api/posts",e)}}]),angular.module("pullPix").controller("LoginCtrl",["$scope","$location","UserSvc",function(t,e,l){t.login=function(o,n){l.login(o,n).then(function(l){t.$emit("login",l.data),e.path("/upload-page")})}}]),angular.module("pullPix").controller("RegisterCtrl",["$scope","UserSvc","$location",function(t,e,l){t.register=function(o,n){e.register(o,n).then(function(e){t.$emit("login",e),l.path("/")})}}]),angular.module("pullPix").config(["$routeProvider",function(t){t.when("/",{controller:"ListCtrl",templateUrl:"/partials/posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"/partials/register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"/partials/login.html"}).when("/imagemeta",{controller:"ImgMetaCtrl",templateUrl:"/partials/img-meta.html"}).when("/upload",{controller:"UploadCtrl",templateUrl:"/templates/upload.html"}).when("/splash",{controller:"RegisterCtrl",templateUrl:"/partials/splash-page.html"}).when("/photo",{controller:"ImgMetaCtrl",templateUrl:"/partials/photo-page.html"}).when("/profile",{controller:"",templateUrl:"/partials/profile-page.html"}).when("/photo-map",{controller:"UploadCtrl",templateUrl:"/partials/map-page.html"}).when("/upload-page",{controller:"UploadCtrl",templateUrl:"/partials/upload-page.html"})}]),angular.module("pullPix").controller("UploadCtrl",["$scope","$upload",function(t,e){function l(t,e){var l,o=1,n=t.split(","),r=n[0].split("/"),a=r[0]/r[1],i=n[1].split("/"),s=i[0]/i[1],u=n[2].split("/"),c=u[0]/u[1];return("S"===e||"W"===e)&&(o=-1),l=o*(Math.abs(a)+s/60+c/3600)}t.onFileSelect=function(o){t.upload=e.upload({url:"/api/user/upload",method:"POST",data:{myObj:t.myModelObj},file:o}).progress(function(t){console.log(t.loaded+" is loaded"),console.log(t.total+" is total "),console.log("percent: "+parseInt(100*t.loaded/t.total)),console.log(o)}).success(function(e){console.log("success fileout");var n=e["Profile-EXIF"]["GPS Latitude"],r=e["Profile-EXIF"]["GPS Latitude Ref"],a=e["Profile-EXIF"]["GPS Longitude"],i=e["Profile-EXIF"]["GPS Longitude Ref"];t.lat=l(n,r),t.lon=l(a,i),t.fileout=o[0].name})}}]),angular.module("pullPix").service("UserSvc",["$http","$window",function(t,e){var l=this;l.getUser=function(){return t.get("/users").then(function(t){return t.data})},l.login=function(o,n){return t.post("/sessions",{username:o,password:n}).then(function(o){return console.log("Res data "+o.data),e.localStorage.setItem("access_token",o.data),l.token=o.data,t.defaults.headers.common["X-Auth"]=o.data,l.getUser()})},l.register=function(e,o){return t.post("/users",{username:e,password:o}).then(function(){return l.login(e,o)})}}]),angular.module("pullPix").service("ImgMetaSvc",["$http",function(t){this.fetch=function(){return t.get("/img-meta")},this.create=function(e){return t.post("/img-meta",e)}}]);
>>>>>>> miles
