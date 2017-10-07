class ApiService {
    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    getUser() {
        return this.$http.get('/user/get')
            .then(resp => {
                return resp;
            })
    }

    getUsers(query) {
        return this.$http.get('/user/getFilteredUsers', {searchText:'raj'})
            .then(resp => {
                return resp;
            })
    }
}

angular.module("timeSheet")
    .service("ApiService", ApiService);