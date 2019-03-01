const { config } = require("./config");

function Store(io) {
  return {
    db: init(io),
    add(entry) {
      this.db.set(`${entry.token}:${entry.key}`, entry);
      if (config.mode == "prod") {
        io.save(this.db);
      }
    },
    get(token, key) {
      entry = this.db.get(`${token}:${key}`);
      return (entry == undefined) ? {} : entry;
    },
    getSize() {
      return this.db.size;
    },
    contains(entry) {
      return (this.db.get(`${entry.token}:${entry.key}`) == undefined) ? false : true;
    }
  }
}

function init(io) {
  if (io.fileExists("store.db") && config.mode != "test") {
    return io.read();
  } else {
    return new Map();
  }
}

module.exports = Store;