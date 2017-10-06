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
                 sails.log.error(`error ${err} occured while fetching user list for autosuggest`);
                 return res.serverError('Error occurred while fetching user list for autosuggest');
             });
     },
     
     getData: (req, res) => {
          User
             .find({email: req.user.email})
             .then(user => {
                 return res.json({user})
             })
             .catch(err => {
                 sails.log.error(`error ${err} occured while fetching user detail`);
                 return res.serverError('Error occurred while fetching user detail');
             });
     }
 }