const Keyvalue = require('./keyvalue');

const TEST_KEY = 'test-key';
const TEST_TOKEN = 'test-token';
const INVALID_KEYS = [];
const Token = () => ({createNew: () => TEST_TOKEN});

beforeAll(() => {
  createInvalidKeys();
});

describe('Create new', () => {
  test('should return new token and key if the request is successful', () => {
    const {keyvalue} = setup();

    const response = keyvalue.createNew({key: TEST_KEY});

    expect(response).toEqual({token: TEST_TOKEN, key: TEST_KEY});
  });

  test('should return empty object when key is invalid', () => {
    const {keyvalue} = setup();
    INVALID_KEYS.forEach((key) => {
      const response = keyvalue.createNew({key});

      expect(response).toEqual({});
    });
  });

  test('should add new token and key to db', () => {
    const {keyvalue, addSpy} = setup();
    keyvalue.createNew({key: TEST_KEY});

    expect(addSpy).toHaveBeenCalledTimes(1);
  });
});

describe('Is valid key', () => {
  test('should return false if key contains invalid characters', () => {
    const {keyvalue} = setup();

    INVALID_KEYS.forEach(key =>	expect(keyvalue.isValidKey({key})).toBe(false));
  });

  test('should return true if key does not contain invalid characters', () => {
    const {keyvalue} = setup();

    expect(keyvalue.isValidKey({key: TEST_KEY})).toBe(true);
  });
});

describe('Save entry', () => {
  test('should return empty object when key is invalid', () => {
    const {keyvalue} = setup();
    const invalidEntry = {
      token: 'test-token',
      key: '.invalid-key',
      value: 'test-value'
    };

    expect(keyvalue.saveEntry({entry: invalidEntry})).toEqual({});
  });

  test('should return empty object when value is empty', () => {
    const {keyvalue} = setup();
    const entryWithEmptyValue = {
      token: 'test-token',
      key: 'test-key',
      value: ''
    };

    expect(keyvalue.saveEntry({entry: entryWithEmptyValue})).toEqual({});
  });

  test('should return empty object when token/key is not in db', () => {
    const {keyvalue} = setup({contains: false});

    const entryNotInDb = {
      token: 'test-token-not-in-db',
      key: 'test-key-not-in-db',
      value: 'test-value-not-in-db'
    };

    expect(keyvalue.saveEntry({entry: entryNotInDb})).toEqual({});
  });

  test('should call store contains', () => {
    const {keyvalue, containsSpy} = setup();

    keyvalue.saveEntry({entry: {token: TEST_TOKEN, key: TEST_KEY, value: 'test-value'}});

    expect(containsSpy).toHaveBeenCalledTimes(1);
  });

  test('should call store add', () => {
    const {keyvalue, addSpy} = setup();

    keyvalue.saveEntry({entry: {token: TEST_TOKEN, key: TEST_KEY, value: 'test-value'}});

    expect(addSpy).toHaveBeenCalledTimes(1);
  });

  test('should return entry if it can be saved', () => {
    const {keyvalue} = setup();
    const entry = {token: TEST_TOKEN, key: TEST_KEY, value: 'test-value'};
    const actualEntry = keyvalue.saveEntry({entry});

    expect(actualEntry).toBe(entry);
  });
});

describe('Get entry', () => {
  test('should return empty object if token and key are not in db', () => {
    const {keyvalue} = setup({contains: false});

    expect(keyvalue.getEntry({entry: {token: 'token-not-in-db', key: 'key-not-in-db'}})).toEqual({});
  });

  test('should return entry for token and key', () => {
    const entry = {
      key: 'test-key',
      token: 'test-token',
      value: 'test-value',
    };
    const {keyvalue} = setup({entry});

    keyvalue.saveEntry({entry});

    expect(keyvalue.getEntry({entry})).toBe(entry);
  });
});

const setup = ({contains = true, entry = {}} = {}) => {
  const addSpy = jest.fn();
  const containsSpy = jest.fn().mockReturnValue(contains);
  const store = {
    add: addSpy,
    contains: containsSpy,
    get: () => entry,
  };
  const keyvalue = Keyvalue({Token, store});
  return {keyvalue, addSpy, containsSpy};
};

const createInvalidKeys = () => {
  INVALID_KEYS.push('.invalid-key');
  INVALID_KEYS.push('$invalid-key');
  INVALID_KEYS.push('#invalid-key');
  INVALID_KEYS.push('[invalid-key');
  INVALID_KEYS.push(']invalid-key');
  INVALID_KEYS.push('/invalid-key');
  for (let i = 0; i < 32; i++) {
    INVALID_KEYS.push(String.fromCharCode(i) + 'invalid-key');
  }
  INVALID_KEYS.push(String.fromCharCode(127) + 'invalid-key');
};
