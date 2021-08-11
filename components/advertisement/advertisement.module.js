const AdvertisementModel = require('./advertisement.model');

const create = async (data) => {
  const response = await AdvertisementModel.create(data);
  return response;
};

const find = async (params) => {
  // TODO: поиск по разным полям
  const response = await AdvertisementModel.find(params).populate({
    path: 'userId',
    select: '_id, name'
  });
  return response;
};

const findById = async (id) => {
  const response = await AdvertisementModel.findById(id).populate({
    path: 'userId',
    select: '_id, name'
  });
  return response;
};

const remove = async (id) => {
  const response = await AdvertisementModel.findByIdAndRemove(id);
  return response;
};

module.exports = { create, find, findById, remove };
