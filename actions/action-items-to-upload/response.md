{if successResult.hasItems}
Based on the info in the [Google Sheet]({successResult.sheetUrl}), I would create new Trello cards for the following:

{for ea in successResult.items}
1. **{ea.item}** – {ea.user} – {ea.timestamp}
{endfor}

{else}
Based on the info in the [Google Sheet]({successResult.sheetUrl}), I wouldn't create any Trello cards for action items right now.
{endif}
I create cards for rows where:
1. There is something in the `Action items` column
1. There is nothing in the `Trello card` column
1. The action item doesn't contain any "skip words" such as {successResult.skipWords}
