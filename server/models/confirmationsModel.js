const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ConfirmationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  url: {
    type: String,
  },
  service: {
    type: String,
    default: 'email',
  },
  createdOn: {
    type: String,
  },
});

// Create collection and add Schema
module.exports = mongoose.model('confirmations', ConfirmationSchema);
