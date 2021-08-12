const AdvertisementModel = require('./advertisement.model');

const create = async (data) => {
  const response = await AdvertisementModel.create(data);
  return response;
};

const find = async (params) => {
  const tags = params.tags
    ? params.tags.split(', ').map((tag) => ({ tags: { $in: [tag] } }))
    : null;
  const query = {
    $and: [
      { isDeleted: false },
      { shortText: { $regex: params.shortText, $options: '$i' } },
      { description: { $regex: params.description, $options: '$i' } }
    ]
  };
  if (params.userId) query['$and'].push({ userId: params.userId });
  if (tags) query['$and'].push(...tags);
  const response = await AdvertisementModel.find(query).populate({
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
