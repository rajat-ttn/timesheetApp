class ApiService {
    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    getUser() {
        return this.$http.get('/user/get')
            .then(resp => {
                return resp;
            })
    }

    getTaskList() {
        return this.$http.get('/entry/getList')
            .then(resp => {
                return resp;
            })
    }

    getRegion() {
        return this.$http.get('/project/getRegionMap')
            .then(resp => {
                return resp;
            })
    }

    getProjects() {
        return this.$http.get('/project/getAll')
            .then(resp => {
                return resp;
            })
    }

    sendTask(obj) {
        return this.$http.post('/entry/create',obj)
            .then(resp => {
                return resp;
            })
    }

    getUsers(query) {
        let params;
        if(query) {
            params = { params: {searchText:query}};
        }
        return this.$http.get('/user/getFilteredUsers', params)
            .then(resp => {
                return resp;
            })
    }

    createProject(data) {
        return this.$http.post('/project/create', data)
            .then(resp => {
                return resp;
            })
    }

    updateProject(data) {
        return this.$http.post('/project/update', data)
            .then(resp => {
                return resp;
            })
    }

    download(data) {
        this.$http.post('/spreadsheet/download', data)
    }
}

angular.module("timeSheet")
    .service("ApiService", ApiService);