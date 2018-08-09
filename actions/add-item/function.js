function(itemText, ellipsis) {
  const client = require('google-client')(ellipsis);
const {google} = require('googleapis');
const sheets = google.sheets('v4');

const timestamp = (new Date()).toString();
const slackHandle = ellipsis.userInfo.messageInfo.details.profile.displayName;
const values = [
  [timestamp, slackHandle, itemText]
];
client.authorize().then(() => {
  const request = {
    spreadsheetId: ellipsis.env.CEO_BRIEFING_SHEET_ID,
    range: 'Form Responses 1',
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
      ellipsis.success(itemText);
    }
  });        
});
}
