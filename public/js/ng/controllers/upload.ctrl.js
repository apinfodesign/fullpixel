angular.module('pullPix')

  .controller('UploadCtrl', function($scope, $upload, ImgMetaSvc, CurrentUser) {
 
   $scope.onFileSelect = function(files) {
 
      $scope.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        data: {myObj: $scope.myModelObj},
        file: files  //number files uploaded

      }).progress(function(evt) {


      }).success(function(data, status, headers, config) {
        $scope.fileout = files[0].name;
        $scope.currentuser = CurrentUser.userid;
       
        console.log('success fileout');
 
        // convert deg to dec here
        var lat = data["Profile-EXIF"]['GPS Latitude'];
        var latDirection = data["Profile-EXIF"]['GPS Latitude Ref'];        
        var lon = data["Profile-EXIF"]['GPS Longitude'];
        var lonDirection = data["Profile-EXIF"]['GPS Longitude Ref'];
        $scope.lat =degreeToDecimal(lat, latDirection );
        $scope.lon = degreeToDecimal(lon, lonDirection);

     });
  }
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

