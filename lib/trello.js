/*
@exportId kCSWK4UZQpmYOVsOKYmO4w
*/
module.exports = (function() {
const request = require('request');

return ellipsis => {
  return {
    createCard: createCard
  };
  
  function createCard(name, description, listId) {
    const listId = ellipsis.env.CEO_BRIEFING_LIST_ID;

    const key = ellipsis.env.TRELLO_APP_KEY;
    const token = ellipsis.accessTokens.trello;

    const url = `https://api.trello.com/1/boards/${boardId}?key=${key}&token=${token}`;
    var options = { 
      method: 'POST',
      url: 'https://api.trello.com/1/cards',
      qs: { idList: listId, token: token, key: key } 
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
  }

};

})()
     