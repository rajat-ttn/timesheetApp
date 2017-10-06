'use strict';

let google = require('googleapis');
let authentication = require("./authentication");

function getData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1ywtA-jD2Z90KeI0Ynvy_QKlQ4KA05EV0cfaLv0dAg5g',
    range: 'Sheet1!A2:C', //Change Sheet1 if your worksheet's name is something else
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
  if (rows.length === 0) {
    console.log('No data found.');
  } else {
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      console.log(row.join(", "));
    }
  }
});
}


function addSheet(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.create({
    auth: auth,
    resource: {
      properties:{
        title: "geekCombatTimeSheetAutoGenerateTest"
      },
      sheets: [
        {
          properties: {
            title: "Rachit",
            sheetId: 0
          },
          merges: [
            {
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 4,
              sheetId: 0
            }]
        },
        {
          properties: {
            title: "Rajat",
            sheetId: 1
          },
          merges: [
            {
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 4,
              sheetId: 1
            }]
        }
      ]
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
      console.log(response);
}
});
}


function appendData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: 'yourSpreadSheetIDHere',
    range: 'Sheet1!A2:B', //Change Sheet1 if your worksheet's name is something else
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [ ["Void", "Canvas", "Website"], ["Paul", "Shan", "Human"] ]
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
      console.log("Appended");
}
});
}

function bulkUpdateSheet(auth) {
  let sheets = google.sheets('v4');

  let payload = {
    auth: auth,
    spreadsheetId: '10Xi2m0OfKnUo5AaS4vELQ77pFbDxaTOQX_xL9wOSucc',
    resource: {
      requests: [
        {
          repeatCell: {
            range: {
              startRowIndex: 2,
              endRowIndex: 3,
              startColumnIndex: 10,
              endColumnIndex: 11,
              sheetId: 0
            },
            cell: {
              userEnteredValue: {
                formulaValue: "=SUM(C4:C9)"
              }
            },
            fields: "userEnteredValue"
          }
        },
        {
          repeatCell: {
            range: {
              startRowIndex: 2,
              endRowIndex: 3,
              startColumnIndex: 10,
              endColumnIndex: 11,
              sheetId: 1
            },
            cell: {
              userEnteredValue: {
                formulaValue: "=SUM(C3:C9)"
              }
            },
            fields: "userEnteredValue"
          }
        }
      ]
    }
  }

  sheets.spreadsheets.batchUpdate(payload, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
      console.log("Bulk modified");
    }
  });
}

authentication.authenticate().then((auth)=>{
  //getData(auth);
  //addSheet(auth);
  bulkUpdateSheet(auth);
});
