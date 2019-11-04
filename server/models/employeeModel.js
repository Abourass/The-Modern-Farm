'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EmployeeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  employeeNumber: {
    type: Number,
  },
  employmentStatus: {
    type: String,
    default: 'Employed',
  },
  employed: {
    type: Date,
    default: Date.now(),
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  internalNumber: {
    type: String,
  },
  internalExt: {
    type: String,
  },
  created: {
    type: Date,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  log: {
    type: Array,
  },
});

module.exports = mongoose.model('employees', EmployeeSchema);
