const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

// Schema to define the User model
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Please fill a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true,
  });

// Virtual for friendCount
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
