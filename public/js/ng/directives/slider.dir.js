angular
    .module('pullPix')
    .directive('slider', function($timeout){
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                imgArrays: '='
            },
            link: function(scope, elem, attrs){
                scope.currentIndex = 0;

                scope.next = function(){
                   scope.currentIndex < scope.imgArrays.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
                };

                scope.prev = function(){
                    scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.imgArrays.length - 1;
                };

                scope.$watch('currentIndex', function(){
                    scope.imgArrays.forEach(function(imgArray){
                        imgArray.visible = false;
                    });
                    scope.imgArrays[scope.currentIndex].visible = true;
                });

                /* Start: For Automatic slideshow*/

                var timer;

                var sliderFunc=function(){
                    timer=$timeout(function(){
                        scope.next();
                        timer=$timeout(sliderFunc,5000);
                    },5000);
                };

                sliderFunc();

                scope.$on('$destroy',function(){
                    $timeout.cancel(timer);
                });

                /* End : For Automatic slideshow*/
            },
            templateUrl: 'partials/slider.html'
        }
    });