function(itemText, ellipsis) {
  const client = require('google-client')(ellipsis);
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const moment = require('moment-timezone');

const timestamp = moment.tz(ellipsis.teamInfo.timeZone).format('YYYY-MM-DD hh:mm:ss a');
const slackHandle = ellipsis.userInfo.messageInfo.details.profile.displayName;
const slackUserId = ellipsis.userInfo.messageInfo.userId;
const values = [
  [timestamp, slackHandle, slackUserId, itemText]
];
const sheetUrl = `https://docs.google.com/spreadsheets/d/${ellipsis.env.CEO_BRIEFING_SHEET_ID}/edit#gid=0`;

client.authorize().then(() => {
  const request = {
    spreadsheetId: ellipsis.env.CEO_BRIEFING_SHEET_ID,
    range: ellipsis.env.CEO_BRIEFING_SHEET_NAME,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: values
    },
    auth: client,
  };
  return sheets.spreadsheets.values.append(request).then(res => {
    const updated = res.data.updates.updatedRows;
    if (updated == 0) {
      ellipsis.error("Hmmm… I couldn't add your item for some reason.");
    } else {
      ellipsis.success({
        itemText: itemText,
        sheetUrl: sheetUrl
      });
    }
  });        
});
}
