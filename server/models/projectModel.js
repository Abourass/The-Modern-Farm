const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  projects: [
    {
      name: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
  client: {type: Schema.Types.ObjectId, ref: 'client'},
  created: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('projects', ProjectSchema);
