class APIInterceptor {
    constructor($rootScope, UserService, $state) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.UserService = UserService;
        this.$state = $state;
    }


    request(config) {
        let currentUser = this.UserService.getUser();
        let access_token = currentUser ? currentUser.access_token : null;
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    };

    responseError(response) {
        if (response.status === 401) {
            this.UserService.logout();
            this.$state.go('login');
            //$rootScope.$broadcast('unauthorized');
        }
        return response;
    };
}

angular.module("timeSheet")
    .service('APIInterceptor', APIInterceptor);