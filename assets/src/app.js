(function () {
    angular.module("timeSheet", ['ui.router', 'ngResource'])

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('APIInterceptor');

            $stateProvider

                .state('login', {
                    url: '/login',
                    templateUrl: './src/login/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'login',
                    resolve: {isUser: isUser}
                })


                .state('dbd', {
                    url: '/dbd',
                    views: {
                        "": {
                            templateUrl: './src/dashboard/dbd.html',
                            controller: 'DashboardCtrl',
                            controllerAs: 'dbd'
                        }
                        /*"header@dbd": {
                         templateUrl: './src/dashboard/header.html',
                         controller:  'HeaderController',
                         controllerAs: 'header'
                         }*/
                    }
                })
                .state('dbd.admin', {
                    url: '/admin',
                    controller: 'AdminCtrl',
                    controllerAs: 'admin',
                    templateUrl: './src/dashboard/admin/index.html',
                    resolve: {isUser: isUser}
                })
                .state('dbd.user', {
                    url: '/user',
                    controller: 'UserCtrl',
                    controllerAs: 'user',
                    templateUrl: './src/dashboard/user/index.html',
                    //resolve: {isUser: isUser}
                });


            $urlRouterProvider.otherwise('/');

            function isUser(UserService, $state) {

                /*if (UserService.getUser()) {
                 $state.go('dbd');
                 } else {
                 $state.go('login');
                 }*/
                return UserService.getUser();
            }

        });
})();