angular.module('pullPix')
    .controller('ImgMetaCtrl', function($scope, ImgMetaSvc){
        $scope.ImgUpdate = function(metadata){
            if(metadata){
                ImgMetaSvc.create({
                    // userid                 : metadata.userid,      HANDLE LATER
                    // meta.path              : metadata.meta.path,   HANDLE LATER
                    title                : metadata.title,
                    caption              : metadata.caption,
                    tags                 : metadata.tags,
                    camera               : metadata.camera,
                    shutter         : metadata.shutter,
                    aperture        : metadata.aperture,
                    iso             : metadata.iso,
                    date            : metadata.date
                    // lat    : metadata.lat,
                    // latRef : metadata.latRef,
                    // lon    : metadata.lon,
                    // lonRef : metadata.lonRef
                })
                    .success(function(imgmeta){
                       console.table(imgmeta);
                        metadata = null;


        $scope.fileoutCamera = data["Profile-EXIF"].Model;
        $scope.fileoutLongitude = data["Profile-EXIF"]['GPS Latitude'];
        $scope.fileoutLatitude = data["Profile-EXIF"]['GPS Longitude'];
                        
                    });
            }

        };
    });