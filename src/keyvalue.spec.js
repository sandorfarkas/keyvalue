const sinon = require('sinon');
const Keyvalue = require('./keyvalue');

const TEST_KEY = "test-key";
const TEST_TOKEN = "test-token";
const INVALID_KEYS = [];
const mockToken = () => {
	return {
		createNew() {
			return TEST_TOKEN;
		}
	}
}
const mockStore = () => {
  return {
		add() {
		},
		contains() {
		}
	}
}
const store = mockStore();
const keyvalue = Keyvalue(mockToken, store);

beforeAll(() => {
	createInvalidKeys();
});

describe('Create new', () => {
	test('should return new token and key if the request is successful', () => {
		const response = keyvalue.createNew(TEST_KEY);
	
		expect(response).toEqual({ token: TEST_TOKEN, key: TEST_KEY });
	});

	test('should return empty object when key is invalid', () => {
		INVALID_KEYS.forEach((key) => {
			let response = keyvalue.createNew(key);
			expect(response).toEqual({});
		});
	});
	
	test('should add new token and key to db', () => {
		const storeAddSpy = sinon.spy(store, 'add');
		keyvalue.createNew(TEST_KEY);

		expect(storeAddSpy.callCount).toBe(1);
		storeAddSpy.restore();
	});
});

describe('Is valid key', () => {
	test('should return false if key contains invalid characters', () => {	
		INVALID_KEYS.forEach(key =>	expect(keyvalue.isValidKey(key)).toBe(false));
	});
	
	test('should return true if key does not contain invalid characters', () => {	
		expect(keyvalue.isValidKey(TEST_KEY)).toBe(true);
	});
});

describe('Save entry', () => {
	test('should return empty object when key is invalid', () => {
		const invalidEntry = {
			token: "test-token",
			key: ".invalid-key",
			value: "test-value"
		}
		
		expect(keyvalue.saveEntry(invalidEntry)).toEqual({});
	});

	test('should return empty object when value is empty', () => {
		const entryWithEmptyValue = {
			token: "test-token",
			key: "test-key",
			value: ""
		}

		expect(keyvalue.saveEntry(entryWithEmptyValue)).toEqual({});
	});

	test('should return empty object when token/key is not in db', () => {
		const entryNotInDb = {
			token: "test-token-not-in-db",
			key: "test-key-not-in-db",
			value: "test-value-not-in-db"
		}

		expect(keyvalue.saveEntry(entryNotInDb)).toEqual({});
	});

	test('should call store contains', () => {
		const storeAddSpy = sinon.spy(store, 'contains');
		keyvalue.saveEntry({ token: TEST_TOKEN, key: TEST_KEY, value: "test-value"});

		expect(storeAddSpy.callCount).toBe(1);
		storeAddSpy.restore();
	});
});

function createInvalidKeys() {
	INVALID_KEYS.push(".invalid-key");
	INVALID_KEYS.push("$invalid-key");
	INVALID_KEYS.push("#invalid-key");
	INVALID_KEYS.push("[invalid-key");
	INVALID_KEYS.push("]invalid-key");
	INVALID_KEYS.push("/invalid-key");
	for (let i = 0; i < 32; i++) {
		INVALID_KEYS.push(String.fromCharCode(i) + "invalid-key");
	}
	INVALID_KEYS.push(String.fromCharCode(127) + "invalid-key");
}