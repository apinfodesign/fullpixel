angular.module('pullPix')
  .controller('UploadCtrl', function($scope, $upload) {
 
   $scope.onFileSelect = function(files) {
//$files: an array of files selected, each file has name, size, and type.
    //   var file = files[0];

      $scope.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        data: {myObj: $scope.myModelObj},
        file: files,  //number files uploaded

      }).progress(function(evt) {
        console.log(evt.loaded + " is loaded");
        console.log(evt.total + " is total ");
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        console.log(files);
        //console.log(data + " is data ");

      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        $scope.fileout = files[0].name;
        $scope.fileoutSize = files[0].size;
        $scope.fileoutLast = files[0].lastModified;
        $scope.fileoutCamera = data["Profile-EXIF"].Model;
        $scope.fileoutLongitude = data["Profile-EXIF"]['GPS Latitude'];
        $scope.fileoutLatitude = data["Profile-EXIF"]['GPS Longitude'];

      //$scope.fileoutCamera = JSON.stringify(data);
      //$scope.fileoutCamera =  data.Signature;
        console.log("data start >>> " + data["Profile-EXIF"] + " <<< data end...from upload.ctrl.js");
        console.log("successful upload (from upload.ctrl.js)");
    });
  };
});