function Store() {
  return {
    db: new Map(),
    add(entry) {
      this.db.set(`${entry.token}:${entry.key}`, entry);
    },
    get(token, key) {
      entry = this.db.get(`${token}:${key}`);
      return (entry == undefined) ? {} : entry;
    },
    getSize() {
      return this.db.size;
    }
  }
}

module.exports = Store;