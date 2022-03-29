const { model, Schema } = require('mongoose');

const userSchema = Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    avatar: String,
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likedPhotos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
