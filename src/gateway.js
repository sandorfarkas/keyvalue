const axios = require('axios');
const couchDBUrl = 'http://admin:lalala@localhost:5984';

module.exports = Gateway();

function Gateway() {
	return {
		async registerKey(key) {
			return axios.put(couchDBUrl + '/store/' + key, {})
				.then(response => wtf(response).status)
				.catch(err => err.response);
		},

		async getVersion() {
			return axios.get(couchDBUrl)
				.then(response => response.data)
				.catch(err => err.message);
		}
	}
}