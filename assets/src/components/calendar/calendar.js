(function () {
    angular
        .module('timeSheet')
        .component('calendar', calendar());

    function calendar() {
        let CDO = {
            templateUrl: './src/components/calendar/calendar.html',
            controllerAs: 'model',
            controller: calendarController,
            bindings: {
                data: '='
            }
        };

        function calendarController($scope,$element,$mdDialog, UserService, ApiService) {
            let vm = $scope.model;

            function run(){
                $($element).fullCalendar({
                    dayClick: function(date, jsEvent, view) {
                        console.log(view);
                        $mdDialog.show({
                            controller: 'addTask',
                            controllerAs: 'model',
                            templateUrl: 'src/modal/addTask/addTask.html',
                            parent: angular.element(document.body),
                            targetEvent: jsEvent,
                            clickOutsideToClose:true,
                            locals : {
                                date : date,
                                elem : $element
                            }
                        });
                    },
                    header: {
                        right: 'prev,next today',
                        left: 'title',
                        center: ''
                        // right: 'month,basicWeek,basicDay'
                    },
                    defaultDate: moment(),
                    navLinks: true, // can click day/week names to navigate views
                    editable: false,
                    eventLimit: true, // allow "more" link when too many events
                    events: $scope.data,
                    viewRender: function(view, element) {
                        var user = UserService.getUser();
                        // $($element).fullCalendar('removeEvents', []);
                        ApiService.getTaskList(user.id)
                            .then(resp => {
                                $($element).fullCalendar('renderEvents', UserService.preCook(resp.data));
                            })
                    }
                });
            }

            vm.$onChanges = function (obj) {
                run();
            };

            vm.$onDestroy = function () {
                vm = null;
            };
        }

        calendarController.$inject = ['$scope','$element','$mdDialog', 'UserService','ApiService'];

        return CDO;
    }

})();