const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  }
});

// Overwrite toJSON method to remove __v, password and _id of the object
userSchema.method('toJSON', function () {
  const { __v, password, _id, ...object } = this.toObject();
  object.uid = _id;

  return object;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
