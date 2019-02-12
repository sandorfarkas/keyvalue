const Store = require('./store');
const store = Store();

const TEST_ENTRY = {
  token: "test-token",
  key: "test-key",
  value: "test-value"
}

test('Should have db list', () => {
  expect(store.db).toBeInstanceOf(Map);
});

test('Add should add entry to store db', () => {
  store.add(TEST_ENTRY);
  
  expect(store.getSize()).toBe(1);
});

test('Add should rewrite entry if it is the same', () => {
  store.add(TEST_ENTRY);
  store.add(TEST_ENTRY);

  expect(store.getSize()).toBe(1);
});


test('Get should return entry by key', () => {
  store.add(TEST_ENTRY);
  
  expect(store.get(TEST_ENTRY.token, TEST_ENTRY.key)).toBe(TEST_ENTRY);
});

test('Get should return empty object when there is no entry with token and key', () => {
  store.add(TEST_ENTRY);

  expect(store.get("not-existing-token", TEST_ENTRY.key)).toEqual({});
  expect(store.get(TEST_ENTRY.token, "not-existing-key")).toEqual({});
});