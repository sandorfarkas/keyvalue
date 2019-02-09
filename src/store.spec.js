const Store = require('./store');
const store = Store();

test('Should have db list', () => {
  expect(store.db).toEqual([]);
});