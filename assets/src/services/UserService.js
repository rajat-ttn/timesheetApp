class UserService {
    constructor($state) {
        'ngInject';
        this.currentUser = null;
        this.$state = $state;
    }

    setUser(data) {
        this.currentUser = data;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
    }

    getUser() {
        return this.currentUser || JSON.parse(localStorage.getItem('user'));
    }

    setToken(data) {
        localStorage.setItem('token', JSON.stringify(data));
    }

    getToken() {
        return this.currentUser || JSON.parse(localStorage.getItem('token'));
    }

    logout() {
        localStorage.setItem('token', JSON.stringify(null));
        localStorage.setItem('user', JSON.stringify(null));
        this.currentUser = null;
        this.$state.go('login');
    }
}

angular.module("timeSheet").factory('UserService', UserService);