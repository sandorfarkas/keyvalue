const express = require('express');
const app = express();
const { config } = require('./config');
const bodyParser = require('body-parser')

const Token = require('./token');
const Store = require('./store');
const Keyvalue = require('./keyvalue');
const keyvalue = Keyvalue(Token, Store());

app.use(bodyParser.text({type: '*/*'}));

app.post('/new/:key', (req, res) => {
  const key = req.params.key;
  
  const response = keyvalue.createNew(key);
  
  if (response.token == undefined) {
    res.status(400).send("Invalid key");
  } else {
    res.status(201).send(`${config.url}:${config.port}/${response.token}/${response.key}`);
  }  
});

app.post('/:token/:key', (req, res) => {
  const entry = {
    token: req.params.token,
    key: req.params.key,
    value: req.body
  }

  const response = keyvalue.saveEntry(entry);

  if (response.value == undefined) {
    res.status(400).send();  
  } else {
    res.status(200).send(entry.value);
  }  
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