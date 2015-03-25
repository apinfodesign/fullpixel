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
  }
  $scope.ImgUpdate = function(metadata){
            if(metadata){
                ImgMetaSvc.create({
                    userid          : metadata.userid,
                    path            : metadata.imgpath,
                    title           : metadata.imgtitle,
                    caption         : metadata.imgdesc,
                    tags            : metadata.imgtags
                })
                    .success(function(imgmeta){
                        console.table(imgmeta);
                        console.log(metadata.userid);
                        console.log(metadata.imgpath);
                        console.log(metadata.imgtitle);
                        console.log(metadata.imgdesc);
                        console.log(metadata.imgtags);
                        metadata = null;
                    });
            }

  };
});