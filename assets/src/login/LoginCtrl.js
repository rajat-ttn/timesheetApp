class LoginCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
    }

    login()  {
        //console.log(vm.username,vm.password);
        window.location.href = 'http://localhost:1337/auth/google';
        /*this.ApiService.login()
            .then(resp => {
                console.log(resp);
            });*/
    }

}

angular.module("timeSheet")
    .controller('LoginCtrl', LoginCtrl);