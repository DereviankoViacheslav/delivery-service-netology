const { Schema, model } = require('mongoose');

const AdvertisementSchema = new Schema(
  {
    userId: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      require: true
    },
    shortText: { type: String, require: true },
    description: { type: String },
    images: [{ type: String }],
    tags: [{ type: String }],
    isDeleted: Boolean
  },
  { versionKey: false, timestamps: true }
);

module.exports = model('Advertisement', AdvertisementSchema);
