angular.module('pullPix').controller('SlideCtrl', function ($scope) {
  $scope.myInterval = 1000;
  var slides = $scope.slides = [ 
    {
      image: 'http://lorempixel.com/400/200/food'
    },
    {
      image: 'http://lorempixel.com/400/200/sports'
    },
    {
      image: 'http://lorempixel.com/400/200/people'
    }
    ];
  // $scope.addSlide = function() {
  //   var newWidth = 600 + slides.length + 1;
  //   slides.push({
  //     image: '/uploads/002.JPG',
  //     text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
  //       ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
  //   });
  // };
  // for (var i=0; i<4; i++) {
  //   $scope.addSlide();
  // }
});