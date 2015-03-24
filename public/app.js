<<<<<<< HEAD
var pullPix = angular.module('pullPix',[
    'ngRoute', 'angularFileUpload'
]);

angular.module('pullPix')
    .controller('ApplicationCtrl', ["$scope", function($scope){
        $scope.$on('login', function(_, user){
            $scope.currentUser = user;
    });
}]);

angular.module('pullPix')
    .controller('ImgMetaCtrl', ["ImgMetaSvc", function(ImgMetaSvc){
        var vm = this;
        vm.ImgUpdate = function(metadata){
            if(metadata){
                ImgMetaSvc.create({
                    userid: metadata.userid,
                    imgpath: metadata.imgpath,
                    imgtitle: metadata.imgtitle,
                    imgdesc: metadata.imgdesc,
                    imgtag: metadata.imgtag
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

pullPix.factory('')

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
            .when('/upload',   {controller: 'UploadCtrl', templateUrl: '/templates/upload.html'}); 
    }]);
angular.module('pullPix')
  .controller('UploadCtrl', ["$upload", function($upload) {
    var vm = this;
   vm.onFileSelect = function(files) {
    //$files: an array of files selected, each file has name, size, and type.
    //for (var i = 0; i < $files.length; i++) {
      var file = files;

      vm.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        data: {myObj: vm.myModelObj},
        file: files,  //number files uploaded

      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        console.log(file);
        //console.log(data + " is data ");

      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        vm.fileout = file[0].name;
        $upload.fileout = file[0].name;

        vm.fileoutSize = file[0].size;
        $upload.fileoutSize = file[0].size;

        vm.fileoutLast = file[0].lastModified;
        $upload.fileoutLast = file[0].lastModified;

        console.log("........");
        console.log("successful upload");

    });
  //  }
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
angular.module("pullPix",["ngRoute","angularFileUpload"]),angular.module("pullPix").controller("ApplicationCtrl",["$scope",function(t){t.$on("login",function(e,l){t.currentUser=l})}]),angular.module("pullPix").controller("ImgMetaCtrl",["$scope","ImgMetaSvc",function(t,e){t.ImgUpdate=function(t){t&&e.create({title:t.title,caption:t.caption,tags:t.tags,camera:t.camera,shutter:t.shutter,aperture:t.aperture,iso:t.iso,date:t.date}).success(function(e){console.table(e),t=null})}}]),angular.module("pullPix").controller("ListCtrl",["$scope","ListSvc",function(t,e){t.ListAdd=function(){t.listBody&&e.create({body:t.listBody}).success(function(e){t.posts.unshift(e),t.listBody=null})},e.fetch().success(function(e){t.posts=e})}]),angular.module("pullPix").service("ListSvc",["$http",function(t){this.fetch=function(){return t.get("http://localhost:3000/api/posts")},this.create=function(e){return t.post("http://localhost:3000/api/posts",e)}}]),angular.module("pullPix").controller("LoginCtrl",["$scope","UserSvc",function(t,e){t.login=function(l,o){e.login(l,o).then(function(e){t.$emit("login",e.data)})}}]),angular.module("pullPix").controller("RegisterCtrl",["$scope","UserSvc","$location",function(t,e,l){t.register=function(o,n){e.register(o,n).then(function(e){t.$emit("login",e),l.path("/")})}}]),angular.module("pullPix").config(["$routeProvider",function(t){t.when("/",{controller:"ListCtrl",templateUrl:"/partials/posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"/partials/register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"/partials/login.html"}).when("/imagemeta",{controller:"ImgMetaCtrl",templateUrl:"/partials/img-meta.html"}).when("/upload",{controller:"UploadCtrl",templateUrl:"/templates/upload.html"}).when("/splash",{controller:["RegisterCtrl","LoginCtrl"],templateUrl:"/partials/splash-page.html"}).when("/photo",{controller:"ImgMetaCtrl",templateUrl:"/partials/photo-page.html"}).when("/profile",{controller:"",templateUrl:"/partials/profile-page.html"}).when("/photo-map",{controller:"",templateUrl:"/partials/map-page.html"}).when("/upload-page",{controller:"UploadCtrl",templateUrl:"/partials/upload-page.html"}).when("/photo-map",{controller:"",templateUrl:"/partials/map-page.html"})}]),angular.module("pullPix").controller("UploadCtrl",["$scope","$upload",function(t,e){t.onFileSelect=function(l){t.upload=e.upload({url:"/api/user/upload",method:"POST",data:{myObj:t.myModelObj},file:l}).progress(function(t){console.log(t.loaded+" is loaded"),console.log(t.total+" is total "),console.log("percent: "+parseInt(100*t.loaded/t.total)),console.log(l)}).success(function(e){console.log("success fileout"),t.fileout=l[0].name,t.fileoutSize=l[0].size,t.fileoutLast=l[0].lastModified,console.log("data start >>> "+e["Profile-EXIF"]+" <<< data end...from upload.ctrl.js"),console.log("successful upload (from upload.ctrl.js)")})}}]),angular.module("pullPix").service("UserSvc",["$http",function(t){var e=this;e.getUser=function(){return t.get("/users").then(function(t){return t.data})},e.login=function(l,o){return t.post("/sessions",{username:l,password:o}).then(function(l){return console.log("Res data "+l.data),$window.localStorage.setItem("access_token",l.data),e.token=l.data,t.defaults.headers.common["X-Auth"]=l.data,e.getUser()})},e.register=function(l,o){return t.post("/users",{username:l,password:o}).then(function(){return e.login(l,o)})}}]),angular.module("pullPix").service("ImgMetaSvc",["$http",function(t){this.fetch=function(){return t.get("/img-meta")},this.create=function(e){return t.post("/img-meta",e)}}]);
>>>>>>> master
