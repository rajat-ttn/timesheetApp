(function () {
    angular.module("timeSheet").controller('MainController', ['$scope', 'isUser', 'ApiService', 'UserService', '$state', function ($scope, isUser, ApiService, UserService, $state) {
        var vm = this;
        vm.user = isUser;

        vm.logout = function () {
            UserService.logout();
            $state.go('home.login')
        };
    }]);
})();