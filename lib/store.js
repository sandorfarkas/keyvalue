module.exports = function Store({io}) {
  const db = io.read();
  return {
    add(entry) {
      db.set(`${entry.token}:${entry.key}`, entry);
      io.save(db);
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
};
