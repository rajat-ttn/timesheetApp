(function () {
    angular.module("timeSheet").controller('AdminCtrl', ['$scope', 'User', 'ApiService', 'UserService', '$state', function ($scope, User, ApiService, UserService, $state) {
        var vm = this;
        vm.user = isUser;


    }]);
})();