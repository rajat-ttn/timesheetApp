"use strict";
/**
 * SpreadSheetController
 *
 * @description :: Server-side logic for managing spreadsheets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const Promise = require('bluebird');

module.exports = {

  /**
   * `SpreadSheetController.createSpreadSheetsForAll()`
   */
  createSpreadSheetsForAll: function (req, res) {

    Project
      .find({})
      .then(function (projects) {
        return Promise.map(projects, function (project) {
          const googleSpreadSheetClient = new GoogleSpreadSheetClient();

          return googleSpreadSheetClient
            .init()
            .then(function () {
              const sheetOptions = {
                spreadSheetTitle: project.name
              };
              return googleSpreadSheetClient.addSheet(sheetOptions)
            })
            .then(function (data) {
              console.log(`sheet created for ${project.name}`);
            })
        })
          .then(function () {
            return res.json({
              message: 'spreadSheets created successFully'
            });
          })
          .catch(function (err) {
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

    DayEntry.native(function (err, collection) {
      if (err) return res.serverError();

      collection
        .find({userId: userId, entryDay: {$gte: new Date(startDate), $lte: new Date(endDate)}})
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

    try {
      if (fileName && fs.existsSync(filePath)) {
        res.download(filePath);
      } else {
        Project
          .find({id: inputData.projectId})
          .then(function (project) {
              project.filePath = filePath;
            return getProjectInfoForMonth(project, inputData.startDate, inputData.endDate);
          })
            .then(function () {
                return res.download(filePath)
            })
        //EntryService.generateFile(payload);
        //return res.download(filePath);
      }
    }
    catch (err) {
      sails.log.error(`Error while trying to download file whose
             fileName is ${fileName} and giving error: ${err}`);
      res.serverError('Error occurred while downloading spreadSheets');
    }
  }
};


function getProjectInfoForMonth(project, startDate, endDate) {

  const projectInfo = {
    projectName:project.name,
    clientName:project.clientName,
    teamMembers:project.teamMembers,
    startDate:startDate,
    endDate:endDate,
    region:project.region
  };
  return new Promise(function (resolve, reject) {

    DayEntry.native(function (err, collection) {
      if (err) return res.serverError();

      collection
        .find(
          {
            projectId: project.id,
            entryDay: {
              $gte: startDate,
              $lte: endDate
            }
          })
        .sort({entryDay: 1})
        .toArray(function (err, dayEntries) {
          if (err) return reject(err);
          _.forEach(projectInfo.teamMembers, function(teamMember){
            let currentTeamMemberDayEntries = _.find(dayEntries, {email:teamMember.email});

            currentTeamMemberDayEntries = _.map(currentTeamMemberDayEntries, function(currentTeamMemberDayEntry){
              return {
                day: moment(currentTeamMemberDayEntry.entryDay).format('dddd'),
                date: moment(currentTeamMemberDayEntry.entryDay).format('L'),
                hours: currentTeamMemberDayEntry.workHours,
                comments: currentTeamMemberDayEntry.join('\n')
              };
            });
            teamMember.dataEntries = currentTeamMemberDayEntries;
          });
          resolve(projectInfo);
        });
    })
  })
    .then(function(projectInfo){

      const dateRange = {
        startDate: projectInfo.startDate,
        endDate: projectInfo.endDate
      };

      return new Promise(function(resolve, reject){
        const workbook = ExcelService.createWorkbook(projectInfo, dateRange);
        createExcelFile(`{projectInfo.filePath}.xlsx`, workbook)
          .then(function () {
            console.log('excel file successfully generated');
            resolve('excel file successfully generated');
          })
          .catch(function (err) {
            console.log('error ocurred while creating excel file!' + err);
            reject('error ocurred while creating excel file!' + err);
          })
      })
    })
}
