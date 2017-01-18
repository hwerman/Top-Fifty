const fetch = require('node-fetch');
const CONSUMER_KEY=process.env.CONSUMER_KEY;
const CONSUMER_SECRET=process.env.CONSUMER_SECRET
const TOKEN=process.env.TOKEN
const TOKEN_SECRET=process.env.TOKEN_SECRET
const BEARER_KEY=process.env.BEARER_KEY

function getOneTweet(req,res,next){
  console.log(this)
  fetch(`https://api.twitter.com/1.1/users/show.json?screen_name=kanyewest&count=17&oauth_consumer_key=${process.env.CONSUMER_KEY}&oauth_token=${process.env.TOKEN}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1481205109&oauth_nonce=hEZsheebqkx&oauth_version=1.0&oauth_signature=AiECOqlllmjA/xbXKDegdPK3Hr8=`)
  .then(r=>r.json())
  .then((answer) =>{
    res.tweeter = answer;
    next()
  })
  .catch(error => console.log(error));
}
