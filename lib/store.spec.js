const sinon = require('sinon');
const Store = require('./store');
let io;
let store;

const TEST_ENTRY = {
  token: 'test-token',
  key: 'test-key',
  value: 'test-value'
};

beforeEach(() => {
  io = {
    save() {
    },
    read() {
      return new Map();
    }
  };
  store = Store({io});
});

describe('Add', () => {
  test('should add entry to store db', () => {
    store.add(TEST_ENTRY);

    expect(store.getSize()).toBe(1);
  });

  test('should overwrite entry if it is the same', () => {
    store.add(TEST_ENTRY);
    store.add(TEST_ENTRY);

    expect(store.getSize()).toBe(1);
  });

  test('should persist db', () => {
    store = Store({io});
    const ioSaveSpy = sinon.spy(io, 'save');

    store.add(TEST_ENTRY);

    expect(ioSaveSpy.callCount).toBe(1);
    ioSaveSpy.restore();
  });
});

describe('Get', () => {
  test('Get should return entry by key', () => {
    store.add(TEST_ENTRY);

    expect(store.get(TEST_ENTRY.token, TEST_ENTRY.key)).toBe(TEST_ENTRY);
  });

  test('Get should return empty object when there is no entry with token and key', () => {
    store.add(TEST_ENTRY);

    expect(store.get('not-existing-token', TEST_ENTRY.key)).toEqual({});
    expect(store.get(TEST_ENTRY.token, 'not-existing-key')).toEqual({});
  });
});

describe('Contains', () => {
  test('Contains should return true if token and key is in db', () => {
    store.add(TEST_ENTRY);

    expect(store.contains(TEST_ENTRY)).toBe(true);
  });

  test('Contains should return false if token or key is not in db', () => {
    const entryNotInDb = {
      token: 'token-not-in-db',
      key: 'key-not-in-db'
    };

    expect(store.contains(entryNotInDb)).toBe(false);
  });
});
