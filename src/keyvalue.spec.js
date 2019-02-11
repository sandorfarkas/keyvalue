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
const keyvalue = Keyvalue(mockToken);

beforeAll(() => {
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
});

test('Create new should return new token and key if the request is successful', () => {
	const response = keyvalue.createNew(TEST_KEY);

	expect(response).toEqual({ token: TEST_TOKEN, key: TEST_KEY });
});

test('Create new should return empty object when key is invalid', () => {
	INVALID_KEYS.forEach((key) => {
		let response = keyvalue.createNew(key);
		expect(response).toEqual({});
	});
});

test('Validate key should return false if key contains invalid characters', () => {	
	INVALID_KEYS.forEach(key =>	expect(keyvalue.validateKey(key)).toBe(false));
});

test('Validate key should return true if key does not contain invalid characters', () => {	
	expect(keyvalue.validateKey(TEST_KEY)).toBe(true);
});