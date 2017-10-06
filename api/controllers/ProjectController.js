"use strict";

const _ = require('lodash');

module.exports = {
    getAllProjects: (req, res) => {
        Project
            .find({})
            .then(projects => {
                return res.json({success: true, projects})
            })
            .catch(err => {
                sails.log.error(`error ${err} occured while fetching all projects`);
                return res.json({success: false, error: 'Some error occurred'})
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
    }
}
