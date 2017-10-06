"use strict";

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
    }
}