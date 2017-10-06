(function () {
    angular.module("timeSheet").controller('LoginController', ['ApiService', 'UserService', '$state', function(ApiService, UserService, $state){
        var vm = this;

        vm.login = function(){
            console.log(vm.username,vm.password);
            ApiService.login({},function(r){
               console.log(r);
            }, function(err){
                console.log(err);
            });
        }

    }]);
})();