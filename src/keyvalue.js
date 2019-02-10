module.exports = Keyvalue;

function Keyvalue(Token) {
	return {
		async createNew(key) {
			const newToken = Token().createNew();
			return `${newToken}/${key}`;
		}
	}
}

/*function Keyvalue({ _gateway = gateway } = {}) {
	return {
		async createNew(key) {
			return `{token}/${key}`;
		},

		async registerKey(key) {
			let gatewayResponse = await _gateway.registerKey(key);
			console.log(gatewayResponse);
			let response = {};
			if (gatewayResponse.status == 409) {
				response.status = 409;
			} else {
				response.status =  201;
				response.data = gatewayResponse.data;
			}
			console.log('registerKey response', response);
			return response;
		},
		
		storeValue(token, key, value) {
			return 'Received token1: ' + token + ' key: ' + key + ' value: ' + JSON.stringify(value);
		},
		
		getValue(token, key) {
			return 'Received token2: ' + token + ' key: ' + key;
		},
		
		async getCouchDBVersion() {
			return await _gateway.getVersion();
		}
	};
}*/