class UserCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.getTaskList();
    }

    preCook(data){
        let formatData = [];
        for(let x = 0; x < data.length; x++){
            for(let i = 0; i < data[x].tasks.length; i++){
                formatData.push({ title :  data[x].tasks[i], start : data[x].entryDay});
            }
        }

        $('calendar').fullCalendar('renderEvents', formatData);
        // $('calendar').formatData;
    }

    getTaskList() {
        var user = this.UserService.getUser();
        this.ApiService.getTaskList(user.id)
            .then(resp => {
                this.tasks = this.preCook(resp.data);
            })
    }
}

angular.module("timeSheet").controller('UserCtrl', UserCtrl);