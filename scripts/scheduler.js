"use strict";

const cron = require('node-cron');
const sails = require('sails');
const Promise = require('bluebird');
const _ = require('lodash');
const moment = require('moment');
const sender = require('../api/services/sender');

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
}).then(function (app) {
  return Project
    .find({isDeleted: false})
    .then(function (projects) {
      //running a task every five minutes
      cron.schedule('*/5 * * * *', function () {
        checkDailyMailsToBeSent(projects);
      });

      //running a task on 1st day of every month
      cron.schedule('0 0 1 * *', function () {
        checkDailyMailsToBeSent(projects);
      });

    })
}).catch(function (err) {
  console.log('error ocurred' + err);
  process.exit();
})

function checkDailyMailsToBeSent(projects) {
  const currentMs = moment.utc().valueOf();
  return Promise.map(projects, function (project) {
    //consider only those projects which are currently active.
    const membersWhoseEntriesShouldBePresent = [];

    _.forEach(project.teamMembers, function (teamMember) {
      if (curentMs >= teamMember.startDate.valueOf() && currentMs < teamMember.endDate.valueOf()) {
        membersWhoseEntriesShouldBePresent.push(teamMember);
      }
    })

    if(membersWhoseEntriesShouldBePresent.length === 0){
      return;
    }

    if (curentMs >= project.startDate.valueOf() && currentMs < project.endDate.valueOf()) {
      const logWorkCutOffTimeMs = moment.utc().startOf('day').add(project.logWorkCutOffTime, 'ms').valueOf();
      //consider only those projects whose logWorkCutOff has matured in last 5 mins;
      if (logWorkCutOffTimeMs <= currentMs && logWorkCutOffTimeMs > (currentMs - 5 * 60 * 1000)) {
        return DayEntry
          .find({projectId: project.id})
          .then(function (dayEntries) {
            const mandatoryPersonIds = _.map(membersWhoseEntriesShouldBePresent, 'id');
            const idsOfUsersWhoLoggedWork = _.map(dayEntries, 'userId');
            const usersWhoDidntLogWork = _.intersection(mandatoryPersonIds, idsOfUsersWhoLoggedWork);
            //happyPath
            sender.send({
              entity: 'timesheetApp',
              queue: 'sendMail',
              msg: {project, dayEntries, usersWhoDidntLogWork}
            });
          })
      }
    }
  })
}


function generateExcelSheetForAllProjects(projects){
  return Promise.map(projects, function(){
   //happyPath
    sender.send({
      entity: 'timesheetApp',
      queue: 'createSpreadSheet',
      msg: {project}
    });
  })
}
