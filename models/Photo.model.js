const { Schema, model } = require('mongoose');

const photoSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    photo: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

const Photo = model('Photo', photoSchema);

module.exports = Photo;
