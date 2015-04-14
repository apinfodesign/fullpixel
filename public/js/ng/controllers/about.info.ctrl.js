angular.module('pullPix')
    .controller('AboutInfoCtrl', function($scope, AboutInfoSvc, CurrentUser){
        $scope.UserUpdate = function(userdata){
            if(userdata){
                //maybe AboutInfoSvc.update? need to change the the actual database data
                AboutInfoSvc.create({
                    userid          : userdata.userid,
                    path            : userdata.path,
                    title           : userdata.title,
                    caption         : metadata.caption,
                    tags            : metadata.tags,
                    camera          : metadata.camera,
                    shutter         : metadata.shutter,
                    aperture        : metadata.aperture,
                    iso             : metadata.iso,
                    date            : metadata.date
                })
                .success(function(usermeta){
                    console.table(usermeta);
                    
                    $location.path('/about/' + currentUser.username);   
                });
            }

        };
    });