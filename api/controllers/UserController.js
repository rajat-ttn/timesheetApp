"use strict";

 module.exports = {
     getFilteredUsers: (req, res) => {
         let regexText = req.query['searchText'] || ''
             ;

         User
             .native(function(err, collection) {
                 if (err) return res.json({success: false});

                 collection.find({
                     name: {$regex: new RegExp(regexText, 'i')}}
                     , {_id: 0, name: 1, email: 1, uid: 1}
                 )
                     .toArray((err, users) => {
                         if(err){
                             return res.json({success: false});
                         } else {
                             return res.json({success: true, users });
                         }
                     });
             });
     }
 }