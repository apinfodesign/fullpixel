angular.module('pullPix')
    .controller('deleteUserCtrl',  
        function($scope, UserSvc, $location){
 		
        $scope.UserDelete = function(currentUser){
              
            console.log("before deletion" + currentUser);

            if(currentUser) {
            	UserSvc.delete({
                    password		: currentUser.password, 
                    username        : currentUser.username,
                    userphoto		: currentUser.userphoto,
                    userpublicname  : currentUser.userpublicname,
                    userportrait    : currentUser.userportrait,
                    userblogtitle   : currentUser.userblogtitle,
                    useraboutstory  : currentUser.useraboutstory,
                    usertags        : currentUser.usertags
                })
            	.success(function(User){
            		console.log(User);
            		console.log("User Has Been Deleted");
            		$location.path('/#/');
            	});
            }
         };
 });