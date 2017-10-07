class UserCtrl {
    constructor(ApiService, UserService, $state) {
        'ngInject';
        this.ApiService = ApiService;
        this.UserService = UserService;
        this.$state = $state;
        this.getTaskList();
    }

    setData(tasks) {
        tasks.forEach(task => {
            task.start = moment().format(task.entryDay).format('MM-DD-YYYYY');
        })
    }

    getTaskList() {
        this.ApiService.getTaskList()
            .then(resp => {
                this.tasks = this.setData(resp.data);
            })
    }

}

angular.module("timeSheet")
    .controller('UserCtrl', UserCtrl);

/*[
    {
        "entryDay": "2017-10-05T00:00:00.000Z",
        "workHours": 8,
        "tasks": [
            "Raised PR for TAWA-4695",
            "Working on TAWA-3543"
        ],
        "id": "59d84a5d0f73659decbde742"
    },
 {
 "entryDay": "2017-10-06T00:00:00.000Z",
 "workHours": 8,
 "tasks": [
 "Raised PR for TAWA-4695",
 "Working on TAWA-3543"
 ],
 "id": "59d84a5d0f73659decbde742"
 },
 {
 "entryDay": "2017-10-07T00:00:00.000Z",
 "workHours": 8,
 "tasks": [
 "Raised PR for TAWA-4695",
 "Working on TAWA-3543"
 ],
 "id": "59d84a5d0f73659decbde742"
 },
]*/

/*[
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
 ]*/