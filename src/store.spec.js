const Store = require('./store');
const store = Store();

const TEST_ENTRY = {
  token: "test-token",
  key: "test-key",
  value: "test-value"
}

test('should have db map', () => {
  expect(store.db).toBeInstanceOf(Map);
});

describe('Add', () => {
  test('should add entry to store db', () => {
    store.add(TEST_ENTRY);
    
    expect(store.getSize()).toBe(1);
  });
  
  test('should rewrite entry if it is the same', () => {
    store.add(TEST_ENTRY);
    store.add(TEST_ENTRY);
  
    expect(store.getSize()).toBe(1);
  });
});

describe('Get', () => {
  test('Get should return entry by key', () => {
    store.add(TEST_ENTRY);
    
    expect(store.get(TEST_ENTRY.token, TEST_ENTRY.key)).toBe(TEST_ENTRY);
  });
  
  test('Get should return empty object when there is no entry with token and key', () => {
    store.add(TEST_ENTRY);
  
    expect(store.get("not-existing-token", TEST_ENTRY.key)).toEqual({});
    expect(store.get(TEST_ENTRY.token, "not-existing-key")).toEqual({});
  });
});

describe('Contains', () => {
  test('Contains should return true if token and key is in db', () => {
    store.add(TEST_ENTRY);
    
    expect(store.contains(TEST_ENTRY)).toBe(true);
  });

  test('Contains should return false if token or key is not in db', () => {
    const entryNotInDb = {
      token: "token-not-in-db",
      key: "key-not-in-db"
    }
    
    expect(store.contains(entryNotInDb)).toBe(false);
  });
});
