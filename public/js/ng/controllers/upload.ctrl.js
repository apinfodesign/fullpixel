angular.module('pullPix')
  .controller('UploadCtrl', function($scope, $upload) {
 
   $scope.onFileSelect = function(files) {
    //$files: an array of files selected, each file has name, size, and type.
    //for (var i = 0; i < $files.length; i++) {
      var file = files;

      $scope.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        data: {myObj: $scope.myModelObj},
        file: files,  //number files uploaded

      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        console.log(file);
        //console.log(data + " is data ");

      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        $scope.fileout = file[0].name;
        $upload.fileout = file[0].name;

        $scope.fileoutSize = file[0].size;
        $upload.fileoutSize = file[0].size;

        $scope.fileoutLast = file[0].lastModified;
        $upload.fileoutLast = file[0].lastModified;

        console.log("........");
        console.log("successful upload");

    });
  //  }
  };



});