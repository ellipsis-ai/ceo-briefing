/*
@exportId XYZlY5xsT569sAhhGnzQzQ
*/
module.exports = (function() {
const {google} = require('googleapis');
var sheets = google.sheets('v4');

return ellipsis => {
  const client = require('google-client')(ellipsis);
  
  return {
    addRows: addRows,
    getAllRows: getAllRows
  };
  
  function getAllRows(spreadsheetId) {
    return new Promise((resolve, reject) => {
      client.authorize().then(res => {
        const range = 'Form Responses 1';
        var request = {
          spreadsheetId: spreadsheetId,
          ranges: [range],
          auth: client,
        };

        sheets.spreadsheets.values.batchGet(request, function(err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(response)
          }
        });
      });
    });
  }
  
  function addRows(spreadsheetId, rows) {
    return new Promise((resolve, reject) => {
      client.authorize().then(res => {
        const request = {
          spreadsheetId: spreadsheetId,
          range: 'A1:A2',
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: rows
          },
          auth: client,
        };
        sheets.spreadsheets.values.append(request, function(err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(response)
          }
        });        
      });
    });
  }

};


})()
     