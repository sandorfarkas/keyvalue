function Io(fs) {
  return {
    save(db) {
      fs.writeFile('./store.db', JSON.stringify([...db]), function(err) {
        if(err) {
          return console.error(err);
        }
      });
    },
    read() {       
      return new Map(JSON.parse(fs.readFileSync('./store.db', 'utf8')));
    },
    fileExists(file) {
      return fs.existsSync(file);
    }
  };
}

module.exports = Io;