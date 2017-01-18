const twitterapiRouter = require('express').Router();
const { getOneTweet } = require('../services/twitter');

twitterapiRouter.get('/', getOneTweet, (req, res) => {
  res.json(res.tweet);
});

module.exports =  twitterapiRouter;
