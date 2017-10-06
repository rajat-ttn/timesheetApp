"use strict";

 module.exports = {
     getFilteredUsers: (req, res) => {
         let searchText = req.query['searchText'] || ''
             ;

         User
             .find({name: { 'startsWith': searchText }})
             .then(users => {
                 return res.json({users})
             })
             .catch(err => {
                 sails.log.error(`error ${err} occured while fetching all projects`);
                 return res.serverError('Error occurred while fetching user list for autosuggest');
             });
     }
 }