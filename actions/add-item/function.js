function(itemText, ellipsis) {
  const gsheet = require('gsheet')(ellipsis);

const timestamp = (new Date()).toString();
const slackHandle = ellipsis.userInfo.messageInfo.details.profile.displayName;

gsheet.addRows(ellipsis.env.CEO_BRIEFING_SHEET_ID, [
  [timestamp, slackHandle, itemText]
]).then(res => {
  const updated = res.data.updates.updatedRows;
  if (updated == 0) {
    ellipsis.error("Hmmm… I couldn't add your item for some reason.");
  } else {
    ellipsis.success(itemText);
  }
});
}
