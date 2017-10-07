class addProject {
    constructor(ApiService, $state, project, $mdDialog) {
        'ngInject';
        //this.User = User;
        this.ApiService = ApiService;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.project = project || Project;
        this.filter = true;
        this.tagsTo = [];
        this.tagsCc = [];
        this.tagsBcc = [];
    }

    getRegion() {
        this.ApiService.getRegion()
            .then(resp => this.region = resp.data);
    }

    loadUsers($query) {
        return this.ApiService.getUsers($query)
            .then(resp => {
                return resp.data;
            });
    }

    getEmails(data) {
        let emails = [];
        if(data.length) {
            data.forEach(item =>  emails.push(item.email));
        }
        return emails;
    }

    save(project) {
        this.project.emailConfig.to  = this.getEmails(this.tagsTo);
        this.project.emailConfig.cc  = this.getEmails(this.tagsCc);
        this.project.emailConfig.bcc  = this.getEmails(this.tagsBcc);
        this.saving = true;
        if (project.id) {
            return this.ApiService.updateProject(project)
                .then(resp => {
                    this.saving = false;
                    this.$mdDialog.cancel();
                });
        }
        this.ApiService.createProject(project)
            .then(resp => {
                this.saving = false;
                this.$mdDialog.cancel();
            });
    }
}

angular.module("timeSheet").controller('addProject', addProject);