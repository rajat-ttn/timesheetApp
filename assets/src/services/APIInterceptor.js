angular.module("timeSheet")
    .factory('APIInterceptor', APIInterceptor);

function APIInterceptor($rootScope, UserService, $state) {
    //'ngInject';
    return {
        request,
        response,
        responseError
    };

    function request(config) {
        let access_token = UserService.getToken() || null;
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    }

    function responseError(response) {
        if (response.status === 401) {
            UserService.logout();
            //$rootScope.$broadcast('unauthorized');
        }
        return response
    }

    function response(response) {
        if (!(/\.(htm?l|svg|css|js|png|map|jpe?g)$/i.test(response.config.url.toLowerCase())) && response.config.url != "http://api.kontex.com/login" && response.config.url != "http://api.kontex.com/profile") {
            return response.data
        }
        return response;
    }
}