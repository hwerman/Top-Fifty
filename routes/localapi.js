const localapiRouter = require('express').Router();
const { getRandomArtist } = require('../models/covers');

localapiRouter.get('/', getRandomArtist, (req, res) => {
  res.json(res.selectedA);
});

module.exports =  localapiRouter;
