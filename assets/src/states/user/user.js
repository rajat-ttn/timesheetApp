class UserCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        // this.getTaskList();
    }

    // getTaskList() {
    //     var user = this.UserService.getUser();
    //     this.ApiService.getTaskList(user.id)
    //         .then(resp => {
    //             $('calendar').fullCalendar('renderEvents', this.UserService.preCook(resp.data));
    //         })
    // }
}

angular.module("timeSheet").controller('UserCtrl', UserCtrl);