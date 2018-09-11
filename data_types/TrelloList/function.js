function(ellipsis) {
  const trello = require('trello')(ellipsis);

trello.getLists(ellipsis.env.CEO_BRIEFING_BOARD_ID).then(res => {
  ellipsis.success(res.map(ea => {
    return {
      id: ea.id,
      label: ea.name
    };
  }))
});
}
