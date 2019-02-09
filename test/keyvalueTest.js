const expect = require('chai').expect;
const sinon = require('sinon');
const keyvalue = require('../src/keyvalue');

describe('Keyvalue', function() {
	before(function() {
		keyvalue.setGateway('../test/mockGateway');
	});
	
	it('registerkey should return status 409 when gateway returns status 409', async function() {
		const response = await keyvalue.registerKey();
		expect(response.status).to.equal(409);
	});
});