angular.module('pullPix')
    .controller('AboutInfoCtrl', //function($scope, AboutInfoSvc, '$routeParams', '$sanitize'){
        function($scope, AboutInfoSvc, $routeParams){

        $scope.UserUpdate = function(userdata){
            console.log(userdata);
            if(userdata){
                
                AboutInfoSvc.update({
                    userpublicname  : userdata.userpublicname,
                    userportrait    : userdata.userportrait,
                    userblogtitle   : userdata.userblogtitle,
                    useraboutstory  : userdata.useraboutstory,
                    usertags        : userdata.usertags
                })
                .success(function(userdata){
                    //console.log(userdata);
                    console.log('hello');
                    
                    $location.path('/#/');   
                });
            }

        };
    });