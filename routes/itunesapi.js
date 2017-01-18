const itunesapiRouter = require('express').Router();
const { getOneCover } = require('../services/itunes');

itunesapiRouter.get('/', getOneCover, (req, res) => {
  res.json(res.selectedC);
});

module.exports =  itunesapiRouter;
