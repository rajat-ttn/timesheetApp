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

        function calendarController($scope,$element,$mdDialog) {
            let vm = $scope.model;

            function run(){
                $($element).fullCalendar({
                    dayClick: function(date, jsEvent, view) {
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
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,basicWeek,basicDay'
                    },
                    defaultDate: '2017-09-12',
                    navLinks: true, // can click day/week names to navigate views
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    events: $scope.data
                });
            }

            vm.$onChanges = function (obj) {
                run();
            };

            vm.$onDestroy = function () {
                vm = null;
            };
        }

        calendarController.$inject = ['$scope','$element','$mdDialog'];

        return CDO;
    }

})();