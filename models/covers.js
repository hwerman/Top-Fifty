const db = require('../lib/db');

function getRandomArtist(req, res, next) {
const tab = Math.floor(Math.random()*50 +1)
  console.log('this is tab', tab);
  db.any(`SELECT * FROM skyartists WHERE id=${tab};`)
    .then((data) => {
      console.log('getrandomartist', data)
      res.selectedA = data;
      next();
    })
    .catch(error => console.log(error));
}

module.exports = { getRandomArtist };

