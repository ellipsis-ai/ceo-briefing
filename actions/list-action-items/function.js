function(ellipsis) {
  const actionItems = require('action-items')(ellipsis);

actionItems.fetch().then(items => {
  ellipsis.success(items.map(ea => Object.assign({}, ea, { trelloLink: ea.trelloLink || "no Trello card yet" })));
});
}
