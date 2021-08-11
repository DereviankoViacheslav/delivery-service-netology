const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    author: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      require: true
    },
    text: { type: String, require: true },
    readAt: { type: Date, default: null }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'sentAt', updatedAt: false }
  }
);

module.exports = model('Message', MessageSchema);
