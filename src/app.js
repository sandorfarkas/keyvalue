const express = require('express');
const app = express();
const { config } = require('./config');

const Token = require('./token');
const Keyvalue = require('./keyvalue');
const keyvalue = Keyvalue(Token);

app.post('/new/:key', async (req, res) => {
  const key = req.params.key;
  
  const response = await keyvalue.createNew(key);
  
  res.status(201).send(`${config.url}:${config.port}/` + response);
});

app.post('/:token/:key', (req, res) => {
  const token = req.params.token;
  const key = req.params.key;
  const value = req.body;
  res.send(keyvalue.storeValue(token, key, value));
});

app.post('/:token/:key/:value', (req, res) => {
  const token = req.params.token;
  const key = req.params.key;
  const value = req.params.value;
  res.send(keyvalue.storeValue(token, key, value));
});

app.get('/:token/:key', (req, res) => {
  const token = req.params.token;
  const key = req.params.key;
  // TODO token == new
  res.send(keyvalue.getValue(token, key));
});

app.get('/version', async (req, res) => {
  console.log('Get CouchDB version');
  res.send(await keyvalue.getCouchDBVersion());
});

module.exports = app;