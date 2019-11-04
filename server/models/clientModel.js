const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.Promise = global.Promise; // To fix https://github.com/Automattic/mongoose/issues/4291

const ClientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
  },
  orderFile: {
    type: String,
  },
  displayName: {
    type: String,
  },
  jsonToken: {
    type: String,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  log: {
    type: Array,
  },
  duplicateCheckForDays:{
    type: Number,
  },
  subclient: [
    {
      _id: {
        type: Schema.Types.ObjectId,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  rep: [
    {
      _id: {
        type: Schema.Types.ObjectId,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
});
module.exports = mongoose.model('clients', ClientSchema); // Create collection and add Schema
