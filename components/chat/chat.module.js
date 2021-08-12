const ChatModel = require('./chat.model');
const { MessageModule } = require('../message');
const { UserModel } = require('../user');

const sendMessage = async (data) => {
  const { author, receiver, text } = data;
  let message = await MessageModule.create({ author, text });
  const user = await UserModel.findById(author);
  let chat = await ChatModel.findOne({
    $and: [
      {
        users: { $in: [author] }
      },
      {
        users: { $in: [receiver] }
      }
    ]
  });
  if (!chat) {
    chat = await ChatModel.create({
      users: [author, receiver],
      messages: [message]
    });
  } else {
    chat.messages.push(message._id);
    chat = await ChatModel.findOneAndUpdate(
      { _id: chat._id },
      { messages: chat.messages },
      { new: true }
    );
  }
  message = { ...message.toObject(), author: user.name };
  return message;
};

const getHistory = async (id) => {
  const chat = await ChatModel.findById(id)
    .populate({
      path: 'messages',
      populate: {
        path: 'author',
        select: '-_id name'
      }
    })
    .lean();
  const result = chat.messages.map((msg) => {
    const { author, ...data } = msg;
    return { ...data, author: author.name };
  });
  return result;
};

const subscribe = (callback) => {
  callback();
};

const find = async (userIds) => {
  const chat = await ChatModel.findOne({
    users: { $in: [...userIds] }
  });
  return chat;
};

module.exports = { sendMessage, find, getHistory, subscribe };
