angular.module('pullPix')

  .controller('UploadCtrl', function($scope, $upload) {
 
   $scope.onFileSelect = function(files) {


      $scope.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        data: {myObj: $scope.myModelObj},
        file: files  //number files uploaded

      }).progress(function(evt) {
        console.log(evt.loaded + " is loaded");
        console.log(evt.total + " is total ");
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        console.log(files);
        //console.log(data + " is data ");

      }).success(function(data, status, headers, config) {
        console.log('success fileout');


        $scope.fileout = files[0].name;
        $scope.fileoutSize = files[0].size;
        $scope.fileoutLast = files[0].lastModified;

        console.log("data start >>> " + data["Profile-EXIF"] + " <<< data end...from upload.ctrl.js");
        console.log("successful upload (from upload.ctrl.js)");
    });
  };
});