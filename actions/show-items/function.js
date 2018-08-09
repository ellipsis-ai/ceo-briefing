function(ellipsis) {
  const gsheet = require('gsheet')(ellipsis);

gsheet.getAllRows(ellipsis.env.CEO_BRIEFING_SHEET_ID).then(res => {
  const values = res.data.valueRanges[0].values.slice(1).map(ea => {
    return {
      timestamp: ea[0],
      user: ea[1],
      text: ea[2]
    };
  });
  ellipsis.success(values);
});
}
