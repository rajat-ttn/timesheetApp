const Filter = {
    region: '',
    project: '',
    year: '',
    month: ''
};

class SheetCtrl {
    constructor(ApiService, UserService, $state, $window) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.$window = $window;
        this.filter = Filter;
        this.getLists();
        this.today = moment();
        this.months = this.today._locale._monthsShort;
        this.years = [this.today.year() -1, this.today.year()];
        this.files = [];
    }

    getLists() {
        this.ApiService.getRegion()
            .then(resp => this.regions = resp.data);
    }

    go(filter) {
        this.files = [];
        if (this.filter.region && this.filter.month && this.filter.year) {
            this.regions[this.filter.region].forEach(project => {
                this.files.push(`${this.filter.region}_${project.projectName}_${this.filter.month}_${this.filter.year}`);
            });
        }
    }

    download(project, fileName) {
        const data = {
            Authorization: this.UserService.getToken(),
            fileName: fileName,
            projectId: project.projectId,
            startDate: `${this.filter.year}-${this.months.indexOf(this.filter.month)+1}-01`, //'2017-10-01',
            endDate: `${this.filter.year}-${this.months.indexOf(this.filter.month)+1}-31`,//'2017-10-31',
        };
        const params = {

        };
        //const url = `/spreadsheet/download?projectId=${project.projectId}&startDate=${data.startDate}&endDate=${data.endDate}&fileName=${fileName}`;
        const url = ['/spreadsheet/download', $.param(data)].join('?');

        this.$window.open(url, '_blank');
    }
}

angular.module("timeSheet")
    .controller('SheetCtrl', SheetCtrl);
