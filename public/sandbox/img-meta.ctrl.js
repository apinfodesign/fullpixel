angular.module('pullPix')
    .controller('ImgMetaCtrl', function($scope, ImgMetaSvc, CurrentUser){
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
    });