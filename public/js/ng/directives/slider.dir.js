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
                scope.delay = 9000000;  

                //very large but figure out how to turn off
                //interval /1000 = seconds  is amount delay between auto slide change

                var sliderFunc=function(){

                    // timer=$timeout(function(){
                    //     scope.next();
                    //     timer=$timeout(sliderFunc, scope.delay );
                    // }, 100);   //this appears to control start delay
                
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