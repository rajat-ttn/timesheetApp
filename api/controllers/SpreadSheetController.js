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
          sails.log.error(err);
          return res.serverError('Error occurred while creating spreadSheets');
        })
      });
  },
    
    createSheet: (req, res) => {
        let userId = req.body.userId
            , startDate = req.body.startDate
            , endDate = req.body.endDate
            ;
        
        DayEntry.native(function(err, collection) {
            if (err) return res.serverError();
            
            collection
                .find({userId: userId, entryDay: { $gte: new Date(startDate), $lte: new Date(endDate) }})
                .sort({entryDay: 1})
                .toArray(function (err, results) {
                    if (err) return res.serverError();
                    return res.json({results});
                });
        });
    },

    downloadSheet: function (req, res) {
        let inputData = req.params.all()
            , fileName = inputData['fileName']
            , filePath = './excelSheets' + '/' + fileName;
        ;

        try{
            // ToDo add logic to generate excel path at the specified path
            if(fileName && fs.existsSync(filePath)){
                res.download(filePath);
            } else {
                let payload = {
                    fileName: fileName
                    , projectId: inputData['projectId']
                    , startDate: inputData['startDate']
                    , endDate: inputData['endDate']
                    , projectName: inputData['projectName']
                    , clientName: inputData['clientName']
                    , teamMembers: inputData['teamMembers']
                }
                EntryService.generateFile(payload);
                return res.json();
            }
        }
        catch(err){
            sails.log.error(`Error while trying to download file whose
             fileName is ${fileName} and giving error: ${err}`);
            res.serverError('Error occurred while downloading spreadSheets');
        }
    }
};
