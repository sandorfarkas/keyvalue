const Store = require('./store');
const store = Store();

const TEST_ENTRY = {
  token: "test-token",
  key: "test-key"
}

test('Should have db list', () => {
  expect(store.db).toEqual([]);
});

test('Add should add entry to store db', () => {
  store.add(TEST_ENTRY);
  
  expect(store.getSize()).toBe(1);
});