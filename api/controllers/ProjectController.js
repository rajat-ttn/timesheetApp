"use strict";

const _ = require('lodash')
    , moment = require('moment')
    ;

module.exports = {
    getAllProjects: (req, res) => {
        Project
            .find({isDeleted: {$ne: true}})
            .then(projects => {
                return res.json({ data: projects})
            })
            .catch(err => {
                sails.log.error(`error ${err} occured while fetching all projects`);
                return res.serverError('Error occurred while creating spreadSheets');
            })
    },
    getRegionMap:(req, res) =>{
      Project
        .find({where:{isDeleted:{$ne:true}}, select:['_id', 'region', 'name']})
        .then(projects => {
            const regionProjectMap = {};
            _.forEach(projects, function(project){
              if(!regionProjectMap[project.region]){
                regionProjectMap[project.region] = [];
              }
              regionProjectMap[project.region].push({projectId: project.id, projectName:project.name});
            })
            return res.json({ data: regionProjectMap})
        })
        .catch(err => {
          sails.log.error(`error ${err} occured while fetching region map`);
          return res.serverError('Some error occurred');
        })
    },

    deleteProject: (req, res) => {
        let projectId = req.params['projectId']
            ;

        Project
            .updateOne({id: projectId},{isDeleted: true})
            .then(projects => {
                return res.json({data: projects})
            })
            .catch(err => {
                sails.log.error(`error ${err} occured while deleting project`);
                return res.serverError();
            })
    },

    createUpdateProject: (req, res) => {
        let inputData = req.params.all()
            , payload = {
                name: inputData['projectName']
                , client: { name: inputData['clientName'] }
                , region: inputData['region']
                , emailConfig: {
                    subject: inputData['emailConfig']['subject'] || ''
                    , to: inputData['emailConfig']['to'] || ''
                    , cc: inputData['emailConfig']['cc'] || ''
                    , bcc: inputData['emailConfig']['bcc'] || ''
                    , dailyStatusEnabled: inputData['emailConfig']['dailyStatusEnabled'] || true
                }
                , teamMembers: inputData['teamMembers']
                , logWorkCutOffTime: inputData['cutOffTime']
                /*, startDate: moment(inputData['startDate']).format('l')
                , endDate: moment(inputData['endDate']).format('l')*/
            }
        
        if(inputData.action === 'create'){
            Project
                .create(payload)
                .then(project => {
                    return res.json({ data: true })
                })
                .catch(err => {
                    sails.log.error(`error ${err} occured while creating project`);
                    return res.serverError();
                })
        } else {
            Project
                .updateOne({id: inputData['projectId']}, payload)
                .then(project => {
                    return res.json({data: project })
                })
                .catch(err => {
                    sails.log.error(`error ${err} occured while updating project`);
                    return res.serverError();
                })
        }
    }
}