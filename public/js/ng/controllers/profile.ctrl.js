angular
    .module('PullPix')
    .controller('ProfileCtrl', Profile);

    Profile.$inject = ['ProfileSvc','$location'];

    function Profile(ProfileSvc, $location){
        var vm = this;

    }