angular.module('pullPix')
    .controller('ImgMetaCtrl', function(ImgMetaSvc){
        var vm = this;
        vm.ImgUpdate = function(metadata){
            if(metadata){
                ImgMetaSvc.create({
                    userid: metadata.userid,
                    imgpath: metadata.imgpath,
                    imgtitle: metadata.imgtitle,
                    imgdesc: metadata.imgdesc,
                    imgtag: metadata.imgtag
                })
                    .success(function(imgmeta){
                       console.table(imgmeta);
                        metadata = null;
                    });
            }

        };
    });