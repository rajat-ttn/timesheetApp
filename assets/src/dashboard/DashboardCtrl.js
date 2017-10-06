class DashboardCtrl {
    constructor($location, UserService, ApiService) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$location = $location;
        this.initialize();
    }

    initialize() {
        this.UserService.setToken(this.$location.search().token);
        this.$location.url(this.$location.path());
        this.ApiService.getUser()
            .then(resp => {
                this.UserService.setUser(resp.data);
                this.$state.go('dbd.user');
            })
    }
}

angular
    .module('timeSheet')
    .controller('DashboardCtrl', DashboardCtrl);