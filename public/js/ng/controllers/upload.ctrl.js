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
       
        console.log('success fileout 2');
        console.log(data);


     });
  }

  function imgUpdate(metadata){
            if(metadata){
                ImgMetaSvc.create({
                  username        : metadata.username,
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
                  $location.path('/profile');
 
                });
        }
    };
}
