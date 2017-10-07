class LoginCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
    }

    login()  {
        window.location.href = 'http://localhost:1337/auth/google/';
    }

}

angular.module("timeSheet")
    .controller('LoginCtrl', LoginCtrl);