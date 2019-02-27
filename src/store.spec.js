const { config } = require("./config");
config.mode = "test";
const sinon = require('sinon');
const Store = require('./store');
let mockFs;
let mockIo;
let fs;
let io;
let store;

const TEST_ENTRY = {
  token: "test-token",
  key: "test-key",
  value: "test-value"
}

beforeEach(() => {
  mockFs = () => {
    return {
      existsSync() {
        return true;
      }
    }
  };
  mockIo = () => {
    return {
      save() {
      },
      read() {
      }
    }
  };
  fs = mockFs();
  io = mockIo();
  store = Store(fs, io);
});

describe('db', () => {
  test('should be empty map in test mode', () => {
    expect(store.db).toBeInstanceOf(Map);
  });

  test('should be empty map in prod mode when store.db not exists', () => {
    config.mode = "prod";
    const mockFs = () => {
      return {
        existsSync() {
          return false;
        }
      }
    };
    fs = mockFs();
    store = Store(fs, io);

    expect(store.db).toBeInstanceOf(Map);
    expect(store.db.size).toBe(0);
    config.mode = "test";
  });

  test('should load map in prod mode from store.db file when it exists', () => {
    config.mode = "prod";
    const ioReadSpy = sinon.spy(io, 'read');

    store = Store(fs, io);

    expect(ioReadSpy.callCount).toBe(1);
    config.mode = "test";
		ioReadSpy.restore();
  });
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

  test('should save the added entry to a file in prod mode', () => {
    config.mode = "prod";
    const ioReadSpy = sinon.spy(io, 'save');
		
    store.add(TEST_ENTRY);

    expect(ioReadSpy.callCount).toBe(1);
    config.mode = "test";
		ioReadSpy.restore();
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
