class UserService {
    constructor() {
        'ngInject';
        this.currentUser = null;
    }

    setUser(data) {
        this.currentUser = data;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
    }

    setToken(data) {
        localStorage.setItem('token', JSON.stringify(data));
    }

    getUser() {
        return this.currentUser || JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        localStorage.setItem('user', JSON.stringify(null));
        this.currentUser = null;
    }
}

angular.module("timeSheet").factory('UserService', UserService);