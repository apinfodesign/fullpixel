angular.module('pullPix')
    .controller('ApplicationCtrl', function($rootScope){
        $rootScope.$on('login', function(_, user){
            $rootScope.currentUser = user; //
            console.log('appctrl ' + user.username);
       		console.log('appctrl ' + user.userphoto);
            // we now have root scope access to the user object//  
    });
});
