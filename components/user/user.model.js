const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    passwordHash: { type: String, select: false, require: true },
    email: { type: String, unique: true, require: true },
    contactPhone: { type: String }
  },
  { versionKey: false, timestamps: true }
);

module.exports = model('User', UserSchema);
