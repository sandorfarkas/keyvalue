function Store({io, inMemoryDb}) {
  const db = init({io, inMemoryDb});
  return {
    add(entry) {
      db.set(`${entry.token}:${entry.key}`, entry);
      if (!inMemoryDb) {
        io.save(db);
      }
    },
    get(token, key) {
      const entry = db.get(`${token}:${key}`);
      return (entry == undefined) ? {} : entry;
    },
    getSize() {
      return db.size;
    },
    contains(entry) {
      return (db.get(`${entry.token}:${entry.key}`) == undefined) ? false : true;
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
