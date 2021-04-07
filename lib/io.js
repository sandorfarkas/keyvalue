const fs = require('fs');

module.exports = function Io({ inMemoryDb, _fs = fs }) {
  return {
    save(db) {
      if (inMemoryDb) return;

      _fs.writeFile('./store.db', JSON.stringify([...db]), function(err) {
        if(err) {
          return console.error(err);
        }
      });
    },
    read() {
      if (_fs.existsSync('store.db') && !inMemoryDb) {
        return new Map(JSON.parse(_fs.readFileSync('./store.db', 'utf8')));
      }
      else {
        return new Map();
      }
    }
  };
};
