angular.module('pullPix')
    .controller('AboutInfoCtrl', //function($scope, AboutInfoSvc, '$routeParams', '$sanitize'){
        function($scope, UserSvc, $location){

        $scope.UserUpdate = function(userdata){
            //console.log("about " + userdata);
            if(userdata) {
                
                UserSvc.update({
                    username        : userdata.username,
                    userpublicname  : userdata.userpublicname,
                    userportrait    : userdata.userportrait,
                    userblogtitle   : userdata.userblogtitle,
                    useraboutstory  : userdata.useraboutstory,
                    usertags        : userdata.usertags
                })
                .success(function(User){
                    console.log(User);
                    $location.path('/members');   
                });
            }

        };
    });