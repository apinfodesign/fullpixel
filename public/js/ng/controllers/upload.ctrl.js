angular
    .module('pullPix')
    .controller('UploadCtrl', Upload);

  Upload.$inject = ['$upload', 'ImgMetaSvc', '$location'];

 
  function Upload($upload, ImgMetaSvc, $location) {
 
 
    var vm = this;
    vm.fileout = null;
    vm.currentuser = null;
    vm.lat = null;
    vm.lon = null;
    vm.cameraModel = null;
    vm.shutterSpeed = null;
    vm.aperture = null;
    vm.iso = null;
    vm.timeDate = null;
    vm.upload = null;
    vm.geometry = null;
    vm.onFileSelect = onFileSelect;
    vm.imgUpdate = imgUpdate;

    function onFileSelect(files) {
 
      vm.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        // data: {myObj: $scope.myModelObj},
        file: files  //number files uploaded

      }).progress(function(evt) {

      }).success(function(data, status, headers, config) {
        console.log('success fileout 1');
        vm.fileout = "/uploads/" + files[0].name;
        //TEMP DELETE NOT WORKING vm.currentuser = CurrentUser.userid;



        try
          {
          console.log('success fileout 2');
          console.log(data);

          // convert deg to dec here

            var cameraModel = data.Properties['exif:Model'];

            var lat = data.Properties['exif:GPSLatitude'];
            var latDirection = data.Properties['exif:GPSLatitudeRef'];        
            var lon = data.Properties['exif:GPSLongitude'];
            var lonDirection = data.Properties['exif:GPSLongitudeRef'];
              
            // var latOut = degreeToDecimal(lat, latDirection);
            // var lonOut = degreeToDecimal(lon, lonDirection);

          var iso = data.Properties['exif:ISOSpeedRatings'];
          var shutterSpeed = data.Properties['exif:ShutterSpeedValue'];
          var aperture = data.Properties['exif:ApertureValue'];
          var timeDate = data.Properties['exif:DateTime'];

          var shutterCalc = function (shutterSpeed){
              var speed=  (Math.pow(2,(shutterSpeed[0]/shutterSpeed[1]) ) ) ;
              // DON'T YET KNOW IF THIS FORMULA IS RIGHT - IT IS SOMETHING LIKE THIS
              speed = truncateDecimals(speed, 1);
              return speed;
          };

          var apertureCalc = function (aperture){
              var aperture= (Math.pow(1.4142, (aperture[0]/aperture[1]) ) );

              aperture = truncateDecimals(aperture, 2);
              // DON'T YET KNOW IF THIS FORMULA IS RIGHT - IT IS SOMETHING LIKE THIS
              return aperture;
          };

          var degreeToDecimal = function (coord, compass){
            if (coord != null && compass != null)  //handles missing EXIF data error
            {
              //transforms standard degree min sec EXIF coord to decimal value, latitude or longitude
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
            }

            decimalCoord = truncateDecimals(decimalCoord, 7);
            return decimalCoord;
         };
          console.log("generate lat lon");


          vm.lat = degreeToDecimal(lat, latDirection);
          vm.lon = degreeToDecimal(lon, lonDirection);

          vm.cameraModel = cameraModel;
          vm.shutterSpeed = shutterCalc(shutterSpeed);
          vm.aperture = apertureCalc(aperture);
          vm.iso = iso;
          vm.timeDate = timeDate;

          console.log(iso + " is iso");
          console.log(cameraModel + " is cameraModel");
          console.log(aperture + " is aperture");
          console.log(shutterSpeed + " is shutterSpeed");
          console.log(lat + " is lat");
          console.log(lon + " is lon");
      }
      catch(err)
      {
          console.log("EXIF read error was " + err);
          vm.lat = null;
          vm.lon = null;
          vm.cameraModel = null;
          vm.shutterSpeed = null;
          vm.aperture = null;
          vm.iso = null;
          vm.timeDate = null;
      }
      //end try catch

     });
  }

  function imgUpdate(metadata, currentUser, imgpath){
            if(metadata){
                ImgMetaSvc.create({
                  username        : currentUser.username,
                  path            : imgpath,
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
                  //metadata = null;
                  $location.path('/' + currentUser.username);
 
                });
        }
    };
}


function truncateDecimals (num, digits) {
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    return parseFloat(finalResult);
}
