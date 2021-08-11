const { Schema, model } = require('mongoose');

const ChatSchema = new Schema(
  {
    users: [
      {
        ref: 'User',
        type: Schema.Types.ObjectId,
        require: true
      }
    ],
    messages: [
      {
        ref: 'Message',
        type: Schema.Types.ObjectId
      }
    ]
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false }
  }
);

module.exports = model('Chat', ChatSchema);
