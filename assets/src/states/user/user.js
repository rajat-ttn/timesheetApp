class UserCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
    }
}

angular.module("timeSheet")
    .controller('UserCtrl', UserCtrl);
