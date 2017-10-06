(function () {
    'use strict';
    angular
        .module('timeSheet')
        .controller('DashboardCtrl', DashboardCtrl);

        DashboardCtrl.$inject = ['ApiService', 'UserService', '$state'];
        function DashboardCtrl(ApiService, UserService, $state ) {

            $state.go('dbd.user');

        };
})();