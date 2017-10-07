
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
                     {userId: payload.userId, projectId: payload.projectId,
                         entryDay: { $gte: new Date('2017-10-01'), $lte: new Date('2017-10-30') }
                     }
                     , { _id: 0, entryDay: 1, workHours: 1, tasks: 1 }
                 )
                 .sort({entryDay: 1})
                 .toArray(function (err, results) {
                     if (err) return res.serverError();
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