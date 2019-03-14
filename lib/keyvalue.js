module.exports = function Keyvalue({Token, store}) {
  return {
    createNew(key) {
      if (!this.isValidKey(key)) {
        return {};
      }
      const newToken = Token().createNew();
      const entry = {token: newToken, key: key};
      store.add(entry);
      return entry;
    },
    saveEntry(entry) {
      if (!this.isValidKey(entry.key) || !entry.value || !store.contains(entry) ) {
        return {};
      }
      store.add(entry);
      return entry;
    },
    getEntry(entry) {
      if (store.contains(entry)) {
        return store.get(entry.token, entry.key);
      }
      else {
        return {};
      }
    },
    isValidKey(key) {
      return !any(isInvalidChar, key);
    }
  };
}

function isInvalidChar(char) {
  const blacklist = '.$#[]/';
  const charCode = char.charCodeAt(0);
  return blacklist.includes(char) || (charCode >= 0 && charCode <= 31) || charCode == 127;
}

// Used the same way as Ramda any
function any(predicate, iterable) {
  for (const element of iterable) {
    if (predicate(element)) return true;
  }
  return false;
}
