angular.module('pullPix')
    .controller('RegisterCtrl', function(UserSvc, $location){
        var vm = this;
        vm.register = function (username, password){
            UserSvc.register(username, password)
                .then(function(user){
                    vm.$emit('login', user);
                    $location.path('/');
                });
        };

    });
