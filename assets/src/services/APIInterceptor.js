angular.module("timeSheet")
    .factory('APIInterceptor', APIInterceptor);

function APIInterceptor($rootScope, UserService, $state) {
    //'ngInject';
    return {
        request,
        responseError
    };

    function request(config) {
        let currentUser = UserService.getUser();
        let access_token = currentUser ? currentUser.access_token : null;
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    }

    function responseError(response) {
        if (response.status === 401) {
            UserService.logout();
            $state.go('login');
            //$rootScope.$broadcast('unauthorized');
        }
        return response
    }
}