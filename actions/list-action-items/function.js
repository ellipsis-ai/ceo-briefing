function(ellipsis) {
  const client = require('google-client')(ellipsis);
const {google} = require('googleapis');
const sheets = google.sheets('v4');

const skipWords = ['done', 'duplicate', 'none', 'skip'];

client.authorize().then(() => {
  const request = {
    spreadsheetId: ellipsis.env.CEO_BRIEFING_SHEET_ID,
    ranges: [ellipsis.env.CEO_BRIEFING_SHEET_NAME],
    auth: client,
  };
  sheets.spreadsheets.values.batchGet(request).then(res => {
    const actionItems = 
      res.data.valueRanges[0].values.slice(1).
        map(ea => {
          const user = ea[2].trim().length > 0 ? `<@${ea[2]}>` : ea[1];
          return {
            timestamp: ea[0],
            user: user,
            item: ea[5] 
          };
        }).
        filter(ea => Boolean(ea.item) && skipWords.indexOf(ea.item.trim().toLowerCase()) == -1);
    ellipsis.success(actionItems);
  });
});
}
