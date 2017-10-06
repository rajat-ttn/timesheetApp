"use strict";

const Excel = require('exceljs');
const _ = require('lodash');

const projectInfo = {
  projectName: 'TVL',
  clientName: 'TVL',
  teamMembers: [{
    name: 'Rajat Sharma',
    email: 'rajat.sharma@tothenew.com',
    dataEntries: [
      {
        day: 'Monday',
        date: '10/2/2017',
        hours: 8,
        comments: 'raised PR for TAWA-4695',
        isHoliday: true,
        isOnLeave: true
      },
      {
        day: 'Tuesday',
        date: '11/2/2017',
        hours: 8,
        comments: 'raised PR for TAWA-4695'
      }
    ]
  },
    {
      name: 'Rachit Jain',
      email: 'rachit.jain@tothenew.com',
      dataEntries: [
        {
          day: 'Monday',
          date: '10/2/2017',
          hours: 8,
          comments: 'raised PR for TAWA-4695'
        },
        {
          day: 'Tuesday',
          date: '11/2/2017',
          hours: 8,
          comments: 'raised PR for TAWA-4695'
        }
      ]
    }
  ]
};
const dateRange = {start:'10/1/2017', end:'15/1/2017'};

function createWorkbook(projectInfo,dateRange) {
  const workbook = new Excel.Workbook();
  _.forEach(projectInfo.teamMembers, function(teamMember){
    const worksheet = addWorksheet(workbook, {name: teamMember.name});
    createWorkSheetHeaders(worksheet, {
      projectName: projectInfo.projectName,
      clientName: projectInfo.clientName,
      employeeName: teamMember.name,
      startDate: dateRange.start,
      endDate: dateRange.end
    });
    addDataEntries(worksheet, teamMember.dataEntries);
    computeTotalHours(worksheet, teamMember.dataEntries);
  })
  return workbook;
}

function addWorksheet(workbook, worksheetOptions) {
  const worksheet = workbook.addWorksheet(worksheetOptions.name);
  return worksheet;
}

function createWorkSheetHeaders(worksheet, options) {
  worksheet.getColumn(1).width = 20;
  worksheet.getColumn(2).width = 20;
  worksheet.getColumn(3).width = 20;
  worksheet.getColumn(4).width = 50;

//Make Top header Rows.
  worksheet.mergeCells('A1:D1');

  let row = worksheet.getRow(1);
  row.font = {size: 16, bold: true};
  worksheet.getCell('A1').value = 'TO THE NEW';
  worksheet.getCell('A1').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {argb: 'D1E2E8'}
  };
  worksheet.getCell('A1').alignment = {vertical: 'middle', horizontal: 'center'};


  row = worksheet.getRow(2);
  row.font = {bold: true};
  row.getCell(1).value = 'Project Name:';
  row.getCell(2).value = options.projectName;
  row.getCell(3).value = 'Client Name:';
  row.getCell(4).value = options.clientName;

  row = worksheet.getRow(3);
  row.font = {bold: true};
  row.getCell(1).value = 'Employee Name:';
  row.getCell(2).value = options.employeeName;

  row = worksheet.getRow(4);
  row.font = {bold: true};
  row.getCell(1).value = 'Period Starting:';
  row.getCell(2).value = options.startDate;
  row.getCell(3).value = 'Period Ending:';
  row.getCell(4).value = options.endDate;


  row = worksheet.getRow(6);
  row.font = {bold: true};

  row.getCell(1).value = 'Day';
  row.getCell(2).value = 'Date';
  row.getCell(3).value = 'Hours';
  row.getCell(4).value = 'Comments';

  row.getCell(1).fill = row.getCell(2).fill = row.getCell(3).fill = row.getCell(4).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {argb: 'CAFCE7'}
  };
}

function addDataEntries(worksheet, dataEntries) {
//Add daily data entries
  _.forEach(dataEntries, function (entry, index) {
    const row = worksheet.getRow(6 + index + 1);
    row.getCell(1).value = entry.day;
    row.getCell(2).value = entry.date;
    row.getCell(3).value = entry.hours;
    row.getCell(4).value = entry.comments;
  })
}

function computeTotalHours(worksheet, dataEntries ) {
  //COMPUTE TOTAL
  const row = worksheet.getRow(6 + dataEntries.length + 1);
  row.font = {bold: true};
  row.getCell(2).value = "Total:";
  row.getCell(3).value = {formula: `SUM(C${6 + 1}:C${6 + dataEntries.length})`};
};

function createExcelFile(path, workbook){
  return workbook.xlsx.writeFile(path);
}

var workbook = createWorkbook(projectInfo, dateRange);

createExcelFile(`${projectInfo.projectName}.xlsx`,workbook)
  .then(function(){
    console.log('excel file successfully generated');
  })
  .catch(function(err){
    console.log('error ocurred while creating excel file!' + err);
  })