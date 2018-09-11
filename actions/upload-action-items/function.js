function(trelloList, ellipsis) {
  const actionItems = require('action-items')(ellipsis);
const trello = require('trello')(ellipsis);
const client = require('google-client')(ellipsis);
const {google} = require('googleapis');
const sheets = google.sheets('v4');

const sheetUrl = `https://docs.google.com/spreadsheets/d/${ellipsis.env.CEO_BRIEFING_SHEET_ID}/edit#gid=0`;

actionItems.fetch().then(items => {
  const toUpload = items.filter(ea => !ea.trelloLink);
  Promise.all(toUpload.map(ea => {
    return createCardFor(ea);
  })).then(res => {
    ellipsis.success({
      didCreate: toUpload.length > 0,
      created: res,
      sheetUrl: sheetUrl
    });
  });  
});

function createCardFor(actionItem) {
  return trello.createCard(actionItem.item, null, trelloList.id).then(cardRes => {
    return setCardUrlFor(cardRes.shortUrl, actionItem.rowIndex).then(urlRes => {
      return {
        item: actionItem.item,
        user: actionItem.user,
        timestamp: actionItem.timestamp,
        shortUrl: cardRes.shortUrl
      };
    });
  });
}

function setCardUrlFor(url, rowIndex) {
  return client.authorize().then(() => {
    const request = {
      spreadsheetId: ellipsis.env.CEO_BRIEFING_SHEET_ID,
      range: `${ellipsis.env.CEO_BRIEFING_SHEET_NAME}!G${rowIndex}:G${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[url]]
      },
      auth: client,
    };
    return sheets.spreadsheets.values.update(request).then(res => {
      return res.data.updates;
    });
  });
}
}
