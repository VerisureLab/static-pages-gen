const serverless = require('serverless-http');
const express = require('express')
const app = express()
const putJson = require('./utility').putJson;
const flatten = require('./utility').flatten;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.post('/load', (req, res) => {
    const json = putJson(req.body);
    res.send(json)
})

app.post('/flat', (req, res) => {
    const json = flatten(req.body);
    res.send(json)
})

module.exports.handler = serverless(app);