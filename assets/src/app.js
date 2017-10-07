(function () {
    angular.module("timeSheet", ['ui.router', 'ngResource', 'ngTagsInput'])

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('APIInterceptor');
            $stateProvider

                .state('login', {
                    url: '/login',
                    templateUrl: './src/states/login/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'model',
                    resolve: {User: isUser}
                })

                .state('dbd', {
                    url: '/dbd',
                    views: {
                        "": {
                            templateUrl: './src/states/dashboard/dashboard.html',
                            controller: 'DashboardCtrl',
                            controllerAs: 'model'
                        }
                    },
                    //resolve: {User: isUser}
                })
                .state('dbd.admin', {
                    url: '/admin',
                    controller: 'AdminCtrl',
                    controllerAs: 'model',
                    templateUrl: './src/states/admin/admin.html',
                    resolve: {User: isUser}
                })
                .state('dbd.user', {
                    url: '/user',
                    controller: 'UserCtrl',
                    controllerAs: 'model',
                    templateUrl: './src/states/user/user.html',
                    resolve: {User: isUser}
                });


            $urlRouterProvider.otherwise('/login');

            function isUser(UserService, $state) {

                if (UserService.getUser()) {
                    //$state.go('dbd');
                }
                else {
                    $state.go('login');
                }
                return UserService.getUser();
            }

        });
})();