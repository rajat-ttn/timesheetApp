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
                count: '<'
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
                            clickOutsideToClose:true
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
                    events: [
                        {
                            title: 'All Day Event',
                            start: '2017-09-01'
                        },
                        {
                            title: 'Long Event',
                            start: '2017-09-07',
                            end: '2017-09-10'
                        },
                        {
                            id: 999,
                            title: 'Repeating Event',
                            start: '2017-09-09T16:00:00'
                        },
                        {
                            id: 999,
                            title: 'Repeating Event',
                            start: '2017-09-16T16:00:00'
                        },
                        {
                            title: 'Conference',
                            start: '2017-09-11',
                            end: '2017-09-13'
                        },
                        {
                            title: 'Meeting',
                            start: '2017-09-12T10:30:00',
                            end: '2017-09-12T12:30:00'
                        },
                        {
                            title: 'Lunch',
                            start: '2017-09-12T12:00:00'
                        },
                        {
                            title: 'Meeting',
                            start: '2017-09-12T14:30:00'
                        },
                        {
                            title: 'Happy Hour',
                            start: '2017-09-12T17:30:00'
                        },
                        {
                            title: 'Dinner',
                            start: '2017-09-12T20:00:00'
                        },
                        {
                            title: 'Birthday Party',
                            start: '2017-09-13T07:00:00'
                        },
                        {
                            title: 'Click for Google',
                            url: 'http://google.com/',
                            start: '2017-09-28'
                        }
                    ]
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
