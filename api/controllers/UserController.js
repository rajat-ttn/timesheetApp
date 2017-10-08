"use strict";

 module.exports = {
     getFilteredUsers: (req, res) => {
         let searchText = req.query['searchText'] || ''
             ;

         User
             .find({name: { 'startsWith': searchText }, select: ['name', 'email', 'role','image']})
             .then(users => {
                 return res.json({ data: users})
             })
             .catch(err => {
                 sails.log.error(`error ${err} occured while fetching user list for autosuggest`);
                 return res.serverError('Error occurred while fetching user list for autosuggest');
             });
     },
     
     getData: (req, res) => {
          User
             .findOne({email: req.user.email})
             .then(user => {
                 return res.json({data: user})
             })
             .catch(err => {
                 sails.log.error(`error ${err} occured while fetching user detail`);
                 return res.serverError('Error occurred while fetching user detail');
             });
     }
 }