angular.module('pullPix')
    .controller('ListCtrl',function(ListSvc){
   ListAdd = function () {
      if (this.listBody) {
          ListSvc.create({
              body: this.listBody
          })
              .success(function(post){
                  this.posts.unshift(post);
                  this.listBody = null;
              });
      }
   }
    ListSvc.fetch()
        .success(function (posts) {
           this.posts = posts
        });

});