(function () {

})();


class ApiService {
    constructor($http, $resource, APP_CONST) {
        'ngInject';
        this.$http = $http;
        this.$resource = $resource;
        this.APP_CONST = APP_CONST;
    }


    login() {
        console.log('ssssssss');
        return this.$http.get(`${this.APP_CONST.url}/auth/google`)
            .then(resp => {
                console.log(resp);
                return resp;
            })
    }

}

angular.module("timeSheet")
    .service("ApiService", ApiService);