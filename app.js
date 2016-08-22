var express = require('express');
var https = require('https');
var config = require('../config.json');
var app = module.exports = express();
var route=require('../route.js');

https.createServer(app).listen(config.PORT_NUMBER);
    console.log("node  Server Launched Successfully!!!!");

app.get('/characternames', route.characternames);
app.get('/characters', route.characters);
app.get('/planetresidents', route.planetresidents);




   