angular
    .module('pullPix')
    .directive('slider', function($timeout){
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                imgmetas: '='
            },
            link: function(scope, elem, attrs){

                scope.currentIndex = 0;
                console.log('slid-dir ' + scope.imgmetas);
                scope.next = function($event){
                    if($event){$event.preventDefault();}
                   scope.currentIndex < scope.imgmetas.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
                };

                scope.prev = function($event){
                    $event.preventDefault();
                    scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.imgmetas.length - 1;
                };

                scope.$watch('currentIndex', function(){
                    scope.imgmetas.forEach(function(imgmeta){
                        imgmeta.visible = false;
                    });
                    scope.imgmetas[scope.currentIndex].visible = true;
                });
                scope.fullScreen = function(){

                }

                /* Start: For Automatic slideshow*/

                var timer;
                scope.delay = 50000; // interval /1000 = seconds delay

                var sliderFunc=function(){
                    timer=$timeout(function(){
                        scope.next();
                        timer=$timeout(sliderFunc, scope.delay );
                    }, 100);
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