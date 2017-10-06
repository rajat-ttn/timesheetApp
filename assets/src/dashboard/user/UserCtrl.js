class UserCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.x = 'aaaaaaaaaaaa';
        this.admin();
    }



    admin() {
        console.log(this.x);
    }
}

angular.module("timeSheet")
    .controller('UserCtrl', UserCtrl);
