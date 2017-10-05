(function () {
    angular.module("timeSheet").factory("ApiService", ['$resource','APP_CONST', function($resource,APP_CONST) {
        return $resource(APP_CONST.url + ':path', {path: '@path'}, {
            login: {
                url: APP_CONST.url + 'people/?search=:search',
                method: 'GET',
                params: {
                    search:'@search'
                }
            }
        });
    }]);
})();
