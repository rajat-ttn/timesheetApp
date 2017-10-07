class AdminCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';

        //this.User = User;
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
    }

    loadUsers(query) {
        this.ApiService.getUsers(query)
            .then(users => {
                return users;
            });
    }

    logout() {
        this.UserService.logout();
    };
}


angular.module("timeSheet").controller('AdminCtrl', AdminCtrl);