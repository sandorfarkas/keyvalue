const Keyvalue = require('./keyvalue');

test('Create new should return new token and key if the request is successful', async () => {
		const TEST_KEY = "test-key";
		const TEST_TOKEN = "test-token";
		const mockToken = () => {
			return {
				createNew() {
					return TEST_TOKEN;
				}
			}
		}
		const keyvalue = Keyvalue(mockToken);

		const response = await keyvalue.createNew(TEST_KEY);

		expect(response).toEqual(`${TEST_TOKEN}/${TEST_KEY}`);
});

/*
	it('registerKey should return status 409 when gateway returns status 409', async () => {
		const mockGateway = function mockGateway() {
			return {
				registerKey(key) {
					let response = {
						status: 409
					}
					return response;
				}	
			}
		}
		const keyvalue = Keyvalue({ _gateway: mockGateway() });
		
		const response = await keyvalue.registerKey();
		
		expect(response.status).to.equal(409);
	});*/
