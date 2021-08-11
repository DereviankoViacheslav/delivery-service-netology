const { UserModel } = require('../user');

const create = async (data) => {
  const response = await UserModel.create(data);
  return response;
};

const findByEmail = async (email) => {
  const response = await UserModel.findOne({ email });
  return response;
};

const findOne = async (email, passwordHash) => {
  const response = await UserModel.findOne({ email, passwordHash });
  return response;
};

module.exports = { create, findByEmail, findOne };
