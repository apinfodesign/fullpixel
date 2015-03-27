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
    });
  };
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