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
      }).success(function(data, status, headers, config){
        console.log('success fileout');
        // file is uploaded successfully

        // convert deg to dec here
        var lat = data["Profile-EXIF"]['GPS Latitude'];
        var latDirection = data["Profile-EXIF"]['GPS Latitude Ref'];        
        var lon = data["Profile-EXIF"]['GPS Longitude'];
        var lonDirection = data["Profile-EXIF"]['GPS Longitude Ref'];

        $scope.lat =degreeToDecimal(lat, latDirection );
        $scope.lon = degreeToDecimal(lon, lonDirection);

        $scope.fileout = files[0].name;  //to enable image to appear
    });
  };


function degreeToDecimal(coord, compass){ 
  //transorms standard degree min sec EXIF coord to decimal value, latitude or longitude
  //N and E compass positive, S and W compass negative
  var direction = 1;  // N or E
    var decimalCoord; // return value
    var elements = coord.split(",");//should give 3 element array>>> 45/1,31/1,54636/1000
  var degrees=elements[0].split("/"); //should give 2 element array 45,1 
    var finalDegrees = degrees[0]/degrees[1];
    var minutes = elements[1].split("/"); //should give 2 element array 31,1
    var finalMinutes = minutes[0]/minutes[1];
    var seconds = elements[2].split("/");  //should give 2 element array 54636/1000
    var finalSeconds = seconds[0]/seconds[1];
    if ((compass === "S")|| (compass === "W"))
      {direction=-1 }; 
    decimalCoord = direction * (Math.abs(finalDegrees) + (finalMinutes/60.0) + (finalSeconds / 3600.0) );
    return decimalCoord;
 };


});

