const app = require('./app');
const {config} = require('./config');

app.listen(config.port, () => {
  console.log(`Keyvalue listening on port ${config.port}!`);
});