function(trelloList, ellipsis) {
  const actionItems = require('action-items')(ellipsis);
const sheetUrl = `https://docs.google.com/spreadsheets/d/${ellipsis.env.CEO_BRIEFING_SHEET_ID}/edit#gid=0`;

actionItems.fetch().then(items => {
  const toUpload = items.filter(ea => !ea.trelloLink);
  const hasItems = toUpload.length > 0;
  const label = "Create Trello card" + (toUpload.length === 1 ? "" : "s");
  const choices = [
    {
      label: label,
      actionName: "upload-action-items",
      args: [
        { name: "itemsJson", value: JSON.stringify(toUpload) },
        { name: "trelloList", value: trelloList.id }
      ]
    }
  ];
  ellipsis.success({
    hasItems: hasItems,
    items: toUpload,
    sheetUrl: sheetUrl,
    skipWords: actionItems.skipWords.map(ea => `\`${ea}\``).join(", ")
  }, {
    choices: hasItems ? choices : []
  });
});
}
