const MessageModel = require('./message.model');

const create = async (data) => {
  const response = await MessageModel.create(data);
  return response;
};

module.exports = { create };
