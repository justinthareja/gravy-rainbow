var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true},
  },
  email: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;