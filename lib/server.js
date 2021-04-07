const App = require('./app');
const { port, ...config } = require('./config');

App(config).listen(port, () => {
  console.log(`Keyvalue listening on port ${port}!`);
});
