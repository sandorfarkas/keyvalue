function Store({io, inMemoryDb}) {
  return {
    db: init({io, inMemoryDb}),
    add(entry) {
      this.db.set(`${entry.token}:${entry.key}`, entry);
      if (!inMemoryDb) {
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

function init({io, inMemoryDb}) {
  if (io.fileExists('store.db') && !inMemoryDb) {
    return io.read();
  }
  else {
    return new Map();
  }
}

module.exports = Store;
