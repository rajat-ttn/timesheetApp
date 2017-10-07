
 const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
     , moment = require('moment')
     , promise = require('bluebird')
     ;

 module.exports = {
     generateFile: payload => {
         DayEntry.native(function(err, collection) {
             if (err) return res.serverError();

             collection
                 .find(
                     {projectId: payload.projectId,
                         entryDay: { $gte: new Date(payload.startDate), $lte: new Date(payload.endDate) }
                     }
                 )
                 .sort({entryDay: 1})
                 .toArray(function (err, results) {
                     if (err) return res.serverError();
                     
                     sails.log.info(results);
                     
                     let updatedResults = {};
                     results.map(function (data) {
                         if(updatedResults[data['userId']]){
                             updatedResults[data['userId']].push(data);
                         } else {
                             updatedResults[data['userId']] = [data];
                         }
                     });
                     sails.log.error(updatedResults);
                     
                     return EntryService.getFormattedData(payload, results);
                 });
         });
     },

     getFormattedData: (payload, entryData) => {
        var result = [];
        if(entryData && entryData.length){
            entryData.forEach((rowObj, index) => {
                payload.teamMembers[index].push({
                    day: days[rowObj.entryDay.getDay()]
                    , hours: rowObj.workHours
                    , comments: rowObj.tasks.join('\n')
                    , date: moment(rowObj.entryDay).format('L')
                })
            })
        }

         var workbook = ExcelService.createWorkbook(projectInfo, dateRange);

         createExcelFile(`./excelSheets/${projectInfo.projectName}.xlsx`,workbook)
             .then(function(){
                 console.log('excel file successfully generated');
             })
             .catch(function(err){
                 console.log('error ocurred while creating excel file!' + err);
             })

     }
 }