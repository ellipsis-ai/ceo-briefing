{if successResult.didCreate}
I created cards for:

{for ea in successResult.created}
1. **{ea.item}** – {ea.user} – {ea.timestamp} – {ea.shortUrl}
{endfor}

{else}
No cards to create from [the Google Sheet]({successResult.sheetUrl}) right now!
{endif}