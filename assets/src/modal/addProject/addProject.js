
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

class addProject {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        //this.User = User;
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.project = Project;
    }

    getRegion() {
        this.ApiService.getRegion()
            .then(resp => this.region = resp.data);
    }

    editProject(project) {
        this.project = project;
    }

    loadUsers($query) {
        return this.ApiService.getUsers($query)
            .then(resp => {
                return resp;
            });
    }

    logout() {
        this.UserService.logout();
    };

    getEmails(data) {
        let emails = [];
        if(data.length) {
            data.forEach(item =>  emails.push(item.email));
        }
        return emails;
    }

    save(project) {
        console.log('runnnn');
        this.project.emailConfig.to  = this.getEmails(this.tagsTo);
        this.project.emailConfig.cc  = this.getEmails(this.tagsCc);
        this.project.emailConfig.bcc  = this.getEmails(this.tagsBcc);
        this.saving = true;
        if (project.projectId) {
            return this.ApiService.updateProject(project)
                .then(resp => {
                    this.saving = false;
                });
        }
        this.ApiService.createProject(project)
            .then(resp => {
                this.saving = false;
            });
    }

    fuck(){
     console.log('fuckkkk');
    }

    /**/
}


angular.module("timeSheet").controller('addProject', addProject);