function(ellipsis) {
  const client = require('google-client')(ellipsis);
const {google} = require('googleapis');
const sheets = google.sheets('v4');

client.authorize().then(() => {
  const request = {
    spreadsheetId: ellipsis.env.CEO_BRIEFING_SHEET_ID,
    ranges: ['Form Responses 1'],
    auth: client,
  };
  sheets.spreadsheets.values.batchGet(request).then(res => {
    const values = res.data.valueRanges[0].values.slice(1).map(ea => {
      return {
        timestamp: ea[0],
        user: ea[1],
        text: ea[2]
      };
    });
    ellipsis.success(values);
  });
});
}
