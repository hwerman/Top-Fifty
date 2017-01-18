const fetch = require('node-fetch');

function getOneCover(req, res, next){
  console.log(req.query.result);
  fetch(`http://itunes.apple.com/lookup?id=${req.query.result}&entity=album`)
  .then(r=>r.json())
  .then((data) =>{
    res.selectedC = data;
    next();
  })
  .catch(error => console.log(error));
  }

module.exports = { getOneCover };
