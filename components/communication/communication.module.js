const { ChatModule } = require('../chat');

module.exports = (io) => (req, res, next) => {
  io.on('connection', (socket) => {
    const { id } = socket;
    
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
        const message = await ChatModule.sendMessage({
          author,
          receiver,
          text
        });
        io.sockets.emit('newMessage', message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${id}`);
    });
  });
  next();
};
