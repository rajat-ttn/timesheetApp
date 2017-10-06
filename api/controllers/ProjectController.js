"use strict";

const _ = require('lodash');

module.exports = {
    getAllProjects: (req, res) => {
        Project
            .find({isDeleted: {$ne: true}})
            .then(projects => {
                return res.json({projects})
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
            return res.json({regionProjectMap})
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
            .update({id: projectId},{isDeleted: true})
            .then(projects => {
                return res.json({projects})
            })
            .catch(err => {
                sails.log.error(`error ${err} occured while deleting project`);
                return res.serverError();
            })
    },

    createUpdateProject: (req, res) => {
        /*let inputData = req.params.all()
            , payload = {
                name: inputData['']
                , client: { name: inputData[''] }
                , emailConfig: {
                    subject: inputData['subject']
                    , to: []
                }
            }
        
        if(inputData.action === 'create'){
            
        }*/
    }
}