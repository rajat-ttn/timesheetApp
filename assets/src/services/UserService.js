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
        return JSON.parse(localStorage.getItem('user'));
    }

    setToken(data) {
        localStorage.setItem('token', JSON.stringify(data));
    }

    getToken() {
        return JSON.parse(localStorage.getItem('token'));
    }

    preCook(data){
        let formatData = [];
        for(let x = 0; x < data.length; x++){
            for(let i = 0; i < data[x].tasks.length; i++){
                formatData.push({ title :  data[x].tasks[i], start : data[x].entryDay});
            }
        }
        return formatData;
    }


    logout() {
        localStorage.setItem('token', JSON.stringify(null));
        localStorage.setItem('user', JSON.stringify(null));
        this.currentUser = null;
        this.$state.go('login');
    }
}

angular.module("timeSheet").factory('UserService', UserService);