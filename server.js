// if (process.env.NODE_ENV === 'development') require('dotenv').config({ silent: true });
'use strict';
require('dotenv').config({ silent: true });
const bodyParser    = require('body-parser');
const express       = require('express');
const logger        = require('morgan');
const path          = require('path');
const fetch         = require('node-fetch');
const twitter       = require('twitter');
const app           = express();
const PORT          = process.argv[2] || process.env.PORT || 3000;

const itunesapiRouter = require('./routes/itunesapi');
app.use('/itunesapi', itunesapiRouter);

const localapiRouter = require('./routes/localapi');
app.use('/localapi', localapiRouter);

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.listen(PORT, () => {console.log('Know what you dont know', PORT)});
