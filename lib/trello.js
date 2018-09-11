/*
@exportId kCSWK4UZQpmYOVsOKYmO4w
*/
module.exports = (function() {
const request = require('request');

return ellipsis => {
  return {
    createCard: createCard,
    getLists: getLists
  };
  
  function getLists(boardId) {
    return new Promise((resolve, reject) => {
      const key = ellipsis.env.TRELLO_APP_KEY;
      const token = ellipsis.accessTokens.trello;

      var options = { 
        method: 'GET',
        url: `https://api.trello.com/1/boards/${boardId}/lists`,
        qs: { cards: 'none', fields: 'name', token: token, key: key },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }
  
  function createCard(name, description, listId) {
    return new Promise((resolve, reject) => {
      const key = ellipsis.env.TRELLO_APP_KEY;
      const token = ellipsis.accessTokens.trello;

      var options = { 
        method: 'POST',
        url: 'https://api.trello.com/1/cards',
        qs: { idList: listId, token: token, key: key, name: name, desc: description },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });

  }

};

})()
     