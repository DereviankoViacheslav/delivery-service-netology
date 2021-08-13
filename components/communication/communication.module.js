const { ChatModule, ChatModel } = require('../chat');

module.exports = (io) => (req, res, next) => {
  io.on('connection', (socket) => {
    const { id } = socket;

    const notifySubscribers = async (chatId, message) => {
      console.log('notifySubscribers -> message', message);
      io.sockets.emit('newMessage', { message, chatId });
    };

    ChatModule.subscribe(notifySubscribers);

    socket.on('getHistory', async (data) => {
      if (req.user) {
        const currentUserId = req.user._id;
        const { receiverId } = data;
        const chat = await ChatModule.find([currentUserId, receiverId]);
        const history = await ChatModule.getHistory(chat._id);
        io.sockets.emit('chatHistory', { history });
      }
    });

    socket.on('sendMessage', async (data) => {
      if (req.user) {
        const author = req.user._id;
        const { receiver, text } = data;
        await ChatModule.sendMessage({
          author,
          receiver,
          text
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${id}`);
    });
  });
  next();
};
