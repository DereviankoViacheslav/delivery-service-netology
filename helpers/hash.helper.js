const crypto = require('crypto');

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

const hashHelper = {
  getHashedData(data) {
    return crypto
      .createHmac('sha256', tokenKey)
      .update(data + tokenKey)
      .digest('hex');
  }
};

module.exports = hashHelper;
