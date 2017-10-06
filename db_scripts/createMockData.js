"use strict";

const sails = require('sails');
const Promise = require('bluebird');
const projects = [
  {
    "_id" : 1,
    "name" : "Autofi",
    "client" : {
      "name" : "Autofi"
    },
    "emailConfig" : {
      "to" : [
        {
          "name" : "Rajat Sharma",
          "email" : "rajat.sharma@tothenew.com"
        }
      ],
      "cc" : [
        {
          "name" : "Rachit Jain",
          "email" : "rachit.jain@tothenew.com"
        }
      ]
    },
    "teamMembers" : [
      {
        "name" : "Rajat Sharma",
        "email" : "rajat.sharma@tothenew.com"
      },
      {
        "name" : "Rachit Jain",
        "email" : "rachit.jain@tothenew.com"
      },
      {
        "name" : "Abhishek Tejpaul",
        "email" : "abhishek.tejpaul@tothenew.com",
        "role" : "PROJECT_MANAGER"
      }
    ]
  },
  {
    "_id" : 2,
    "name" : "TVL",
    "client" : {
      "name" : "TVL"
    },
    "emailConfig" : {
      "to" : [
        {
          "name" : "Rajat Sharma",
          "email" : "rajat.sharma@tothenew.com"
        }
      ],
      "cc" : [
        {
          "name" : "Rachit Jain",
          "email" : "rachit.jain@tothenew.com"
        }
      ]
    },
    "teamMembers" : [
      {
        "name" : "Anand Shukla",
        "email" : "anandnath.shukla@tothenew.com"
      },
      {
        "name" : "Anurag Malhotra",
        "email" : "anurag.malhotra@tothenew.com"
      },
      {
        "name" : "Abhishek Tejpaul",
        "email" : "abhishek.tejpaul@tothenew.com",
        "role" : "PROJECT_MANAGER"
      }
    ]
  }];

const dayEntries = [
  {
    "userId" : 1.0,
    "projectId" : 1.0,
    "entryDay" : "Thu Oct 05 2017 00:00:00 GMT+0000",
    "createdAt" : "Thu Oct 05 2017 00:00:00 GMT+0000",
    "updatedAt" : "Thu Oct 05 2017 00:00:00 GMT+0000",
    "workHours" : 8.0,
    "tasks" : [
      "Raised PR for TAWA-4695",
      "Working on TAWA-3543"
    ]
  }
,  {
    "userId" : 1.0,
    "projectId" : 1.0,
    "entryDay" : "Thu Oct 06 2017 00:00:00 GMT+0000",
    "createdAt" : "Thu Oct 06 2017 00:00:00 GMT+0000",
    "updatedAt" : "Thu Oct 06 2017 00:00:00 GMT+0000",
    "workHours" : 8.0,
    "tasks" : [
      "Raised PR for TAWA-4690",
      "Working on TAWA-3542"
    ]
  }
,  {
    "userId" : 2.0,
    "projectId" : 1.0,
    "entryDay" : "Thu Oct 05 2017 00:00:00 GMT+0000",
    "createdAt" : "Thu Oct 05 2017 00:00:00 GMT+0000",
    "updatedAt" : "Thu Oct 05 2017 00:00:00 GMT+0000",
    "workHours" : 8.0,
    "tasks" : [
      "Raised PR for TAWA-4695",
      "Working on TAWA-3543"
    ]
  }
,  {
    "userId" : 2.0,
    "projectId" : 1.0,
    "entryDay" : "Thu Oct 06 2017 00:00:00 GMT+0000",
    "createdAt" : "Thu Oct 06 2017 00:00:00 GMT+0000",
    "updatedAt" : "Thu Oct 06 2017 00:00:00 GMT+0000",
    "workHours" : 8.0,
    "tasks" : [
      "Raised PR for TAWA-4690",
      "Working on TAWA-3542"
    ]
  }];

const users = [
  {
    "_id" : 1,
    "email" : "rajat.sharma@tothenew.com",
    "name" : "Rajat Sharma"
  },
  {
    "_id" : 2,
    "email" : "rachit.jain@tothenew.com",
    "name" : "Rachit Jain"
  }];

Promise.promisifyAll(sails);

sails.loadAsync({
  hooks: {
    blueprints: false,
    controllers: false,
    cors: false,
    csrf: false,
    grunt: false,
    http: false,
    i18n: false,
    logger: false,
    // orm: leave default hook
    policies: false,
    pubsub: false,
    request: false,
    responses: false,
    // services: leave default hook,
    session: false,
    sockets: false,
    views: false,
  },
}).then(function(app){
    return Project
      .create(projects)
      .then(function (data) {
        return User.create(users)
      })
      .then(function (data) {
        return DayEntry.create(dayEntries);
      })
      .then(function(data){
        return sails.lowerAsync();
      })
      .then(function(){
        console.log('done');
      })
}).catch(function(err){
  console.log('error ocurred' + err);
}).finally(function(){
  process.exit();
})

