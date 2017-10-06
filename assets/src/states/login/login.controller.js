(function () {
    angular.module("timeSheet").controller('LoginController', ['ApiService', 'UserService', '$state', function(ApiService, UserService, $state){
        var vm = this;

        vm.login = function(){
            console.log(vm.username,vm.password);
            window.location.href = 'http://localhost:1337/auth/google'
            /*ApiService.login({},function(r){
               console.log(r);
            }, function(err){
                console.log(err);
            });*/
        }

    }]);
})();