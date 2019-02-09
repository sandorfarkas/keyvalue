const crypto = require('crypto');
const express = require('express');
const app = express();
const port = 3000;
const Keyvalue = require('./keyvalue');
const keyvalue = Keyvalue();

app.use(express.json());

app.post('/new/:key', async (req, res) => {
  const key = req.params.key;
  console.log(`Request key: ${key}`);
  const response = await keyvalue.registerKey(key);
  res.status(response.status).send();
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

app.listen(port, () => {
  console.log(`Keyvalue listening on port ${port}!`);
});

function f() {
	return crypto.randomBytes(48).toString('hex');
}