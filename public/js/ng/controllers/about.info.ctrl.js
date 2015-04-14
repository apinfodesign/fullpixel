angular.module('pullPix')
    .controller('AboutInfoCtrl', //function($scope, AboutInfoSvc, '$routeParams', '$sanitize'){
        function($scope, AboutInfoSvc, $routeParams){
            AboutInfoService.getUsers(function(result){
                $scope.userdata = result[0];
                
        });
        $scope.update = function(userdata, callback){
            AboutInfoSvc.updateUser(userdata);
            console.log("test");
        };
        // $scope.UserUpdate = function(userdata){
        //     if(userdata){
                
        //         AboutInfoSvc.update({
        //             userpublicname  : userdata.userpublicname,
        //             userportrait    : userdata.userportrait,
        //             userblogtitle   : userdata.userblogtitle,
        //             useraboutstory  : userdata.useraboutstory,
        //             usertags        : userdata.usertags
        //         })
        //         .success(function(userdata){
        //             console.log(userdata);
                    
        //             $location.path('/#/');   
        //         });
        //     }

        // };
    });