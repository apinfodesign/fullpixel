angular
    .module('pullPix')
    .directive('gears', function($timeout){
        return {
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var myEl = angular.element(document.querySelector('#myfullscreen'));
                    myEl.removeClass('gears');
                }, 6000);
            }
        }
    });
