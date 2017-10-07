class DashboardCtrl {
    constructor($location, $state, UserService, ApiService) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$location = $location;
        this.$state = $state;
        this.initialize();
    }

    initialize() {
        if (this.$location.search().token) {
            this.UserService.setToken(this.$location.search().token);
            this.$location.url(this.$location.path());
        }

        this.ApiService.getUser()
            .then(resp => {
                this.User = resp.data;
                this.UserService.setUser(resp.data);
            })
    }

    logout() {
        this.UserService.logout();
    }
}

angular
    .module('timeSheet')
    .controller('DashboardCtrl', DashboardCtrl);