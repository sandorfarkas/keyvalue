const app = require('./app');
const {port} = require('./config');

app.listen(port, () => {
  console.log(`Keyvalue listening on port ${port}!`);
});
