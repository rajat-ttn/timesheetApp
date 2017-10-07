class UserCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.getTaskList();
    }

    setData(tasks=[]) {
        tasks.forEach(task => {
            task.start = moment().format(task.entryDay).format('MM-DD-YYYYY');
        })
    }

    getTaskList() {
        this.ApiService.getTaskList()
            .then(resp => {
                this.tasks = this.setData(resp.data);
            })
    }
}

angular.module("timeSheet").controller('UserCtrl', UserCtrl);