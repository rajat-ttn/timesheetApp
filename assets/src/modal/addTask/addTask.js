class addTask {
    constructor(ApiService, UserService, $state, $mdDialog, date) {
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
        this.user = UserService.getUser();
        this.$mdDialog = $mdDialog;
    }

    getRegion() {
        this.ApiService.getRegion()
            .then(resp => this.region = resp.data);
    }

    add(){
       this.obj.tasks.push('');
    }

    sendTask(){
        this.obj.userId = this.user.id;
        this.ApiService.sendTask(this.obj).then(resp => {
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


    save(project) {
        console.log('runnnn');
    }

    /**/
}


angular.module("timeSheet").controller('addTask', addTask);