const Keyvalue = require('./keyvalue');

test('Create new should return new token and key if the request is successful', async () => {
		const keyvalue = Keyvalue();

		const response = await keyvalue.createNew();
		console.log(response);

		expect(response).toEqual({});
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
