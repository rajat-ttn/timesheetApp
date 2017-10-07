const Filter = {
    region: '',
    project: '',
    year: '',
    month: ''
};

class SheetCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
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
                this.files.push(`${this.filter.region}_${project.projectName}_${this.filter.month}_${this.filter.year}.xlsx`);
            });
        }
    }
}

angular.module("timeSheet")
    .controller('SheetCtrl', SheetCtrl);
