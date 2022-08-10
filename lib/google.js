const google = require('google-it');

google({'query': 'Brasileirao'}).then(results => {
  console.log(results)
}).catch(e => {
  console.log('erro');
})