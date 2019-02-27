const fs = require('fs');
function Io() {
  return {
    save(db) {
      fs.writeFile("./store.db", JSON.stringify([...db]), function(err) {
        if(err) {
          return console.error(err);
        }
      });
    },
    read() {       
      return new Map(JSON.parse(fs.readFileSync('./store.db', 'utf8')));
    }
  }
}

module.exports = Io;