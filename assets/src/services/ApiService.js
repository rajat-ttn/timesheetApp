class ApiService {
    constructor($http, $resource, APP_CONST) {
        'ngInject';
        this.$http = $http;
        this.$resource = $resource;
        this.APP_CONST = APP_CONST;
    }

    getUser() {
        return this.$http.get('')
            .then(resp => {
                return resp;
            })
    }


    login() {
        return this.$http.get('/user/get')
            .then(resp => {
                return resp;
            })
    }

}

angular.module("timeSheet")
    .service("ApiService", ApiService);