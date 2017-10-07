class addTask {
    constructor(ApiService, UserService, $state, $mdDialog, date, elem) {
        'ngInject';
        //this.User = User;
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.obj = {
            projectId : null,
            tasks : [''],
            workHours : null,
            entryDay : date
        };
        this.getProjects();
        this.date = moment(date).format('DD MMMM YYYY');
        this.user = UserService.getUser();
        this.$mdDialog = $mdDialog;
        this.elem = elem;
    }

    getRegion() {
        this.ApiService.getRegion()
            .then(resp => this.region = resp.data);
    }

    add(){
       this.obj.tasks.push('');
    }

    preCook(data){
        let formatData = [];
        for(let i = 0; i < data.tasks.length; i++){
            formatData.push({ title :  data.tasks[i], start : this.date});
        }
        return formatData;
    }

    sendTask(){
        this.obj.userId = this.user.id;
        this.ApiService.sendTask(this.obj).then(resp => {

            $(this.elem).fullCalendar('renderEvents', this.preCook(this.obj));
            this.obj = {
                projectId : null,
                tasks : [''],
                workHours : null,
                entryDay : null
            };
            this.$mdDialog.cancel();
        });
    }

    getProjects() {
        this.saving = true;
        this.ApiService.getProjects()
            .then(resp => {
                this.projects = resp.data;
                this.saving = false;
            })
    }
}

angular.module("timeSheet").controller('addTask', addTask);