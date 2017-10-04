'use strict';

let google = require('googleapis');
let authentication = require("./../../authentication");

function getData() {
  var sheets = google.sheets('v4');
  const auth = this.auth;
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


function addSheet(options) {
  var sheets = google.sheets('v4');
  const auth = this.auth;
  return new Promise(function(resolve, reject){

    var payload = {
      auth: auth,
      resource: {
        properties:{
          title: options.spreadSheetTitle
        }
      }
    }

    if(options.sheets && options.sheets.length){
      payload.resource.sheets = [];
      options.sheets.forEach(function (sheetObj, index) {
        payload.resource.sheets.push({
          properties: {
            title: sheetObj.sheetTitle,
            sheetId: index
          },
          merges: [
            {
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 4,
              sheetId: index
            }]
        });
      })
    }

    sheets.spreadsheets.create(payload, function (err, response){
      if(err){
        return reject(err)
      }
      resolve(response);
    });
  })
}


function appendData() {
  var sheets = google.sheets('v4');
  const auth = this.auth;
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

function bulkUpdateSheet(options) {
  let sheets = google.sheets('v4')
      , auth = this.auth
      ;

  let payload = {
    auth: auth,
    spreadsheetId: options.spreadSheetTitle,
    resource: {
      requests: []
    }
  }

  if(options.sheets && options.sheets.length){
    options.sheets.forEach(function (sheetObj, index) {
      payload.resource.requests.push({
        repeatCell: {
          range: {
            startRowIndex: sheetObj.startRowIndex,
            endRowIndex: sheetObj.endRowIndex,
            startColumnIndex: sheetObj.startColumnIndex,
            endColumnIndex: sheetObj.endColumnIndex,
            sheetId: index
          },
          cell: {
            userEnteredValue: {
              formulaValue: `=SUM(B${ sheetObj.startColumnIndex }:B${ sheetObj.endColumnIndex })`
            }
          },
          fields: "userEnteredValue"
        }
      });
    })
  }

  sheets.spreadsheets.batchUpdate(payload, (err, response) => {
    if(err){
      return reject(err)
    }
    resolve(response);
  });
}


function GoogleSpreadSheetClient(){
}

function init(){
  const self = this;
  return authentication
          .authenticate()
          .then(function(auth){
            self.auth = auth;
            return self;
          })
}

GoogleSpreadSheetClient.prototype.init = init;
GoogleSpreadSheetClient.prototype.getData = getData;
GoogleSpreadSheetClient.prototype.addSheet = addSheet;
GoogleSpreadSheetClient.prototype.appendData = appendData;
GoogleSpreadSheetClient.prototype.bulkUpdateSheet = bulkUpdateSheet;

module.exports = GoogleSpreadSheetClient;


//var googleSpreadSheetClient = new GoogleSpreadSheetClient();
//
//googleSpreadSheetClient
//  .init()
//  .then(function(){
//    googleSpreadSheetClient.getData();
//  })
