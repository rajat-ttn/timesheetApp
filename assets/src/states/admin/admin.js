class AdminCtrl {
    constructor(ApiService, UserService, $state, ngDialog, $mdDialog) {
        'ngInject';

        //this.User = User;
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.ngDialog = ngDialog;
        this.$mdDialog = $mdDialog;
        this.getProjects();
    }

    // getRegion() {
    //     this.ApiService.getRegion()
    //         .then(resp => this.region = resp.data);
    // }

    getProjects() {
        this.saving = true;
        this.ApiService.getProjects()
            .then(resp => {
                this.projects = resp.data;
                this.saving = false;
            })
    }

    // editProject(project) {
    //     this.project = project;
    // }

    // loadUsers($query) {
    //     return this.ApiService.getUsers($query)
    //         .then(resp => {
    //             return resp;
    //         });
    // }

    logout() {
        this.UserService.logout();
    };

    // getEmails(data) {
    //     let emails = [];
    //     if(data.length) {
    //         data.forEach(item =>  emails.push(item.email));
    //     }
    //     return emails;
    // }

    // save(project) {
    //     this.project.emailConfig.to  = this.getEmails(this.tagsTo);
    //     this.project.emailConfig.cc  = this.getEmails(this.tagsCc);
    //     this.project.emailConfig.bcc  = this.getEmails(this.tagsBcc);
    //     this.saving = true;
    //     if (project.projectId) {
    //        return this.ApiService.updateProject(project)
    //             .then(resp => {
    //                 this.saving = false;
    //             });
    //     }
    //     this.ApiService.createProject(project)
    //         .then(resp => {
    //             this.saving = false;
    //         });
    // }

    showAdvanced(ev) {
    this.$mdDialog.show({
        controller: 'addProject',
        controllerAs: 'model',
        templateUrl: 'src/modal/addProject/addProject.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
        // fullscreen: customFullscreen // Only for -xs, -sm breakpoints.
        });
    }

    // addProject(){
    //     this.ngDialog.open({
    //         templateUrl: 'src/modal/addProject/addProject.html',
    //         controller: 'addProject',
    //         controllerAs: 'model',
    //         width: 600
    //     });
    // }

    /**/
}


angular.module("timeSheet").controller('AdminCtrl', AdminCtrl);