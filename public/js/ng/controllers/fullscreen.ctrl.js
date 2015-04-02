angular.module('pullPix')
    .controller('FullscreenCtrl', function ($scope, $timeout, QueueService) {
        var INTERVAL = 3000,
 
        slides = [{id:"image00", src:"./uploads/ansel1.jpg"},
                  {id:"image01", src:"./uploads/ansel2.jpg"},
                  {id:"image02", src:"./uploads/ansel3.jpg"},
                  {id:"image03", src:"./uploads/ansel4.jpg"},
                  {id:"image04", src:"./uploads/ansel5.jpg"}];
 


    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 1;
        $timeout(nextSlide, INTERVAL);
    }


    function loadSlides() {
        QueueService.loadManifest(slides);
    }


    $scope.$on('queueComplete', function(event, slides) {
        $scope.$apply(function(){
            $scope.slides = slides;
            $scope.loaded = true;

            $timeout(nextSlide, INTERVAL);
        });
    });

    $scope.progress = 0;
    $scope.loaded = false;
    $scope.currentIndex = 0;
    

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    
    loadSlides();
})


.controller('ProfileCtrl',function($scope, ImgMetaSvc, $routeParams) {
        $scope.userName = $routeParams.userName;

        ImgMetaSvc.fetch($scope.userName)
            .success(function(imgmetas){
                $scope.imgmetas = imgmetas
                console.log('profilectrl ' + imgmetas);
            });
    })

;


angular.module('pullPix')
.service('QueueService', function($rootScope){
    var queue = new createjs.LoadQueue(true);

    function loadManifest(manifest) {
        queue.loadManifest(manifest);


        queue.on('complete', function() {
            $rootScope.$broadcast('queueComplete', manifest);
        });
    }

    return {
        loadManifest: loadManifest
    }
});



