angular
  .module('pullPix')
  .controller('UploadCtrl', Upload);


  Upload.$inject = ['$upload', 'ImgMetaSvc', 'CurrentUser'];

  function Upload($upload, ImgMetaSvc, CurrentUser) {
 

    var vm = this;
    vm.fileout = null;
    vm.currentuser = null;
    vm.lat = null;
    vm.lon = null;
    vm.upload = null;
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
        vm.fileout = "/uploads/" + files[0].name;
        vm.currentuser = CurrentUser.userid;
       
        console.log('success fileout');
 
        // convert deg to dec here
        var lat = data["Profile-EXIF"]['GPS Latitude'];
        var latDirection = data["Profile-EXIF"]['GPS Latitude Ref'];        
        var lon = data["Profile-EXIF"]['GPS Longitude'];
        var lonDirection = data["Profile-EXIF"]['GPS Longitude Ref'];

        function degreeToDecimal(coord, compass){ 

          //transorms standard degree min sec EXIF coord to decimal value, latitude or longitude
          //N and E compass positive, S and W compass negative
          var direction = 1; // N or E
          var decimalCoord; // return value
          var elements = coord.split(",");//should give 3 element array>>> 45/1,31/1,54636/1000
          var degrees = elements[0].split("/"); //should give 2 element array 45,1 
          var finalDegrees = degrees[0]/degrees[1];
          var minutes = elements[1].split("/"); //should give 2 element array 31,1
          var finalMinutes = minutes[0]/minutes[1];
          var seconds = elements[2].split("/");  //should give 2 element array 54636/1000
          var finalSeconds = seconds[0]/seconds[1];
          
          if ( compass === "S" || compass === "W" ){ direction = -1 }; 
          
          decimalCoord = direction * ( Math.abs(finalDegrees) + (finalMinutes/60.0) + (finalSeconds / 3600.0) );
          
          return decimalCoord;

        }

        vm.lat = degreeToDecimal(lat, latDirection);
        vm.lon = degreeToDecimal(lon, lonDirection);

     });
  }

  function imgUpdate(metadata){
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
}

