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
  }
};
