const express = require('express');
const bodyParser = require('body-parser');
const Token = require('./token');
const Store = require('./store');
const Io = require('./io');
const Keyvalue = require('./keyvalue');

module.exports = function App({inMemoryDb, publicHost}) {
  const app = express();
  const io = Io({inMemoryDb});
  const keyvalue = Keyvalue({Token, store: Store({io})});

  app.use(bodyParser.text({type: '*/*'}));

  app.post('/new/:key', (req, res) => {
    const key = req.params.key;

    const response = keyvalue.createNew({key});

    if (response.token == undefined) {
      res.status(400).send('Invalid key');
    }
    else {
      res.status(201).send(`${publicHost}/${response.token}/${response.key}`);
    }
  });

  app.post('/:token/:key', (req, res) => {
    const entry = {
      token: req.params.token,
      key: req.params.key,
      value: req.body
    };

    const response = keyvalue.saveEntry({entry});

    if (response.value == undefined) {
      res.status(400).send();
    }
    else {
      res.status(200).send(entry.value);
    }
  });

  app.post('/:token/:key/:value', (req, res) => {
    const entry = {
      token: req.params.token,
      key: req.params.key,
      value: req.params.value
    };

    const response = keyvalue.saveEntry({entry});

    if (response.value == undefined) {
      res.status(400).send();
    }
    else {
      res.status(200).send(entry.value);
    }
  });

  app.get('/:token/:key', (req, res) => {
    const token = req.params.token;
    const key = req.params.key;

    const response = keyvalue.getEntry({token: token, key: key});

    if (response.value == undefined) {
      res.status(400).send();
    }
    else {
      res.status(200).send(response.value);
    }
  });
  return app;
};
