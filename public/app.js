angular.module('pullPix',[
    'ngRoute',
    'angularFileUpload',
    'ngAnimate'
]);
angular.module('pullPix')
.controller('ModalCtrl', ["$scope", "ModalService", function ($scope, ModalService) {    
    $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };
    
}]);

angular.module('pullPix')
.controller('ModalController', ["$scope", "close", function($scope, close) {
  
 $scope.close = function(result) {
  close(result, 500); // close, but give 500ms for bootstrap to animate
 };

}]);
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
        $scope.login = function(username, password){
            UserSvc.login(username, password)
                .then(function(user){
                    $scope.$emit('login', user);
                    console.log('User ' + user);
                    $location.path('/upload');
            	});
        };
    }]);



angular.module('pullPix')
    .controller('RegisterCtrl', ["$scope", "UserSvc", "$location", function($scope, UserSvc, $location){
        $scope.register = function (username, password){
            UserSvc.register(username, password)
                .then(function(user){
                    $scope.$emit('login', user);
                    $location.path('/upload');
            });
        };
    }]);

angular.module('pullPix')
    .config(["$routeProvider", function ($routeProvider){
        $routeProvider
            .when('/',           {controller: 'LoginCtrl',   templateUrl: '/partials/splash-page.html'})
            .when('/upload',     {controller: 'UploadCtrl', controllerAs: 'vm', templateUrl: '/partials/upload-page.html'})
            .when('/photo',      {controller: 'ImgMetaCtrl', templateUrl: '/partials/photo-page.html'})
            .when('/profile',    {controller: '',            templateUrl: '/partials/profile-page.html'}) 
            .when('/photo-map',  {controller: '',            templateUrl: '/partials/map-page.html'});
     }]);



angular
  .module('pullPix')
  .controller('UploadCtrl', Upload);


  Upload.$inject = ['$upload', 'ImgMetaSvc', 'CurrentUser'];

  function Upload($upload, ImgMetaSvc, CurrentUser) {
 

    var vm = this;
    vm.fileout = null;
    vm.currentuser = null;
    vm.lat = null;
    vm.lon = null;
    vm.upload = null;
    vm.onFileSelect = onFileSelect;
    vm.imgUpdate = imgUpdate;


   function onFileSelect(files) {
 
      vm.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        // data: {myObj: $scope.myModelObj},
        file: files  //number files uploaded

      }).progress(function(evt) {


      }).success(function(data, status, headers, config) {
        vm.fileout = "/uploads/" + files[0].name;
        vm.currentuser = CurrentUser.userid;
       
        console.log('success fileout');
 
        // convert deg to dec here
        var lat = data["Profile-EXIF"]['GPS Latitude'];
        var latDirection = data["Profile-EXIF"]['GPS Latitude Ref'];        
        var lon = data["Profile-EXIF"]['GPS Longitude'];
        var lonDirection = data["Profile-EXIF"]['GPS Longitude Ref'];

        function degreeToDecimal(coord, compass){ 

          //transorms standard degree min sec EXIF coord to decimal value, latitude or longitude
          //N and E compass positive, S and W compass negative
          var direction = 1; // N or E
          var decimalCoord; // return value
          var elements = coord.split(",");//should give 3 element array>>> 45/1,31/1,54636/1000
          var degrees = elements[0].split("/"); //should give 2 element array 45,1 
          var finalDegrees = degrees[0]/degrees[1];
          var minutes = elements[1].split("/"); //should give 2 element array 31,1
          var finalMinutes = minutes[0]/minutes[1];
          var seconds = elements[2].split("/");  //should give 2 element array 54636/1000
          var finalSeconds = seconds[0]/seconds[1];
          
          if ( compass === "S" || compass === "W" ){ direction = -1 }; 
          
          decimalCoord = direction * ( Math.abs(finalDegrees) + (finalMinutes/60.0) + (finalSeconds / 3600.0) );
          
          return decimalCoord;

        }

        vm.lat = degreeToDecimal(lat, latDirection);
        vm.lon = degreeToDecimal(lon, lonDirection);

     });
  }

  function imgUpdate(metadata){
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
}





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
