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
        console.log('success fileout');
        // file is uploaded successfully
        $scope.fileout = files[0].name;
//        $scope.fileoutSize = files[0].size;
//        $scope.fileoutLast = files[0].lastModified;
        $scope.fileoutCamera = data["Profile-EXIF"].Model;
        $scope.fileoutLongitude = data["Profile-EXIF"]['GPS Latitude'];
        $scope.fileoutLatitude = data["Profile-EXIF"]['GPS Longitude'];


        var latitude = data["Profile-EXIF"]['GPS Latitude'];
        var latitudeDirection = data["Profile-EXIF"][''];
        var longitude = data["Profile-EXIF"]['GPS Longitude'];
        var longitudeDirection = data["Profile-EXIF"][''];

        var finalLongitude = function(latitude, latitudeDirection, longitude, longitudeDirection)
          {
          var elements = str.latitude(",");//should give 3 element array 45/1,31/1,54636/1000
          console.log(elements + " is elements"); 
            var degrees=str.elements[0]("/"); //should give 2 element array 45,1 
            var finalDegrees = degrees[0]/degrees[1];
            var minutes = str.elements[1]("/"); //should give 2 element array 31,1
            var finalMinutes = minutes[0]/minutes[1];
            var seconds = str.elements[2]("/");  //should give 2 element array 54636/1000
            var finalSeconds = seconds[0]/seconds[1];

          //   var demonenator=str.elements

          // var toDecimal = function (number) {
          //   return number[0].numerator + number[1].numerator /
          //   (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
          //    };

          // dd = Math.signum(d) * (Math.abs(d) + (m / 60.0) + (s / 3600.0));
          };
          finalLongitude(latitude, latitudeDirection, longitude, longitudeDirection);

//$scope.fileoutCamera = JSON.stringify(data);
//$scope.fileoutCamera =  data.Signature;
        console.log("data start >>> " + data["Profile-EXIF"] + " <<< data end...from upload.ctrl.js");
        console.log("successful upload (from upload.ctrl.js)");
    });
  };
});