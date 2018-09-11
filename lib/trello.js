/*
@exportId kCSWK4UZQpmYOVsOKYmO4w
*/
module.exports = (function() {
const request = require('request');

return ellipsis => {
  return {
    createCard: createCard,
    getLists: getLists,
    searchMembers: searchMembers,
    getMe: getMe
  };
  
  function getMe() {
    return new Promise((resolve, reject) => {
      const key = ellipsis.env.TRELLO_APP_KEY;
      const token = ellipsis.accessTokens.trello;

      var options = { 
        method: 'GET',
        url: "https://api.trello.com/1/members/me",
        qs: { token: token, key: key },
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
  
  function searchMembers(query) {
    return getMe().then(me => {
      return new Promise((resolve, reject) => {
        const key = ellipsis.env.TRELLO_APP_KEY;
        const token = ellipsis.accessTokens.trello;

        var options = { 
          method: 'GET',
          url: `https://api.trello.com/1/search/members/`,
          qs: { query: query, idOrganization: me.idOrganizations[0], onlyOrgMembers: true, token: token, key: key },
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
    });
  }
  
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
  
  function createCard(name, description, listId, userName) {
    return searchMembers(userName).then(membersRes => {
      return new Promise((resolve, reject) => {
        const key = ellipsis.env.TRELLO_APP_KEY;
        const token = ellipsis.accessTokens.trello;
        
        const memberId = membersRes[0]? membersRes[0].id : undefined;

        var options = { 
          method: 'POST',
          url: 'https://api.trello.com/1/cards',
          qs: { idList: listId, idMembers: memberId, token: token, key: key, name: name, desc: description },
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
    });
  }

};

})()
     