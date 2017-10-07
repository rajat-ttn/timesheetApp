"use strict";

let moment = require('moment')

 module.exports = {
     createUpdateEntry: (req, res) => {
        var inputData = req.params.all()
            , payload = {}
            ;

         payload = {
             userId: inputData['userId']
             , projectId: inputData['projectId']
             , workHours: parseInt(inputData['workHours'], 10)
             , tasks: inputData['tasks']
             , entryDay: new Date(inputData['entryDay'])
         }

         if(inputData['action'] === 'create'){
             DayEntry
                 .create(payload)
                 .then(entry => {
                     return res.json({ data: entry })
                 })
                 .catch(err => {
                     sails.log.error(`error ${err} occured while inserting a new entry`);
                     return res.serverError();
                 })
         } else {
             DayEntry
                 .update({ userId: payload.userId, projectId: payload.projectId, entryDay: new Date(payload.entryDay)}, payload)
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