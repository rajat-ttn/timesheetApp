class UserService {
    constructor($http, $q, $localStorage) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    currentUser = null;

    setUser(data) {
        currentUser = data;
        localStorage.setItem('user', JSON.stringify(currentUser));
    }

    getUser() {
        return currentUser || JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        localStorage.setItem('user', JSON.stringify(null));
        currentUser = null;
    }
}

angular.module("timeSheet").factory("UserService", UserService);