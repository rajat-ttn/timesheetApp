"use strict";

let moment = require('moment')

 module.exports = {
     createUpdateEntry: (req, res) => {
        var inputData = req.params.all()
            , payload = {}
            ;
         console.log('entry day : ' + inputData['entryDay']);

         payload = {
             userId: inputData['userId']
             , projectId: inputData['projectId']
             , workHours: inputData['workHours']
             , tasks: inputData['tasks']
             , entryDay: moment(inputData['entryDay']).utc().startOf('day').format('l')
         }

         if(inputData['action'] === 'create'){
             Entry
                 .insertOne(payload)
                 .then(entries => {
                     return res.json({ data: true })
                 })
                 .catch(err => {
                     sails.log.error(`error ${err} occured while inserting a new entry`);
                     return res.serverError();
                 })
         } else {
             Entry
                 .updateOne({ userId: payload.userId, projectId: payload.projectId, entryDay: new Date(payload.entryDay)}, payload)
                 .then(updatedEntry => {
                     return res.json({ data: updatedEntry })
                 })
                 .catch(err => {
                     sails.log.error(`error ${err} occured while updating an entry`);
                     return res.serverError();
                 })
         }
     },

     getEntries: (req, res) => {
        let userId = req.query['userId']
            , projectId = req.query['projectId']
            ;

         DayEntry
             .find({where: { userId: userId, projectId: projectId} , select: ['entryDay', 'workHours', 'tasks'] })
             .sort('entryDay ASC')
             .then(entries => {
                 return res.json({ data: entries })
             })
             .catch(err => {
                 sails.log.error(`error ${err} occured while fetching work log list`);
                 return res.serverError();
             })
     }
 }