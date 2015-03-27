angular.module('pullPix')
    .controller('MemberListCtrl', function(MemberSvc){
        var vm =this;
        vm.MemberListAdd = function(){
            if(vm.username){
                MemberSvc.create({
                    body: vm.username
                })
                    .success(function(member){
                        vm.members.unshift(member);
                    })
            }
        };
        MemberSvc.fetch()
            .success(function(members){
                vm.members = members
            });
    });