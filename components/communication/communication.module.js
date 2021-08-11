const { ChatModule } = require('../chat');

module.exports = (io) => (req, res, next) => {
  io.on('connection', (socket) => {
    const { id } = socket;

    socket.on('getHistory', async (data) => {
      if (req.user) {
        const currentUserId = req.user._id;
        const { id } = data;
        const chat = await ChatModule.find([currentUserId, id]);
        const history = await ChatModule.getHistory(chat._id);
        socket.broadcast.emit('chatHistory', { history });
        socket.emit('chatHistory', { history });
      }
    });

    socket.on('sendMessage', async (data) => {
      if (req.user) {
        const author = req.user._id;
        const { receiver, text } = data;
        const chat = await ChatModule.sendMessage({ author, receiver, text });
        const history = await ChatModule.getHistory(chat._id);
        socket.broadcast.emit('newMessage', { history });
        socket.emit('newMessage', { history });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${id}`);
    });
  });
  next();
};
