const Store = require('./store');

const TEST_ENTRY = {
  token: 'test-token',
  key: 'test-key',
  value: 'test-value'
};

describe('Add', () => {
  test('should add entry to store db', () => {
    const {store} = setup();

    store.add(TEST_ENTRY);

    expect(store.size()).toBe(1);
  });

  test('should overwrite entry if it is the same', () => {
    const {store} = setup();

    store.add(TEST_ENTRY);
    store.add(TEST_ENTRY);

    expect(store.size()).toBe(1);
  });

  test('should persist db', () => {
    const {store, saveSpy} = setup();

    store.add(TEST_ENTRY);

    expect(saveSpy).toHaveBeenCalledTimes(1);
  });
});

describe('Get', () => {
  test('Get should return entry by key', () => {
    const {store} = setup();

    store.add(TEST_ENTRY);

    expect(store.get(TEST_ENTRY.token, TEST_ENTRY.key)).toBe(TEST_ENTRY);
  });

  test('Get should return empty object when there is no entry with token and key', () => {
    const {store} = setup();

    store.add(TEST_ENTRY);

    expect(store.get('not-existing-token', TEST_ENTRY.key)).toEqual({});
    expect(store.get(TEST_ENTRY.token, 'not-existing-key')).toEqual({});
  });
});

describe('Contains', () => {
  test('Contains should return true if token and key is in db', () => {
    const {store} = setup();

    store.add(TEST_ENTRY);

    expect(store.contains(TEST_ENTRY)).toBe(true);
  });

  test('Contains should return false if token or key is not in db', () => {
    const {store} = setup();
    const entryNotInDb = {
      token: 'token-not-in-db',
      key: 'key-not-in-db'
    };

    expect(store.contains(entryNotInDb)).toBe(false);
  });
});

const setup = () => {
  const saveSpy = jest.fn();
  const io = {
    save: saveSpy,
    read: () => new Map(),
  };
  const store = Store({io});
  return {store, saveSpy};
};
