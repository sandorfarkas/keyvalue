const expect = require('chai').expect;
const Keyvalue = require('./keyvalue');

describe('Keyvalue', function() {
	it('registerKey should return status ')

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
	});
});