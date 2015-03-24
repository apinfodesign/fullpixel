angular.module('pullPix')
    .controller('ApplicationCtrl', function(){
        var vm = this;
        vm.$on('login', function(_, user){
            vm.currentUser = user;
    });
});
