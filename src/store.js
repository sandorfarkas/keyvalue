module.exports = Store;

function Store() {
  return {
    db: [],
    add(entry) {
      this.db.push(entry);
    },
    getSize() {
      return this.db.length;
    }
  }
}