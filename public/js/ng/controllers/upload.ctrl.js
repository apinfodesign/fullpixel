angular.module('pullPix')
  .controller('UploadCtrl', function($upload) {
    var vm = this;
   vm.onFileSelect = function(files) {
    //$files: an array of files selected, each file has name, size, and type.
    //for (var i = 0; i < $files.length; i++) {
      var file = files;

      vm.upload = $upload.upload({
        url: '/api/user/upload',  
        method: 'POST',
        data: {myObj: vm.myModelObj},
        file: files,  //number files uploaded

      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        console.log(file);
        //console.log(data + " is data ");

      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        vm.fileout = file[0].name;
        $upload.fileout = file[0].name;

        vm.fileoutSize = file[0].size;
        $upload.fileoutSize = file[0].size;

        vm.fileoutLast = file[0].lastModified;
        $upload.fileoutLast = file[0].lastModified;

        console.log("........");
        console.log("successful upload");

    });
  //  }
  };



});