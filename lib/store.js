function Store({io, mode}) {
  return {
    db: init({io, mode}),
    add(entry) {
      this.db.set(`${entry.token}:${entry.key}`, entry);
      if (mode == 'prod') {
        io.save(this.db);
      }
    },
    get(token, key) {
      const entry = this.db.get(`${token}:${key}`);
      return (entry == undefined) ? {} : entry;
    },
    getSize() {
      return this.db.size;
    },
    contains(entry) {
      return (this.db.get(`${entry.token}:${entry.key}`) == undefined) ? false : true;
    }
  };
}

function init({io, mode}) {
  if (io.fileExists('store.db') && mode != 'test') {
    return io.read();
  }
  else {
    return new Map();
  }
}

module.exports = Store;
