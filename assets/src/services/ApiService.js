class ApiService {
    constructor($http, $resource, APP_CONST) {
        'ngInject';
        this.$http = $http;
        this.$resource = $resource;
        this.APP_CONST = APP_CONST;
    }


    login() {
        return this.$http.get(`${this.APP_CONST.url}/auth/google`)
            .then(resp => {
                return resp;
            })
    }

}

angular.module("timeSheet")
    .service("ApiService", ApiService);