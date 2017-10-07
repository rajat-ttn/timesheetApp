
const obj = {
    projectId : null,
    tasks : [''],
    workHours : null,
    entryDay : null
};

class addTask {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        //this.User = User;
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.obj = obj;
        this.getProjects();
    }

    getRegion() {
        this.ApiService.getRegion()
            .then(resp => this.region = resp.data);
    }

    add(){
       this.obj.tasks.push('');
        console.log(this.obj);
    }

    sendTask(){
        console.log(this.obj);
        this.ApiService.sendTask(this.obj).then(resp => {
            console.log(resp);
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