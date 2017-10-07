const Project = {
    projectName: '',
    clientName: '',
    region: '',
    emailConfig: {
        subject: '',
        to: [],
        cc: [],
        bcc: [],
        dailyStatusEnabled: false
    },
    teamMembers: [],
    logWorkCutOffTime: '', //in ms
    startDate: '',
    endDate: ''
};

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

    getProjects() {
        this.saving = true;
        this.ApiService.getProjects()
            .then(resp => {
                this.projects = resp.data;
                this.saving = false;
            })
    }

     editProject(ev, project) {
         this.project = project;
         this.showAdvanced(ev, project);
     }


    logout() {
        this.UserService.logout();
    };


    showAdvanced(ev, project) {
    this.$mdDialog.show({
        controller: 'addProject',
        controllerAs: 'model',
        templateUrl: 'src/modal/addProject/addProject.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
            project: project || angular.copy(Project)
        },
        // fullscreen: customFullscreen // Only for -xs, -sm breakpoints.
        });
    }
}


angular.module("timeSheet").controller('AdminCtrl', AdminCtrl);