const crypto = require('crypto');

function Token() {
  return {
    createNew() {
      return crypto.randomBytes(4).toString('hex');
    }
  };
}
module.exports = Token;
