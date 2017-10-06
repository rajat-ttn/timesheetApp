"use strict";
/**
 * SpreadSheetController
 *
 * @description :: Server-side logic for managing spreadsheets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const Promise  = require('bluebird');

module.exports = {

  /**
   * `SpreadSheetController.createSpreadSheetsForAll()`
   */
  createSpreadSheetsForAll: function (req, res) {

    Project
      .find({})
      .then(function(projects){
        return Promise.map(projects, function(project){
          const googleSpreadSheetClient = new GoogleSpreadSheetClient();

          return googleSpreadSheetClient
            .init()
            .then(function(){
              const sheetOptions = {
                spreadSheetTitle :project.name
              };
              return googleSpreadSheetClient.addSheet(sheetOptions)
            })
            .then(function(data){
              console.log(`sheet created for ${project.name}`);
            })
        })
        .then(function(){
          return res.json({
            message: 'spreadSheets created successFully'
          });
        })
        .catch(function(err){
          console.log(err);
          return res.serverError('Error occurred while creating spreadSheets');
        })
      });
  },
    
    createSheet: (req, res) => {
        let userId = req.body.userId
            , startDate = req.body.startDate
            , endDate = req.body.endDate
            ;
        
        DayEntries.native(function(err, collection) {
            if (err) return res.json({success: false});
            
            collection
                .find({userId: userId, entryDay: { $gte: new Date(startDate), $lte: new Date(endDate) }})
                .sort({entryDay: 1})
                .toArray(function (err, results) {
                    if (err) return res.json({success:false, error: err});
                    return res.json({success:true, results});
                });
        });
    },

    downloadSheet: function (req, res) {
        let fileName = req.params['fileName']
            , filePath = sails.config.sheetsPath + fileName;
        ;

        try{
            // ToDo add logic to generate excel path at the specified path
            if(fileName && fs.existsSync(filePath)){
                res.download(filePath);
            } else {
                res.json({success: false, error: 'Requested file does not exist'});
            }
        }
        catch(err){
            sails.log.error(`Error while trying to ${action} document whose
             fileName is ${fileName} and giving error: ${err}`);
            res.json({success: false});
        }
    }
};
